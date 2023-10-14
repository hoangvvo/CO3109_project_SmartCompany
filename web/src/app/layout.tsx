import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartCompany",
  description: "A HCMUT CO3109 project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
