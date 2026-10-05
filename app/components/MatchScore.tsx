type MatchScoreProps = {
  score: number;
};

export default function MatchScore({
  score,
}: MatchScoreProps) {
  const safeScore = Math.max(
    0,
    Math.min(100, Math.round(score))
  );

  let label = "Good match";
  let textClass =
    "text-indigo-700";
  let barClass =
    "bg-indigo-600";

  if (safeScore >= 90) {
    label = "Excellent match";
    textClass = "text-emerald-700";
    barClass = "bg-emerald-600";
  } else if (safeScore >= 75) {
    label = "Strong match";
    textClass = "text-blue-700";
    barClass = "bg-blue-600";
  } else if (safeScore < 50) {
    label = "Possible match";
    textClass = "text-amber-700";
    barClass = "bg-amber-500";
  }

  return (
    <div
      className="w-24"
      aria-label={`${safeScore}% match. ${label}.`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold ${textClass}`}
        >
          {label}
        </span>

        <span
          className={`text-sm font-extrabold ${textClass}`}
        >
          {safeScore}%
        </span>
      </div>

      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={safeScore}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Match score ${safeScore} percent`}
      >
        <div
          className={`
            h-full
            rounded-full
            ${barClass}
            transition-[width]
            duration-700
            ease-out
            motion-reduce:transition-none
          `}
          style={{
            width: `${safeScore}%`,
          }}
        />
      </div>
    </div>
  );
}