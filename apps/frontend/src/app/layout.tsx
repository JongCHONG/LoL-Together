import type { Metadata } from "next";

import "./globals.css";

import Header from "../components/Header/Header";

export const metadata: Metadata = {
  title: "LoL Together",
  description: "Une expérience collaborative de League of Legends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
