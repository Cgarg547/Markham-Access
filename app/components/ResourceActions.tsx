"use client";

import { useState } from "react";

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
  requestedLocation?: string;
};

export default function ResourceActions({
  resource,
  directionsUrl,
  requestedLocation,
}: ResourceActionsProps) {
  const [copied, setCopied] = useState(false);

  const hasPhone = Boolean(resource.phone);
  const hasWebsite = Boolean(resource.website);
  const hasDirections =
    Boolean(directionsUrl && directionsUrl !== "#");

  async function handleShare() {
    const shareText = [
      resource.name || "Community Resource",
      resource.address ||
        [resource.city, resource.province]
          .filter(Boolean)
          .join(", "),
      resource.phone
        ? `Phone: ${resource.phone}`
        : "",
      resource.website
        ? `Website: ${resource.website}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.share
      ) {
        await navigator.share({
          title:
            resource.name ||
            "Community Resource",
          text: shareText,
          url:
            resource.website ||
            window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        shareText
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // User cancelled native sharing.
    }
  }

  return (
    <div
      aria-label={`Actions for ${
        resource.name || "resource"
      }`}
      className="space-y-3"
    >
      {requestedLocation && (
        <p className="text-xs leading-5 text-slate-500">
          <span className="font-semibold text-slate-700">
            Based on your location:
          </span>{" "}
          {requestedLocation}
        </p>
      )}

      <div className="grid gap-2 sm:flex sm:flex-wrap">
        {hasDirections && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${
              resource.name || "this resource"
            }`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 sm:flex-none"
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
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:flex-none"
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
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-200 sm:flex-none"
          >
            <span aria-hidden="true">☎</span>
            Call
          </a>
        )}

        <button
          type="button"
          onClick={handleShare}
          aria-label={`Share ${
            resource.name || "this resource"
          }`}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:flex-none"
        >
          <span aria-hidden="true">
            {copied ? "✓" : "↗"}
          </span>
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

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
