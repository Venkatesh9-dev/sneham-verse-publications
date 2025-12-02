import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SnehAm VERSE PUBLICATIONS",
  description: "Student-friendly books to understand AI and use it wisely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
