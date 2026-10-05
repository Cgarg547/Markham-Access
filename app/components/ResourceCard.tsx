import MatchScore from "./MatchScore";
import ResourceActions from "./ResourceActions";

type Resource = {
  id: string;
  name?: string;
  category?: string;
  city?: string;
  province?: string;
  address?: string;
  description?: string;
  eligibility?: string;
  languages?: string | string[];
  services?: string | string[];
  tags?: string | string[];
  transportation?: string | string[];
  phone?: string;
  website?: string;
  verified?: boolean | string;
  matchScore?: number;
};

type Analysis = {
  userType?: string;
  location?: string;
  transportation?: string;
  urgency?: string;
  needs?: string[];
  detectedLanguage?: string;
  languages?: string[];
};

type Props = {
  resource: Resource;
  analysis?: Analysis;
};

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) return [];

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);

        if (Array.isArray(parsed)) {
          return parsed.map(String).filter(Boolean);
        }
      } catch {
        // Fall through.
      }
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getCategoryIcon(category?: string) {
  const value = category?.toLowerCase() || "";

  if (
    value.includes("food") ||
    value.includes("grocer") ||
    value.includes("nutrition")
  ) {
    return "🍎";
  }

  if (
    value.includes("employment") ||
    value.includes("job") ||
    value.includes("career")
  ) {
    return "💼";
  }

  if (
    value.includes("newcomer") ||
    value.includes("settlement") ||
    value.includes("immigrant")
  ) {
    return "🌎";
  }

  if (
    value.includes("language") ||
    value.includes("education")
  ) {
    return "📚";
  }

  if (
    value.includes("housing") ||
    value.includes("shelter")
  ) {
    return "🏠";
  }

  if (
    value.includes("health") ||
    value.includes("medical")
  ) {
    return "🏥";
  }

  return "🤝";
}

function getDirectionsUrl(resource: Resource) {
  const address =
    resource.address ||
    [resource.city, resource.province]
      .filter(Boolean)
      .join(", ");

  if (!address) return "#";

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

function getWhyMatched(
  resource: Resource,
  analysis?: Analysis
) {
  const reasons: string[] = [];

  const services = toArray(resource.services).map(
    (item) => item.toLowerCase()
  );

  const needs = (analysis?.needs || []).map(
    (item) => item.toLowerCase()
  );

  if (
    needs.some((need) =>
      services.some(
        (service) =>
          service.includes(need) ||
          need.includes(service)
      )
    )
  ) {
    reasons.push("Matches your requested services");
  }

  if (
    analysis?.location &&
    resource.city
      ?.toLowerCase()
      .includes(analysis.location.toLowerCase())
  ) {
    reasons.push(`Located in ${analysis.location}`);
  }

  if (
    analysis?.transportation &&
    analysis.transportation
      .toLowerCase()
      .includes("no car") &&
    toArray(resource.transportation).length > 0
  ) {
    reasons.push("Transportation information available");
  }

  if (reasons.length === 0) {
    reasons.push("Relevant community support");
  }

  return reasons.slice(0, 3);
}

export default function ResourceCard({
  resource,
  analysis,
}: Props) {
  const services = toArray(resource.services);
  const languages = toArray(resource.languages);
  const transportation = toArray(
    resource.transportation
  );

  const score =
    typeof resource.matchScore === "number"
      ? resource.matchScore
      : 0;

  const reasons = getWhyMatched(
    resource,
    analysis
  );

  const verified =
    resource.verified === true ||
    String(resource.verified).toLowerCase() ===
      "true";

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.09)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(30,64,175,0.16)] sm:p-6">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-100/60 blur-3xl transition-transform duration-500 group-hover:scale-150"
      />

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl shadow-lg shadow-blue-900/20"
            >
              {getCategoryIcon(resource.category)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-slate-950 sm:text-xl">
                  {resource.name || "Community Resource"}
                </h3>

                {verified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    <span aria-hidden="true">✓</span>
                    Verified
                  </span>
                )}
              </div>

              {resource.category && (
                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {resource.category}
                </p>
              )}

              {(resource.city || resource.address) && (
                <p className="mt-2 text-sm text-slate-600">
                  📍{" "}
                  {resource.address ||
                    [resource.city, resource.province]
                      .filter(Boolean)
                      .join(", ")}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0">
            <MatchScore score={score} />
          </div>
        </div>

        {resource.description && (
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {resource.description}
          </p>
        )}

        {reasons.length > 0 && (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-800">
              Why this matches
            </p>

            <ul className="space-y-1.5">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-2 text-sm text-blue-950"
                >
                  <span
                    aria-hidden="true"
                    className="font-bold text-blue-600"
                  >
                    ✓
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Services
            </p>

            <div className="flex flex-wrap gap-2">
              {services.slice(0, 6).map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {(languages.length > 0 ||
          transportation.length > 0) && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {languages.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Languages
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {languages.slice(0, 5).join(", ")}
                </p>
              </div>
            )}

            {transportation.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Transportation
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {transportation
                    .slice(0, 5)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 border-t border-slate-200 pt-5">
          <ResourceActions
            resource={resource}
            directionsUrl={getDirectionsUrl(resource)}
          />
        </div>
      </div>
    </article>
  );
}