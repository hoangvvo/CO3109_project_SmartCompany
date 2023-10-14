import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="p-8">
        <div className="relative h-full flex-col p-10 flex rounded-lg items-start">
          <div className="relative z-20 flex items-center text-xl font-bold">
            SmartCompany
          </div>
          <div className="relative z-20 mt-2 mb-4">
            <p className="text-md font-light">
              SmartCompany helps you manage your company&apos;s infrastructure
              resources with automation and data analytics.
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open dashboard</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <Link href="/admin" legacyBehavior>
                <DropdownMenuItem>Admin dashboard</DropdownMenuItem>
              </Link>
              <Link href="/app" legacyBehavior>
                <DropdownMenuItem>Employee dashboard</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </>
  );
}
