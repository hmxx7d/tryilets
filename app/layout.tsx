import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Article Quest",
  description: "A friendly grammar game for practicing English articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-sky-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
