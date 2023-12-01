"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import "@/styles/globals.css";
import { QueryClient } from "@tanstack/react-query";
import {
  CreditCard,
  Files,
  Home,
  LucideIcon,
  Printer,
  Settings,
} from "lucide-react";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const NavbarLink: React.FC<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-sm font-medium ${
        pathname === href
          ? "text-secondary-foreground"
          : "text-muted-foreground"
      } transition-colors hover:text-primary`}
    >
      {children}
    </Link>
  );
};

const NavbarUser: React.FC = () => {
  const { user } = useUserStore();

  const onLogout = () => {
    useUserStore.getState().logout();

    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link href="/register" className={buttonVariants()}>
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavbarSearch: React.FC = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?q=${e.currentTarget.search.value}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="search"
        type="search"
        placeholder="Search..."
        className="w-64"
      />
    </form>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-border w-full fixed bg-background h-16 z-10">
      <div className="flex h-full gap-10 items-center px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-semibold">Smart Office</span>
        </Link>
        <div className="flex items-center justify-start gap-4 flex-1"></div>
        <NavbarSearch />
        <NavbarUser />
      </div>
    </nav>
  );
};

const SidebarItem: React.FC<{
  href: string;
  children: string;
  Icon: LucideIcon;
}> = ({ href, children, Icon }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: pathname === href ? "secondary" : "ghost",
        }),
        "w-full justify-start",
      )}
    >
      <Icon width={16} height={16} className="mr-2" />
      {children}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-[calc(100vh-64px)] fixed top-16 inset-y-0 left-0 pb-12 pt-4 lg:border-r">
      <div className="px-3 py-2">
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/" Icon={Home}>
            Dashboard
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Devices
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/printers" Icon={Printer}>
            All Devices
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Activities
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/activity" Icon={Files}>
            All Activites
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Automations
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/team" Icon={CreditCard}>
            All Automation
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Accounts
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/team" Icon={CreditCard}>
            My Team
          </SidebarItem>
          <SidebarItem href="/settings" Icon={Settings}>
            Settings
          </SidebarItem>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useUserStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="lg:pl-64 pt-16 relative min-h-screen">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
