type Resource = {
  id: string;
  name?: string;
  address?: string;
  city?: string;
  province?: string;
  phone?: string;
  website?: string;
};

type ResourceActionsProps = {
  resource: Resource;
  directionsUrl: string;
};

export default function ResourceActions({
  resource,
  directionsUrl,
}: ResourceActionsProps) {
  const hasPhone = Boolean(resource.phone);
  const hasWebsite = Boolean(resource.website);
  const hasDirections =
    Boolean(directionsUrl && directionsUrl !== "#");

  return (
    <div
      aria-label={`Actions for ${resource.name || "resource"}`}
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
    >
      {hasDirections && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${
            resource.name || "this resource"
          }`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          <span aria-hidden="true">📍</span>
          Get Directions
          <span aria-hidden="true">↗</span>
        </a>
      )}

      {hasWebsite && (
        <a
          href={resource.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit website for ${
            resource.name || "this resource"
          }`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          <span aria-hidden="true">🌐</span>
          Website
          <span aria-hidden="true">↗</span>
        </a>
      )}

      {hasPhone && (
        <a
          href={`tel:${resource.phone}`}
          aria-label={`Call ${
            resource.name || "this resource"
          } at ${resource.phone}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          <span aria-hidden="true">☎</span>
          Call
        </a>
      )}

      {!hasDirections &&
        !hasWebsite &&
        !hasPhone && (
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Contact information is not currently available.
          </p>
        )}
    </div>
  );
}