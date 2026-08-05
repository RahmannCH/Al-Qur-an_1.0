"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Clock, Heart, Gamepad2, Menu, Search, Settings, Bookmark, Trophy, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/quran", icon: BookOpen, label: "Quran" },
  { href: "/prayer-times", icon: Clock, label: "Sholat" },
  { href: "/games", icon: Gamepad2, label: "Arcade" },
];

const moreItems = [
  { href: "/dua", icon: Heart, label: "Koleksi Doa", color: "text-rose-500", bg: "bg-rose-500/10" },
  { href: "/chat", icon: MessageCircle, label: "AI Chat Islami", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { href: "/search", icon: Search, label: "Cari Ayat", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { href: "/achievements", icon: Trophy, label: "Pencapaian", color: "text-gold", bg: "bg-gold/10" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmark Tersimpan", color: "text-blue-500", bg: "bg-blue-500/10" },
  { href: "/settings", icon: Settings, label: "Pengaturan", color: "text-slate-500", bg: "bg-slate-500/10" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/80 backdrop-blur-lg md:hidden pb-safe">
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
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* MORE Menu (Sheet) */}
        <Sheet>
          <SheetTrigger className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors text-muted-foreground hover:text-primary outline-none">
            <Menu className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[75vh] rounded-t-3xl p-0 flex flex-col">
            <SheetHeader className="p-6 text-left border-b bg-muted/30">
              <SheetTitle className="font-display text-2xl font-bold">Menu Lainnya</SheetTitle>
              <SheetDescription>Eksplorasi fitur-fitur lengkap Al-Qur'an Digital</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto p-4 grid gap-3">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className="outline-none">
                    <SheetTrigger className="w-full text-left outline-none">
                      <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isActive ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-accent'}`}>
                        <div className={`p-3 rounded-xl ${item.bg}`}>
                          <Icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <span className="font-semibold text-base">{item.label}</span>
                      </div>
                    </SheetTrigger>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
