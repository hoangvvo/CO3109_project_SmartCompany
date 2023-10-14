import { SvgGoogle } from "@/assets/svg";
import { auth } from "@/backend/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            SmartCompany
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                SmartCompany helps you manage your company&apos;s infrastructure
                resources with automation and data analytics.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Authenticate to access SmartCompany dashboard
              </p>
            </div>
            <Link href="/login/google" legacyBehavior>
              <Button variant="outline">
                <SvgGoogle />
                <span>Continue with Google</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
