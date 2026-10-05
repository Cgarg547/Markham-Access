"use client";

export default function AccessAIHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
          aria-label="AccessAI home"
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            ♿
          </div>

          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              AccessAI
            </div>
            <div className="text-xs font-medium text-slate-500">
              Community Resource Finder
            </div>
          </div>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 md:flex"
        >
          <a
            href="#about"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
          >
            About
          </a>

          <a
            href="#accessibility"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
          >
            Accessibility
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#accessibility"
            className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40 sm:px-4"
          >
            <span aria-hidden="true">♿</span>
            <span className="ml-1 hidden sm:inline">
              Accessibility
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}