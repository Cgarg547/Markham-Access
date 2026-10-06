"use client";

import {
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";

type SearchPanelProps = {
  request: string;
  setRequest: Dispatch<SetStateAction<string>>;
  loading: boolean;
  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => Promise<void>;
  onExample: (example: string) => Promise<void>;
};

const examples = [
  "I am a newcomer in Markham and need English language support.",
  "I need food assistance near me and I don't have a car.",
  "I need help finding employment and public transportation.",
];

export default function SearchPanel({
  request,
  setRequest,
  loading,
  onSubmit,
  onExample,
}: SearchPanelProps) {
  return (
    <section
      aria-labelledby="search-heading"
      className="relative"
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_24px_70px_rgba(30,64,175,0.14)] backdrop-blur-xl sm:p-7">
        <div className="mb-5">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Find support
          </p>

          <h2
            id="search-heading"
            className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
          >
            What do you need help with?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Describe your situation in your own words. AccessAI will
            identify relevant needs, location, transportation and
            community resources.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <label
            htmlFor="accessai-request"
            className="sr-only"
          >
            Describe what you need help with
          </label>

          <textarea
            id="accessai-request"
            value={request}
            onChange={(event) =>
              setRequest(event.target.value)
            }
            placeholder="Example: I am a newcomer in Markham. I need English classes and I use public transit."
            rows={5}
            disabled={loading}
            className="min-h-[150px] w-full resize-y rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base leading-7 text-slate-900 shadow-inner outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">
              You can include your city, transportation needs,
              language, urgency or other details.
            </p>

            <button
              type="submit"
              disabled={loading || !request.trim()}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 px-6 font-bold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/25 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span
                    aria-hidden="true"
                    className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                  Finding resources...
                </>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="mr-2"
                  >
                    ✦
                  </span>
                  Find Resources
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            Try an example
          </p>

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => onExample(example)}
                disabled={loading}
                className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}