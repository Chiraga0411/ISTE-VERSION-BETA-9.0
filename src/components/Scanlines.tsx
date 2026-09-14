export default function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* faint grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* moving scanline */}
      <div
        className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-matrix-500/[0.04] to-transparent"
        style={{ animation: 'scanline-move 8s linear infinite' }}
      />
      {/* CRT vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}
