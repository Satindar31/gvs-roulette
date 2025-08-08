import { auth, signIn } from "@/auth";
import { OnboardingForm } from "@/components/onboarding/form";

export default async function onboarding() {
  const session = await auth();
  if (!session) {
    await signIn("", { redirectTo: "/app/onboarding" });
    return null; // This will prevent rendering the page if the user is not authenticated
  }
  let greeting = "Welcome";
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="font-sans grid grid-rows-3 items-center justify-items-center min-h-screen min-w-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-7xl font-extrabold">{greeting}!</div>
      <p className="text-2xl font-bold text-center">
        Welcome to the onboarding page! <br /> Please provide your details.
      </p>
      <OnboardingForm session={session} />
    </div>
  );
}
