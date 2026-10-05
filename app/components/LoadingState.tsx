export default function LoadingState() {
  return (
    <section
      aria-live="polite"
      aria-busy="true"
      aria-labelledby="loading-heading"
      className="
        rounded-3xl
        border border-indigo-100
        bg-white/80
        p-8
        shadow-[0_20px_60px_rgba(30,41,59,0.08)]
        backdrop-blur-xl
        sm:p-10
      "
    >
      <div className="flex flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="
            relative flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            shadow-lg
            shadow-indigo-500/20
          "
        >
          <span
            className="
              h-7 w-7
              animate-spin
              rounded-full
              border-4
              border-white/30
              border-t-white
              motion-reduce:animate-none
            "
          />
        </div>

        <h2
          id="loading-heading"
          className="mt-5 text-xl font-bold text-slate-900"
        >
          Finding the right resources
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
          AccessAI is analyzing your request and matching it with
          community services in your area.
        </p>

        <div
          aria-hidden="true"
          className="mt-6 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-blue-600 motion-safe:animate-pulse" />
          <span className="h-2 w-2 rounded-full bg-indigo-500 motion-safe:animate-pulse [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-violet-500 motion-safe:animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </section>
  );
}