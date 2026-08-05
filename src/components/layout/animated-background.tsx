export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float dark:opacity-30" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float [animation-delay:2s] dark:opacity-30" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float [animation-delay:4s] dark:opacity-30" />
    </div>
  );
}
