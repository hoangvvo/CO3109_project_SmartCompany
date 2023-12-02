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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import Logo from "@/components/view/logo";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import "@/styles/globals.css";
import {
  Activity,
  BarChart3,
  Home,
  Info,
  LucideIcon,
  Menu,
  MonitorSmartphone,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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

const SidebarContent: React.FC = () => {
  return (
    <>
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
          <SidebarItem href="/devices" Icon={MonitorSmartphone}>
            All Devices
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Automations
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/automation" Icon={Workflow}>
            All Automation
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Analytics
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/analytics" Icon={BarChart3}>
            Analytics
          </SidebarItem>
          <SidebarItem href="/activity" Icon={Activity}>
            All Activites
          </SidebarItem>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Accounts
        </h2>
        <div className="space-y-1 flex flex-col">
          <SidebarItem href="/team" Icon={Users}>
            My Team
          </SidebarItem>
          <SidebarItem href="/settings" Icon={Settings}>
            Settings
          </SidebarItem>
        </div>
      </div>
    </>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-[calc(100vh-64px)] fixed top-16 inset-y-0 left-0 pb-12 pt-4 border-r hidden lg:block">
      <SidebarContent />
    </div>
  );
};

const MobileSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Menu"
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden" side="left">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-border w-full fixed bg-background h-16 z-10">
      <div className="flex h-full gap-10 items-center px-4 lg:px-8">
        <MobileSidebar />
        <Link href="/" className="flex-none hidden md:flex">
          <Logo />
        </Link>
        <div className="flex items-center justify-start gap-4 flex-1"></div>
        <NavbarUser />
      </div>
    </nav>
  );
};

const AuthBanner: React.FC = () => {
  const { user } = useUserStore();

  if (user) return null;

  return (
    <div className="bg-secondary py-2 px-4 rounded-lg container my-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Info className="text-primary w-6 h-6" />
        <span className="text-sm text-primary">
          You must be logged in to access all the features of this app.
        </span>
      </div>
      <Link
        href="/login"
        className={buttonVariants({ size: "sm", variant: "link" })}
      >
        Log in
      </Link>
    </div>
  );
};

export default function DashboardLayout({
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
        <main className="pb-12">
          <AuthBanner />
          {children}
        </main>
      </div>
    </>
  );
}
