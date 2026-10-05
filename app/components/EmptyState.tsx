export default function EmptyState() {
  return (
    <section
      aria-labelledby="empty-state-heading"
      className="
        relative overflow-hidden rounded-3xl
        border border-slate-200
        bg-white/80
        p-8
        text-center
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        backdrop-blur-xl
        sm:p-12
      "
    >
      <div
        aria-hidden="true"
        className="
          mx-auto mb-5 flex h-16 w-16
          items-center justify-center
          rounded-2xl
          bg-gradient-to-br from-blue-600 to-indigo-600
          text-2xl text-white
          shadow-lg shadow-indigo-500/20
        "
      >
        ✦
      </div>

      <h2
        id="empty-state-heading"
        className="text-xl font-bold text-slate-900 sm:text-2xl"
      >
        Find support that fits your needs
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
        Tell us what you need help with, where you are located, and any
        transportation or accessibility considerations. AccessAI will
        match your request with relevant community resources.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {[
          "Housing",
          "Employment",
          "Food",
          "Health",
          "Newcomer Support",
        ].map((item) => (
          <span
            key={item}
            className="
              rounded-full
              border border-slate-200
              bg-slate-50
              px-3 py-1.5
              text-xs font-medium
              text-slate-600
            "
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}