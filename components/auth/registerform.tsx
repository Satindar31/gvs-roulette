import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      action={async (formData) => {
        "use server";

        const provider = formData.get("provider");
        console.log({ provider });
        if (!provider || Array.isArray(provider)) {
          throw new Error("No provider");
        }
        if (provider === "google") {
          await signIn("google", {
            redirectTo: "/app/onboarding",
          });
        }
        if (provider === "passkey") {
          console.log("Signing in with passkey");
          await signIn("passkey", {
            redirectTo: "/app/onboarding",
          });
        }
        if (provider === "simplelogin") {
          console.log("Signing in with simplelogin");
          await signIn("simplelogin", {
            redirectTo: "/app/onboarding",
          });
        }
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <p className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </p> */}
          </div>
          <Input disabled id="password" type="password" required />
        </div>
        <Button disabled type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          data-umami-event="Signup with google button"
          variant="outline"
          className="w-full"
          type="submit"
          name="provider"
          value={"google"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Sign up with Google
        </Button>

        <Button
          data-umami-event="Signup with simplelogin button"
          variant="outline"
          className="w-full"
          type="submit"
          name="provider"
          value={"simplelogin"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M23.451 3.672q.16.158.277.348c.178.293.272.628.272.97v9.604c0 .342-.095.679-.274.971a1.9 1.9 0 0 1-.383.444c-.335.286-.76.443-1.201.443H11.727a9.77 9.77 0 0 1-5.2 4.365l-.136.049l-.135-.052a9.74 9.74 0 0 1-4.499-3.526A9.7 9.7 0 0 1 0 11.701a9.8 9.8 0 0 1 .227-2.1l.052-.237l.236-.058q.083-.02.162-.042a12 12 0 0 0 5.568-3.262l.04-.043l.232-.239v-.73c0-.343.095-.68.274-.972q.117-.19.278-.346a1.84 1.84 0 0 1 1.193-.537h13.994a1.84 1.84 0 0 1 1.195.537m-15.075.346q-.05 0-.098.004h-.142l.023.021l6.815 6.029a.435.435 0 0 0 .576 0l6.815-6.029l.023-.021h-.146a1 1 0 0 0-.098-.004zm-.898.605a1 1 0 0 0-.072.367v1.586a12 12 0 0 0 4.938 2.681l.114.029l.057.015l.237.058l.051.239a9 9 0 0 1 .1.565l.417-.369zM2.329 16.719a9.05 9.05 0 0 0 4.074 3.312a9 9 0 0 0 5.68-10.036a12.74 12.74 0 0 1-5.555-3.169a12.75 12.75 0 0 1-5.583 3.177a9 9 0 0 0-.161 1.698a9.04 9.04 0 0 0 1.545 5.018m10.684-5.098a9.7 9.7 0 0 1-.837 3.944h10.212l-.028-.025l-5.826-5.153l-.985.87a.43.43 0 0 1-.575 0l-.985-.87l-.984.87q.008.182.008.364m10.029 3.339a.9.9 0 0 0 .072-.366l.001-9.603a1 1 0 0 0-.071-.364l-5.84 5.168zM6.609 8.206a10.24 10.24 0 0 0 4.379 2.464q.11.607.118 1.223v.082a7.23 7.23 0 0 1-1.705 4.655l-.007.008a7.2 7.2 0 0 1-2.97 2.095a7.26 7.26 0 0 1-4.515-6.692q0-.689.129-1.365a10.25 10.25 0 0 0 4.486-2.551zm-3.177 5.053l2.752 2.752h.001l3.831-3.831l-.847-.846l-2.983 2.984l-1.908-1.907z"
            />
          </svg>
          Sign up with SimpleLogin
        </Button>

        <Button
          data-umami-event="Signup with passkey button"
          variant="outline"
          className="w-full"
          type="submit"
          name="provider"
          value={"passkey"}
          disabled
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            id="Passkey--Streamline-Outlined-Material"
            height="24"
            width="24"
          >
            <path
              fill="#000000"
              d="M3 20v-2.35c0 -0.63335 0.158335 -1.175 0.475 -1.625 0.316665 -0.45 0.725 -0.79165 1.225 -1.025 1.11665 -0.5 2.1875 -0.875 3.2125 -1.125S9.96665 13.5 11 13.5c0.43335 0 0.85415 0.02085 1.2625 0.0625s0.82915 0.10415 1.2625 0.1875c-0.08335 0.96665 0.09585 1.87915 0.5375 2.7375C14.50415 17.34585 15.15 18.01665 16 18.5v1.5H3Zm16 3.675 -1.5 -1.5v-4.65c-0.73335 -0.21665 -1.33335 -0.62915 -1.8 -1.2375 -0.46665 -0.60835 -0.7 -1.3125 -0.7 -2.1125 0 -0.96665 0.34165 -1.79165 1.025 -2.475 0.68335 -0.68335 1.50835 -1.025 2.475 -1.025s1.79165 0.34165 2.475 1.025c0.68335 0.68335 1.025 1.50835 1.025 2.475 0 0.75 -0.2125 1.41665 -0.6375 2 -0.425 0.58335 -0.9625 1 -1.6125 1.25l1.25 1.25 -1.5 1.5 1.5 1.5 -2 2ZM11 11.5c-1.05 0 -1.9375 -0.3625 -2.6625 -1.0875 -0.725 -0.725 -1.0875 -1.6125 -1.0875 -2.6625s0.3625 -1.9375 1.0875 -2.6625C9.0625 4.3625 9.95 4 11 4s1.9375 0.3625 2.6625 1.0875c0.725 0.725 1.0875 1.6125 1.0875 2.6625s-0.3625 1.9375 -1.0875 2.6625C12.9375 11.1375 12.05 11.5 11 11.5Zm7.5 3.175c0.28335 0 0.52085 -0.09585 0.7125 -0.2875S19.5 13.95835 19.5 13.675c0 -0.28335 -0.09585 -0.52085 -0.2875 -0.7125s-0.42915 -0.2875 -0.7125 -0.2875c-0.28335 0 -0.52085 0.09585 -0.7125 0.2875S17.5 13.39165 17.5 13.675c0 0.28335 0.09585 0.52085 0.2875 0.7125s0.42915 0.2875 0.7125 0.2875Z"
              strokeWidth="0.5"
            ></path>
          </svg>
          Sign up with Passkey
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
