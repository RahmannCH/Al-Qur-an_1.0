import type { Metadata } from "next";
import { Inter, Amiri, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { TooltipProvider } from "@/components/ui/tooltip";
import { XpToastContainer } from "@/components/ui/xp-toast";
import { TimeThemeSync } from "@/components/layout/time-theme-sync";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Qur'an Digital",
  description: "Aplikasi Al-Qur'an digital dengan terjemahan, audio murottal, dan fitur pembelajaran.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${amiri.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <TimeThemeSync />
            <AnimatedBackground />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
            <XpToastContainer />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
