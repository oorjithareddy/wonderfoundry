import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wonderfoundry — Make it wonderfully yours",
  description:
    "A playful creative studio for turning memories, inside jokes, and wildly specific ideas into one-of-a-kind keepsakes.",
  applicationName: "Wonderfoundry",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
