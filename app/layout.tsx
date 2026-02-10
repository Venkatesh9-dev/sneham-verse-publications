import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SnehAm VERSE PUBLICATIONS",
    template: "%s | SnehAm VERSE PUBLICATIONS",
  },
  description:
    "Publisher of 'An Uninvited Guest – AI' by Potti Venkatesh. Student-friendly AI guidance for academic clarity and future careers.",

  authors: [{ name: "Potti Venkatesh" }],

  keywords: [
    "Potti Venkatesh",
    "An Uninvited Guest – AI",
    "AI book for students",
    "AI awareness India",
    "Student AI guide",
    "SnehAm VERSE PUBLICATIONS",
  ],

  metadataBase: new URL("https://snehamversepublications.com"), // 🔥 Replace with your real domain after deployment

  openGraph: {
    title: "An Uninvited Guest – AI",
    description:
      "A practical, student-friendly guide to understanding and using AI wisely in academics and future careers.",
    url: "https://snehamversepublications.com",
    siteName: "SnehAm VERSE PUBLICATIONS",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "An Uninvited Guest – AI",
    description:
      "Student-friendly AI book by Potti Venkatesh.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          {children}
        </main>

        <Footer />

        {/* 🔥 Advanced Structured Data for Google (Book Schema) */}
        <Script
          id="book-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              name: "An Uninvited Guest – AI",
              author: {
                "@type": "Person",
                name: "Potti Venkatesh",
              },
              publisher: {
                "@type": "Organization",
                name: "SnehAm VERSE PUBLICATIONS",
              },
              bookFormat: "Paperback",
              inLanguage: "English",
              isbn: "978-81-995955-2-1",
              description:
                "A practical, student-friendly guide to understanding and using AI wisely in academics and future careers.",
            }),
          }}
        />
      </body>
    </html>
  );
}
