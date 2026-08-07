export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-700">
      <div className="absolute top-0 -left-4 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float dark:opacity-25" style={{ backgroundColor: "hsl(var(--prayer-hue) 80% 65% / 0.16)" }} />
      <div className="absolute top-0 -right-4 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float [animation-delay:2s] dark:opacity-25" style={{ backgroundColor: "hsl(var(--accent-hue) 85% 60% / 0.14)" }} />
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-teal/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float [animation-delay:4s] dark:opacity-25" />
    </div>
  );
}
