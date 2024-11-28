import "./globals.css";
import localFont from "next/font/local";
import Layout from "@/commons/layout";
import type { Metadata } from "next";

export const suit = localFont({
  src: "./fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solplace",
  description: "Solplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
