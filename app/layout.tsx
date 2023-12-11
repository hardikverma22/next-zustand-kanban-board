import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Next-Zustand Kanban Board",
  description: "Developed for learning purposes",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-br from-gray-700 to-gray-500 ${inter.className}`}>{children}</body>
    </html>
  );
}
