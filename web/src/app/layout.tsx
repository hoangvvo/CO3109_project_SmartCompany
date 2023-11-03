"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import "@/styles/globals.css";
import { Avatar } from "@radix-ui/react-avatar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
    </DropdownMenu>
  );
};

const NavbarSearch: React.FC = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push;
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="search"
        type="search"
        placeholder="Search devices"
        className="w-64"
      />
    </form>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-border w-full">
      <div className="flex h-16 gap-10 items-center px-4 container">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-medium">SmartCompany</span>
        </Link>
        <div className="flex items-center justify-start gap-4 flex-1">
          <NavbarLink href="/">Dashboard</NavbarLink>
          <NavbarLink href="/automation">Automation</NavbarLink>
          <NavbarLink href="/activity">Activity</NavbarLink>
          <NavbarLink href="/settings">Settings</NavbarLink>
        </div>
        <NavbarSearch />
        <NavbarUser />
      </div>
    </nav>
  );
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
