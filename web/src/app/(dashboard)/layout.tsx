"use client";

import { ErrorPage } from "@/components/pages/error-page";
import { useUserStore } from "@/stores/user.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();

  if (!user) {
    return (
      <ErrorPage
        title="Unauthenticated"
        message="You must be logged in to view this page"
      />
    );
  }

  return children;
}
