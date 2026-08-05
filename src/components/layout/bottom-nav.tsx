"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Clock, Heart, Menu } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/quran", icon: BookOpen, label: "Quran" },
  { href: "/prayer-times", icon: Clock, label: "Sholat" },
  { href: "/dua", icon: Heart, label: "Doa" },
  { href: "/more", icon: Menu, label: "More" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/80 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
