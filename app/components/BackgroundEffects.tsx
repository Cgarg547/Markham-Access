"use client";

export default function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base atmospheric gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.14),transparent_32%),linear-gradient(135deg,#f8fbff_0%,#eef4ff_48%,#f8faff_100%)]" />

      {/* Soft floating orbs */}
      <div className="accessai-orb accessai-orb-one absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />

      <div className="accessai-orb accessai-orb-two absolute -right-32 top-40 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="accessai-orb accessai-orb-three absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Accessibility-friendly grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,64,175,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}