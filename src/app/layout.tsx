import type { Metadata } from "next";
import { Inter, Amiri, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LayoutProvider } from "@/components/layout/layout-context";
import { MainContent } from "@/components/layout/main-content";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { TooltipProvider } from "@/components/ui/tooltip";
import { XpToastContainer } from "@/components/ui/xp-toast";
import { TimeThemeSync } from "@/components/layout/time-theme-sync";
import { ReminderChecker } from "@/components/layout/reminder-checker";
import { ServiceWorkerRegistry } from "@/components/layout/sw-registry";
import { FloatingAIChat } from "@/components/layout/floating-ai-chat";
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
  title: "Zadify • Modern Islamic Productivity Super-App & Digital Quran",
  description: "Zadify adalah ekosistem produktivitas Islami all-in-one: Al-Qur'an tajwid interaktif, live murottal per-ayat, kalkulator zakat & haji, gamifikasi bekal harian (Zad Points), dan AI Zad Mentor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${amiri.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zadify" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LayoutProvider>
            <TooltipProvider>
              <ServiceWorkerRegistry />
              <ReminderChecker />
              <TimeThemeSync />
              <AnimatedBackground />
              <Header />
              <MainContent>{children}</MainContent>
              <Footer />
              <BottomNav />
              <FloatingAIChat />
              <XpToastContainer />
              <Analytics />
            </TooltipProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
