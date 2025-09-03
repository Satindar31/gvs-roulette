/* eslint-disable import/no-commonjs */
/* 
Testing library/framework: 
- If running under Jest or Vitest, this file will work as-is because it uses the BDD globals (describe/test/expect) if available.
- If no framework provides globals, it falls back to Node's built-in test runner (node:test) and assert.

This approach avoids new dependencies while aligning with existing setups.
*/

let useNodeTest = false;
try {
  // If a runner already provides globals, keep them. Otherwise, set up node:test.
  if (typeof describe !== 'function' || typeof it !== 'function' || typeof expect === 'undefined') {
    throw new Error('No BDD globals available');
  }
} catch {
  useNodeTest = true;
}

let t, assert;
if (useNodeTest) {
  // Node's built-in test runner fallback
  // eslint-disable-next-line
  ({ test: t, describe } = require('node:test'));
  // eslint-disable-next-line
  assert = require('node:assert/strict');
  // Provide minimal expect shim for consistency in messages
  global.expect = (actual) => ({
    toBe: (expected) => assert.equal(actual, expected),
    toBeTruthy: () => assert.ok(!!actual),
    toBeDefined: () => assert.notEqual(actual, undefined),
    toMatch: (re) => assert.match(String(actual), re),
    toContain: (substr) => assert.ok(String(actual).includes(substr), `Expected "${actual}" to contain "${substr}"`),
    toBeGreaterThanOrEqual: (n) => assert.ok(Number(actual) >= n, `Expected ${actual} >= ${n}`),
    not: {
      toMatch: (re) => assert.doesNotMatch(String(actual), re),
      toContain: (substr) => assert.ok(!String(actual).includes(substr), `Expected "${actual}" not to contain "${substr}"`),
    }
  });
  global.it = (name, fn) => t(name, fn);
}

// eslint-disable-next-line
const pkg = require('../package.json');

function isPlainObject(x) {
  return x && typeof x === 'object' && !Array.isArray(x);
}

function versionIsPinned(ver) {
  // Returns true if version string is EXACT (no ^ or ~)
  return typeof ver === 'string' && !ver.startsWith('^') && !ver.startsWith('~');
}

function semverLike(ver) {
  // Accepts x.y.z optionally with pre-release/build (e.g., 5.0.0-beta.29)
  return /^[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$/.test(ver);
}

function extractMajor(ver) {
  // For ranges like ^15.4.5 or exact 15.4.7, pull numeric major
  const m = ver.match(/([0-9]+)/);
  return m ? parseInt(m[1], 10) : NaN;
}

describe('package.json schema', () => {
  it('has required top-level keys with correct types', () => {
    expect(typeof pkg.name).toBe('string');
    expect(pkg.name.length > 0).toBeTruthy();

    expect(typeof pkg.version).toBe('string');
    expect(semverLike(pkg.version)).toBeTruthy();

    expect(typeof pkg.private).toBe('boolean');

    expect(isPlainObject(pkg.scripts)).toBeTruthy();
    expect(isPlainObject(pkg.dependencies)).toBeTruthy();
    expect(isPlainObject(pkg.devDependencies)).toBeTruthy();
  });

  it('contains essential scripts', () => {
    expect(pkg.scripts.dev).toBeDefined();
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.scripts.start).toBeDefined();
    expect(pkg.scripts.lint).toBeDefined();

    expect(pkg.scripts.dev).toContain('next');
    expect(pkg.scripts.dev).toContain('dev');
    // Ensure turbopack flag present in dev and build
    expect(pkg.scripts.dev).toContain('--turbopack');

    expect(pkg.scripts.build).toContain('next');
    expect(pkg.scripts.build).toContain('build');
    expect(pkg.scripts.build).toContain('--turbopack');

    expect(pkg.scripts.start).toContain('next');
    expect(pkg.scripts.start).toContain('start');

    expect(pkg.scripts.lint).toContain('next');
    expect(pkg.scripts.lint).toContain('lint');
  });

  it('contains essential runtime deps: next, react, react-dom', () => {
    expect(pkg.dependencies.next).toBeDefined();
    expect(pkg.dependencies.react).toBeDefined();
    expect(pkg.dependencies['react-dom']).toBeDefined();

    // Ensure versions are strings and plausibly semver/range
    expect(typeof pkg.dependencies.next).toBe('string');
    expect(typeof pkg.dependencies.react).toBe('string');
    expect(typeof pkg.dependencies['react-dom']).toBe('string');

    // For exact pins, ensure no ^/~ on next, react, react-dom (as per PR diff intent)
    expect(pkg.dependencies.next.startsWith('^') || pkg.dependencies.next.startsWith('~')).toBe(false);
    expect(pkg.dependencies.react.startsWith('^') || pkg.dependencies.react.startsWith('~')).toBe(false);
    expect(pkg.dependencies['react-dom'].startsWith('^') || pkg.dependencies['react-dom'].startsWith('~')).toBe(false);

    // Versions should be semver-like (allow pre-release)
    expect(semverLike(pkg.dependencies.next)).toBeTruthy();
    expect(semverLike(pkg.dependencies.react)).toBeTruthy();
    expect(semverLike(pkg.dependencies['react-dom'])).toBeTruthy();
  });

  it('does not duplicate packages across dependencies and devDependencies', () => {
    const dupes = Object.keys(pkg.dependencies).filter((k) => k in pkg.devDependencies);
    expect(dupes.length).toBe(0);
  });

  it('validates select dependency pinning policy', () => {
    // Pinned examples from diff snippet (should be exact): next, react, react-dom, recharts
    const criticalPins = ['next', 'react', 'react-dom', 'recharts'];
    criticalPins.forEach((name) => {
      const ver = pkg.dependencies[name];
      expect(ver).toBeDefined();
      expect(versionIsPinned(ver)).toBeTruthy();
      expect(semverLike(ver)).toBeTruthy();
    });
  });

  it('keeps related major versions aligned when applicable (next vs eslint-config-next)', () => {
    const nextVer = pkg.dependencies.next;
    const eslintCfg = pkg.devDependencies['eslint-config-next'];
    if (nextVer && eslintCfg) {
      const nextMajor = extractMajor(nextVer);
      const eslintMajor = extractMajor(eslintCfg);
      expect(Number.isNaN(nextMajor)).toBe(false);
      expect(Number.isNaN(eslintMajor)).toBe(false);
      expect(nextMajor).toBe(eslintMajor);
    }
  });

  it('sanity checks on notable libraries from the diff', () => {
    // Typescript v5+
    if (pkg.devDependencies.typescript) {
      expect(extractMajor(pkg.devDependencies.typescript)).toBeGreaterThanOrEqual(5);
    }

    // NextAuth 5 beta (allow any 5.0.0-beta.*)
    if (pkg.dependencies['next-auth']) {
      expect(pkg.dependencies['next-auth']).toMatch(/^\^?5\.0\.0-beta\./);
    }

    // Prisma present both runtime and dev (client + prisma)
    expect(pkg.dependencies['@prisma/client']).toBeDefined();
    expect(pkg.devDependencies.prisma).toBeDefined();
  });
});