"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, Clock, Gamepad2, Menu, Sparkles, Coffee } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { MENU_SECTIONS } from "./header";
import { sfx } from "@/lib/sfx";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/ibadah", icon: BookOpen, label: "Ibadah" },
  { href: "/lifestyle", label: "Lifestyle", icon: Coffee },
  { href: "/games", icon: Gamepad2, label: "Arcade" },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

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
              onClick={() => sfx.playWoosh()}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* MORE Menu (Sheet Mobile) */}
        <Sheet>
          <SheetTrigger className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors text-muted-foreground hover:text-primary outline-none">
            <Menu className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 flex flex-col">
            <SheetHeader className="p-6 text-left border-b bg-muted/30">
              <SheetTitle className="font-display text-2xl font-bold">Menu Lengkap</SheetTitle>
              <SheetDescription>Eksplorasi seluruh fitur Al-Qur'an Digital</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto p-4 space-y-6 flex-1">
              {MENU_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
                    {section.title}
                  </h3>
                  <div className="grid gap-2">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <SheetClose
                          key={item.href}
                          onClick={() => {
                            sfx.playWoosh();
                            router.push(item.href);
                          }}
                          className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                            isActive
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-card hover:bg-accent border-transparent hover:border-border"
                          }`}
                        >
                          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-semibold text-sm leading-tight">{item.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                          </div>
                        </SheetClose>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
