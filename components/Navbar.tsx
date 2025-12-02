"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/book", label: "The Book" },
  { href: "/colleges", label: "For Colleges" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href
        ? "text-blue-400"
        : "text-slate-200 hover:text-blue-300"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-wide text-slate-50">
            SnehAm VERSE PUBLICATIONS
          </span>
          <span className="text-xs text-slate-400">
            Student-friendly AI guidance
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}

          <Link
            href="/colleges#bulk-order"
            className="px-3 py-1.5 rounded-full bg-blue-500 text-white text-xs font-medium hover:bg-blue-400 transition"
          >
            Request Bulk Copies
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-700 text-slate-200"
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/colleges#bulk-order"
              onClick={() => setIsOpen(false)}
              className="mt-1 px-3 py-2 rounded-md bg-blue-500 text-white text-xs font-medium text-center hover:bg-blue-400"
            >
              Request Bulk Copies
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
