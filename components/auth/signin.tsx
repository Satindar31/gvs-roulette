import { signIn } from "@/auth"
import { Button } from "../ui/button"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        //redirect to /app/onboarding after sign in
        await signIn("", { redirectTo: "/app/onboarding" })
      }}
    >
      <Button type="submit" variant="outline">Sign in</Button>
    </form>
  )
}