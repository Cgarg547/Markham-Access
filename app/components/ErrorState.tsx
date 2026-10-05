"use client";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      aria-labelledby="error-heading"
      className="rounded-3xl border border-red-200 bg-red-50/90 p-6 shadow-lg shadow-red-900/5"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-xl"
        >
          !
        </div>

        <div className="flex-1">
          <h2
            id="error-heading"
            className="text-lg font-bold text-red-900"
          >
            We couldn't complete your request
          </h2>

          <p className="mt-2 text-sm leading-6 text-red-800">
            {message}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-red-300 bg-white px-5 font-bold text-red-800 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}