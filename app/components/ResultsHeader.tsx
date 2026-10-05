type Analysis = {
  userType?: string;
  location?: string;
  transportation?: string;
  urgency?: string;
  needs?: string[];
  detectedLanguage?: string;
  languages?: string[];
};

type ResultsHeaderProps = {
  analysis?: Analysis;
  resultCount: number;
};

export default function ResultsHeader({
  analysis,
  resultCount,
}: ResultsHeaderProps) {
  const needs = analysis?.needs || [];

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            AccessAI results
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Resources that may help
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ranked using your location, needs and accessibility
            preferences.
          </p>
        </div>

        <div
          aria-label={`${resultCount} resources found`}
          className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800"
        >
          {resultCount}{" "}
          {resultCount === 1 ? "resource" : "resources"} found
        </div>
      </div>

      {(analysis?.location ||
        analysis?.transportation ||
        analysis?.urgency ||
        needs.length > 0) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {analysis?.location && (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
              📍 {analysis.location}
            </span>
          )}

          {analysis?.transportation && (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
              🚌 {analysis.transportation}
            </span>
          )}

          {analysis?.urgency && (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
              ⏱️ {analysis.urgency} urgency
            </span>
          )}

          {needs.slice(0, 4).map((need) => (
            <span
              key={need}
              className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-800"
            >
              {need}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}