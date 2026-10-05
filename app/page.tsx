"use client";

import {
  FormEvent,
  useState,
} from "react";

import AccessAIHeader from "./components/AccessAIHeader";
import BackgroundEffects from "./components/BackgroundEffects";
import SearchPanel from "./components/SearchPanel";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import ResultsHeader from "./components/ResultsHeader";
import ResourceCard from "./components/ResourceCard";

type Resource = {
  id: string;
  name?: string;
  category?: string;
  city?: string;
  province?: string;
  district?: string;
  region?: string;
  address?: string;
  description?: string;
  eligibility?: string;
  languages?: string | string[];
  services?: string | string[];
  tags?: string | string[];
  transportation?: string | string[];
  coverageArea?: string | string[];
  phone?: string;
  website?: string;
  verified?: boolean | string;
  matchScore?: number;
  matchReasons?: string[];
};

type Analysis = {
  userType?: string;
  location?: string;
  searchArea?: string;
  locationType?: string;
  transportation?: string;
  transportationNeeds?: string[];
  urgency?: string;
  needs?: string[];
  detectedLanguage?: string;
  languages?: string[];
};

type ApiResponse = {
  success: boolean;
  request?: string;
  analysis?: Analysis;
  resources?: Resource[];
  error?: string;
};

export default function Home() {
  const [request, setRequest] = useState("");
  const [result, setResult] =
    useState<ApiResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedRequest =
      request.trim();

    if (!trimmedRequest) {
      setError(
        "Please describe what you need help with."
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response =
        await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            request: trimmedRequest,
          }),
        });

      const data: ApiResponse =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Something went wrong while analyzing your request."
        );
      }

      setResult(data);
    } catch (err) {
      console.error(
        "AccessAI request failed:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleExample(
    example: string
  ) {
    setRequest(example);

    setError("");

    window.setTimeout(() => {
      const form =
        document.getElementById(
          "access-ai-search-form"
        ) as HTMLFormElement | null;

      form?.requestSubmit();
    }, 50);
  }

  const analysis =
    result?.analysis;

  const resources =
    result?.resources ?? [];

  const hasResults =
    Boolean(result) &&
    resources.length > 0;

  const hasNoResults =
    Boolean(result) &&
    resources.length === 0;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">
      <BackgroundEffects />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-indigo-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-xl"
      >
        Skip to main content
      </a>

      <AccessAIHeader />

      <div
        id="main-content"
        className="relative z-10"
      >
        <section
          aria-labelledby="hero-heading"
          className="mx-auto w-full max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-20"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur">
              <span
                aria-hidden="true"
                className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"
              />

              Community support,
              simplified.
            </div>

            <h1
              id="hero-heading"
              className="text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Find the right
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                community resource
              </span>
              .
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Tell AccessAI what you need,
              where you are, and what
              barriers you are facing. We
              will help connect you with
              relevant community services.
            </p>
          </div>

          <div className="mx-auto mt-9 max-w-4xl">
            <SearchPanel
              request={request}
              setRequest={setRequest}
              loading={loading}
              onSubmit={handleSubmit}
              onExample={handleExample}
            />
          </div>

          <div
            className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500"
            aria-label="Accessibility features"
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="text-emerald-600"
              >
                ✓
              </span>
              Accessibility-focused
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="text-emerald-600"
              >
                ✓
              </span>
              Location-aware
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="text-emerald-600"
              >
                ✓
              </span>
              Verified resources
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="text-emerald-600"
              >
                ✓
              </span>
              Keyboard accessible
            </span>
          </div>
        </section>

        <section
          aria-live="polite"
          aria-busy={loading}
          className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
        >
          {loading && (
            <LoadingState />
          )}

          {!loading && error && (
            <ErrorState
              message={error}
              onRetry={() => {
                const form =
                  document.getElementById(
                    "access-ai-search-form"
                  ) as HTMLFormElement | null;

                form?.requestSubmit();
              }}
            />
          )}

          {!loading &&
            !error &&
            !result && (
              <EmptyState />
            )}

          {!loading &&
            !error &&
            hasNoResults && (
              <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl"
                  >
                    🔎
                  </div>

                  <h2 className="text-xl font-bold text-slate-950">
                    No strong matches found
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    We could not find
                    resources that closely
                    match your request. Try
                    adding your city,
                    transportation needs, or
                    the type of support you
                    are looking for.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setRequest("");
                      setResult(null);
                      setError("");
                    }}
                    className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-indigo-500"
                  >
                    Start a new search
                  </button>
                </div>
              </div>
            )}

          {!loading &&
            !error &&
            hasResults && (
              <div className="space-y-7">
                <ResultsHeader
                  analysis={analysis}
                  resultCount={
                    resources.length
                  }
                />

                <div
                  className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                  role="list"
                  aria-label="Matching community resources"
                >
                  {resources.map(
                    (
                      resource,
                      index
                    ) => (
                      <div
                        key={
                          resource.id ||
                          `${resource.name}-${index}`
                        }
                        role="listitem"
                        className="h-full"
                        style={{
                          animationDelay: `${Math.min(
                            index * 70,
                            420
                          )}ms`,
                        }}
                      >
                        <ResourceCard
                          resource={
                            resource
                          }
                          analysis={
                            analysis
                          }
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="mx-auto max-w-3xl rounded-2xl border border-indigo-100 bg-indigo-50/70 px-5 py-4 text-center text-sm leading-6 text-indigo-900">
                  <span className="font-semibold">
                    Need more help?
                  </span>{" "}
                  Try a more specific
                  description or include
                  your location and
                  transportation needs for
                  better matches.
                </div>
              </div>
            )}
        </section>
        <section
  id="about"
  aria-labelledby="about-heading"
  className="mx-auto mt-20 max-w-6xl px-4 pb-10 sm:px-6 lg:px-8"
>
  <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-xl shadow-blue-900/5 backdrop-blur-xl sm:p-10">
    <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:items-center">
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
          About AccessAI
        </span>

        <h2
          id="about-heading"
          className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900"
        >
          Finding the right community support should be easier.
        </h2>
      </div>

      <div className="space-y-4 text-base leading-7 text-slate-600">
        <p>
          AccessAI helps people describe what they need in
          everyday language and discover relevant community
          resources.
        </p>

        <p>
          Results are organized around factors such as location,
          services, transportation, language, and other available
          resource information.
        </p>

        <p className="font-semibold text-slate-800">
          Our goal is to make community information easier to
          understand, navigate, and access.
        </p>
      </div>
    </div>
  </div>
</section>

<section
  id="accessibility"
  aria-labelledby="accessibility-heading"
  className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
>
  <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 shadow-xl shadow-indigo-900/5 sm:p-10">
    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
          Accessibility
        </span>

        <h2
          id="accessibility-heading"
          className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900"
        >
          Designed with accessibility in mind.
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-600">
          AccessAI follows accessibility-conscious design
          principles so that people can navigate and interact
          with the application using different devices and input
          methods.
        </p>
      </div>

      <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
          <div className="text-2xl" aria-hidden="true">
            ⌨️
          </div>
          <h3 className="mt-3 font-bold text-slate-900">
            Keyboard navigation
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Interactive controls are designed to remain usable
            without requiring a mouse.
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
          <div className="text-2xl" aria-hidden="true">
            👁️
          </div>
          <h3 className="mt-3 font-bold text-slate-900">
            Visible focus
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Focus indicators help users understand where they are
            on the page.
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
          <div className="text-2xl" aria-hidden="true">
            🎨
          </div>
          <h3 className="mt-3 font-bold text-slate-900">
            High contrast
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Text and interactive elements use contrast-conscious
            colour choices.
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
          <div className="text-2xl" aria-hidden="true">
            🧭
          </div>
          <h3 className="mt-3 font-bold text-slate-900">
            Clear structure
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Headings, landmarks, labels, and logical sections make
            the interface easier to navigate.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5">
      <p className="text-sm leading-6 text-indigo-950">
        <strong>Reduced motion:</strong> AccessAI respects your
        device's reduced-motion preference and minimizes
        animations when it is enabled.
      </p>
    </div>
  </div>
</section>
      </div>

      <footer className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
          <p>
            AccessAI — helping people
            discover community support.
          </p>

          <p>
            Designed with accessibility
            and inclusive access in mind.
          </p>
        </div>
      </footer>
    </main>
  );
}