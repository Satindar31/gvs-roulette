/**
 * Auto-generated tests validating yarn.lock entries introduced/updated in this PR.
 *
 * Testing library/framework: Jest (tests are also compatible with Vitest as they use only describe/test/expect).
 *
 * Scope: Focused on the packages shown in the PR diff for yarn.lock.
 */

import fs from 'fs';
import path from 'path';

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseYarnLockV1Subset(lockText) {
  const blocks = lockText.split(/\n{2,}/).filter(Boolean);
  const byKey = {};
  for (const rawBlock of blocks) {
    const lines = rawBlock.split('\n');
    const first = (lines[0] || '').trim();
    if (!first || !/:$/.test(first)) continue;

    const header = first;
    const headerKeys = header.slice(0, -1).split(/,\s*/);

    let version = null, resolved = null, integrity = null;
    const dependencies = {};
    const optionalDependencies = {};
    let section = null;

    for (let i = 1; i < lines.length; i++) {
      const l = lines[i] ?? '';
      if (!l.startsWith('  ')) continue; // only consider indented lines
      const t = l.trim();
      if (t.startsWith('version ')) {
        const m = t.match(/^version\s+"([^"]+)"$/);
        if (m) version = m[1];
      } else if (t.startsWith('resolved ')) {
        const m = t.match(/^resolved\s+"([^"]+)"/);
        if (m) resolved = m[1];
      } else if (t.startsWith('integrity ')) {
        integrity = t.replace(/^integrity\s+/, '');
      } else if (t === 'dependencies:') {
        section = 'dependencies';
      } else if (t === 'optionalDependencies:') {
        section = 'optionalDependencies';
      } else if (section && /^"[^"]+"\s+"[^"]+"$/.test(t)) {
        const mm = t.match(/^"([^"]+)"\s+"([^"]+)"$/);
        if (mm) {
          const n = mm[1], v = mm[2];
          if (section === 'dependencies') dependencies[n] = v;
          else optionalDependencies[n] = v;
        }
      }
    }

    const block = { header, headerKeys, version, resolved, integrity, dependencies, optionalDependencies, raw: rawBlock };
    for (const k of headerKeys) byKey[k] = block;
  }
  return { byKey };
}

function getBlock(byKey, keys) {
  for (const k of keys) {
    if (byKey[k]) return byKey[k];
  }
  return null;
}

function expectTarballMatch(block, pkgName, version) {
  // If resolved is absent, assert presence only.
  expect(block).toBeTruthy();
  if (!block.resolved) return;
  const namePart = pkgName.includes('/') ? pkgName.split('/')[1] : pkgName;
  const re = new RegExp(`${namePart}-${escapeRegex(version)}\\.tgz`);
  expect(re.test(block.resolved)).toBe(true);
}

describe('yarn.lock – validates PR diff package versions and sub-dependencies', () => {
  let parsed;

  beforeAll(() => {
    const p = path.resolve(process.cwd(), 'yarn.lock');
    const lockText = fs.readFileSync(p, 'utf8');
    parsed = parseYarnLockV1Subset(lockText);
  });

  test('next@15.4.7 block present with expected deps and optionalDeps', () => {
    const block = getBlock(parsed.byKey, ['next@15.4.7']);
    expect(block?.version).toBe('15.4.7');
    expectTarballMatch(block, 'next', '15.4.7');

    const expectedDeps = {
      '@next/env': '15.4.7',
      '@swc/helpers': '0.5.15',
      'caniuse-lite': '^1.0.30001579',
      'postcss': '8.4.31',
      'styled-jsx': '5.1.6',
    };
    for (const [k, v] of Object.entries(expectedDeps)) {
      expect(block.dependencies[k]).toBe(v);
    }

    const expectedOptional = [
      '@next/swc-darwin-arm64',
      '@next/swc-darwin-x64',
      '@next/swc-linux-arm64-gnu',
      '@next/swc-linux-arm64-musl',
      '@next/swc-linux-x64-gnu',
      '@next/swc-linux-x64-musl',
      '@next/swc-win32-arm64-msvc',
      '@next/swc-win32-x64-msvc',
    ];
    for (const k of expectedOptional) {
      expect(block.optionalDependencies[k]).toBe('15.4.7');
    }
    expect(block.optionalDependencies['sharp']).toBe('^0.34.3');
  });

  test('react@19.1.0 pinned and tarball URL matches', () => {
    const block = getBlock(parsed.byKey, ['react@19.1.0']);
    expect(block?.version).toBe('19.1.0');
    expectTarballMatch(block, 'react', '19.1.0');
  });

  test('react-dom@19.1.0 pinned and depends on scheduler ^0.26.0', () => {
    const block = getBlock(parsed.byKey, ['react-dom@19.1.0']);
    expect(block?.version).toBe('19.1.0');
    expect(block.dependencies['scheduler']).toBe('^0.26.0');
    expectTarballMatch(block, 'react-dom', '19.1.0');
  });

  test('tailwindcss@^4 resolves to 4.1.11', () => {
    const block = getBlock(parsed.byKey, ['tailwindcss@^4', 'tailwindcss@4.1.11']);
    expect(block).toBeTruthy();
    expect(block.version).toBe('4.1.11');
    expectTarballMatch(block, 'tailwindcss', '4.1.11');
  });

  test('eslint@^9 resolves to 9.32.0 and includes @eslint/js 9.32.0', () => {
    const block = getBlock(parsed.byKey, ['eslint@^9']);
    expect(block?.version).toBe('9.32.0');
    expect(block.dependencies['@eslint/js']).toBe('9.32.0');
  });

  test('typescript@^5 resolves to 5.9.2', () => {
    const block = getBlock(parsed.byKey, ['typescript@^5']);
    expect(block?.version).toBe('5.9.2');
    expectTarballMatch(block, 'typescript', '5.9.2');
  });

  test('prisma@^6.13.0 resolves to 6.13.0 with expected sub-deps', () => {
    const block = getBlock(parsed.byKey, ['prisma@^6.13.0']);
    expect(block?.version).toBe('6.13.0');
    expect(block.dependencies['@prisma/config']).toBe('6.13.0');
    expect(block.dependencies['@prisma/engines']).toBe('6.13.0');
  });

  test('@next/env@15.4.7 present and tarball URL matches', () => {
    const block = getBlock(parsed.byKey, ['@next/env@15.4.7']);
    expect(block?.version).toBe('15.4.7');
    expectTarballMatch(block, '@next/env', '15.4.7');
  });

  test('@swc/helpers@0.5.15 present and depends on tslib ^2.8.0', () => {
    const block = getBlock(parsed.byKey, ['@swc/helpers@0.5.15']);
    expect(block?.version).toBe('0.5.15');
    expect(block.dependencies['tslib']).toBe('^2.8.0');
  });

  test('postcss@8.4.31 present with expected dependencies', () => {
    const block = getBlock(parsed.byKey, ['postcss@8.4.31']);
    expect(block?.version).toBe('8.4.31');
    const expectedDeps = {
      'nanoid': '^3.3.6',
      'picocolors': '^1.0.0',
      'source-map-js': '^1.0.2',
    };
    for (const [k, v] of Object.entries(expectedDeps)) {
      expect(block.dependencies[k]).toBe(v);
    }
  });

  test('styled-jsx@5.1.6 present with client-only 0.0.1', () => {
    const block = getBlock(parsed.byKey, ['styled-jsx@5.1.6']);
    expect(block?.version).toBe('5.1.6');
    expect(block.dependencies['client-only']).toBe('0.0.1');
  });
});