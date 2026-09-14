import React, { useEffect, useRef, useState } from "react";

/**
 * RetroTerminalBackground
 * ------------------------------------------------------------------
 * A full-viewport animated background that recreates a green-phosphor
 * terminal music player (file tree + playlist + status bar), typed
 * out character-by-character, sitting behind a soft blur layer so
 * real page content stays easy to read on top of it.
 *
 * Usage:
 *   <RetroTerminalBackground>
 *     <YourPageContent />
 *   </RetroTerminalBackground>
 *
 * No props are required — it renders a demo hero on its own so it
 * can be dropped straight into a preview.
 */

const DIRECTORIES = [
  "../", "bin/", "boot/", "dev/", "etc/", "home/", "lib/",
  "lost+found/", "media/", "mnt/", "opt/", "proc/", "root/",
  "run/", "sbin/", "srv/", "sys/", "tmp/", "usr/", "var/",
];

type Track = { artist: string; title: string; album?: string; time: string };

const PLAYLIST: Track[] = [
  { artist: "Creedence Clearwater Revival", title: "Have You Ever Seen The Rain", time: "02:38" },
  { artist: "Cutting Crew", title: "I Just Died In Your Arms", time: "04:21" },
  { artist: "Dark Materia", title: "The Picard Song", time: "04:40" },
  { artist: "Dave Matthews Band", title: "What Would You Say", album: "Under the Table", time: "03:42" },
  { artist: "Dave Matthews Band", title: "Ants Marching", album: "Under the Table", time: "06:40" },
  { artist: "Dave Matthews Band", title: "All Along the Watchtower", time: "10:24" },
  { artist: "Dave Matthews Band", title: "Crash Into Me", time: "05:16" },
  { artist: "David Bowie", title: "1984", album: "Diamond Dogs", time: "03:27" },
  { artist: "David Bowie", title: "Queen Bitch", album: "Hunky Dory", time: "03:13" },
  { artist: "David Bowie", title: "Starman", album: "The Best Of David Bowie 1969", time: "04:18" },
  { artist: "David Bowie", title: "Life On Mars", album: "The Best Of David Bowie 196", time: "03:52" },
  { artist: "David Bowie", title: "China Girl", album: "The Wedding", time: "05:29" },
  { artist: "Deep Purple", title: "Black Night", album: "Deepest Purple: The Very Best", time: "03:26" },
  { artist: "Deep Purple", title: "Burn", album: "Deepest Purple", time: "06:03" },
  { artist: "Deep Purple", title: "Child In Time", time: "10:17" },
  { artist: "Deep Purple", title: "Highway Star", time: "06:07" },
  { artist: "Deep Purple", title: "Knocking At Your Back Door", time: "07:05" },
  { artist: "Deep Purple", title: "Perfect Strangers", time: "05:21" },
  { artist: "Deep Purple", title: "Smoke On The Water", time: "05:05" },
  { artist: "Deep Purple", title: "Space Truckin'", time: "04:34" },
  { artist: "Deep Purple", title: "Hush", album: "When We Rock We Rock", time: "04:25" },
  { artist: "Depeche Mode", title: "Dream On", album: "Exciter", time: "04:21" },
  { artist: "Depeche Mode", title: "Black Celebration", time: "04:53" },
  { artist: "Depeche Mode", title: "Enjoy the Silence", time: "03:57" },
  { artist: "Depeche Mode", title: "Everything Counts", time: "03:52" },
  { artist: "Depeche Mode", title: "People Are People", time: "00:01" },
  { artist: "Depeche Mode", title: "Strange Love", time: "04:40" },
  { artist: "Dire Straits", title: "The Man's Too Strong", album: "Brothers in Arms", time: "04:48" },
  { artist: "Dire Straits", title: "Brothers In Arms", time: "04:06" },
  { artist: "Dire Straits", title: "Money For Nothing", album: "Money For Nothing", time: "05:48" },
  { artist: "Dire Straits", title: "Twisting By The Pool", album: "Money For Nothing", time: "00:13" },
  { artist: "Dire Straits", title: "Industrial Disease", time: "05:58" },
  { artist: "Dire Straits", title: "Lions", time: "05:55" },
  { artist: "Dire Straits", title: "Romeo and Juliet", time: "05:12" },
  { artist: "Dire Straits", title: "So Far Away From Me", time: "03:28" },
  { artist: "Dire Straits", title: "Sultans Of Swing (Acoustic)", time: "05:46" },
  { artist: "Dire Straits", title: "Walk Of Life", time: "04:12" },
  { artist: "Dirty Vegas", title: "Days Go By (Acoustic)", album: "Days Go By", time: "02:43" },
  { artist: "Don Henley", title: "All She Wants to Do Is Dance", time: "04:28" },
  { artist: "Don Henley", title: "Boys of Summer", time: "04:43" },
  { artist: "Don Henley", title: "Dirty Laundry", time: "05:37" },
  { artist: "Don Henley", title: "Leather And Lace", time: "04:01" },
  { artist: "Duran Duran", title: "Notorious", album: "Decade", time: "04:02" },
  { artist: "Duran Duran", title: "Planet Earth", album: "Decade", time: "03:27" },
  { artist: "Duran Duran", title: "Save a Prayer", album: "Decade", time: "05:23" },
  { artist: "Duran Duran", title: "Union of the Snake", album: "Decade", time: "04:33" },
  { artist: "Duran Duran", title: "Femme Fatale", album: "The Wedding Album", time: "05:27" },
  { artist: "Duran Duran", title: "Morning After", time: "04:23" },
  { artist: "Duran Duran", title: "A View To A Kill", time: "04:35" },
  { artist: "Duran Duran", title: "Come Undone", time: "05:06" },
  { artist: "Duran Duran", title: "Electric Barbarella", time: "03:30" },
];

function useTypewriterLines(lines: string[], msPerChar = 14, startDelay = 200, lineGap = 40) {
  const [revealed, setRevealed] = useState<number[]>(() => lines.map(() => 0));
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    function typeLine(lineIdx: number, baseDelay: number) {
      const text = lines[lineIdx];
      for (let c = 1; c <= text.length; c++) {
        const t = setTimeout(() => {
          if (cancelled) return;
          setRevealed((prev) => {
            const next = [...prev];
            next[lineIdx] = c;
            return next;
          });
          if (c === text.length) {
            setDoneCount((d) => d + 1);
          }
        }, baseDelay + c * msPerChar);
        timeouts.push(t);
      }
      if (text.length === 0) {
        const t = setTimeout(() => {
          if (!cancelled) setDoneCount((d) => d + 1);
        }, baseDelay);
        timeouts.push(t);
      }
    }

    let cumulative = startDelay;
    lines.forEach((line, idx) => {
      typeLine(idx, cumulative);
      cumulative += line.length * msPerChar + lineGap;
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("\u0000")]);

  return { revealed, doneCount };
}

function padRight(s: string, len: number) {
  return s.length >= len ? s.slice(0, len) : s + " ".repeat(len - s.length);
}

export default function RetroTerminalBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dirLines = DIRECTORIES;
  const playlistLines = PLAYLIST.map((t) => {
    const left = t.album
      ? `${t.artist} - ${t.title} (${t.album})`
      : `${t.artist} - ${t.title}`;
    return { display: left, time: t.time };
  });
  const playlistText = playlistLines.map((p) => p.display);

  const { revealed: dirRevealed } = useTypewriterLines(dirLines, 10, 150, 30);
  const { revealed: playRevealed, doneCount: playDone } = useTypewriterLines(
    playlistText,
    5,
    600,
    18
  );

  const playlistRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = playlistRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [playDone]);

  // Elapsed playback clock + progress bar
  const [elapsed, setElapsed] = useState(112); // 01:52
  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => (e + 1) % 210), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };
  const progressPct = Math.min(100, (elapsed / 210) * 100);

  const nowPlayingFull = "Duran Duran - Girls On Film";
  const [npIdx, setNpIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setNpIdx((i) => (i < nowPlayingFull.length ? i + 1 : i));
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={styles.root}>
      <style>{CRT_CSS}</style>

      {/* ---------- animated terminal layer ---------- */}
      <div className="crt-shell" style={styles.crtShell}>
        <div className="scanlines" />
        <div className="flicker" />

        <div style={styles.panels}>
          {/* left: directory tree */}
          <div style={styles.leftPanel}>
            <div style={styles.pathBar}>./</div>
            {dirLines.map((d, i) => {
              const shown = d.slice(0, dirRevealed[i] || 0);
              const isTyping = (dirRevealed[i] || 0) < d.length;
              return (
                <div key={i} style={styles.dirLine}>
                  {shown}
                  {isTyping && <span className="cursor">▍</span>}
                </div>
              );
            })}
          </div>

          {/* right: playlist */}
          <div style={styles.rightPanel}>
            <div style={styles.playlistHeader}>Playlist</div>
            <div ref={playlistRef} style={styles.playlistBody}>
              {playlistLines.map((p, i) => {
                const shown = p.display.slice(0, playRevealed[i] || 0);
                const isTyping =
                  (playRevealed[i] || 0) < p.display.length &&
                  (playRevealed[i] || 0) > 0;
                const isDone = (playRevealed[i] || 0) === p.display.length;
                return (
                  <div key={i} style={styles.playlistLine}>
                    <span style={styles.trackText}>
                      {shown}
                      {isTyping && <span className="cursor">▍</span>}
                    </span>
                    {isDone && <span style={styles.trackTime}>[{p.time}]</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* bottom status bar */}
        <div style={styles.statusBar}>
          <div style={styles.nowPlayingRow}>
            <span style={styles.blinkDot}>●</span>
            <span>&nbsp;Playing...</span>
          </div>
          <div style={styles.trackRow}>
            <span>&gt; {nowPlayingFull.slice(0, npIdx)}</span>
            {npIdx < nowPlayingFull.length && <span className="cursor">▍</span>}
          </div>
          <div style={styles.progressTrack}>
            <div
              style={{ ...styles.progressFill, width: `${progressPct}%` }}
            />
          </div>
          <div style={styles.metaRow}>
            <span>
              {fmt(elapsed)} {fmt(210 - elapsed)} [03:30]
            </span>
            <span>44KHz&nbsp;&nbsp;128Kbps</span>
            <span>[STEREO] [NET] [SHUFFLE] [REPEAT] [NEXT]</span>
          </div>
        </div>
      </div>

      {/* ---------- blur veil so foreground content stays legible ---------- */}
      <div style={styles.blurVeil} />

      {/* ---------- foreground content ---------- */}
      <div style={styles.foreground}>
        {children ?? <DemoHero />}
      </div>
    </div>
  );
}

function DemoHero() {
  return (
    <div style={demoStyles.wrap}>
      <div style={demoStyles.eyebrowless}>
        <h1 style={demoStyles.h1}>Your content, in front.</h1>
        <p style={demoStyles.p}>
          The terminal keeps playing behind a soft blur, so whatever you put
          here — headings, cards, forms — stays easy to read.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "#000",
    overflow: "hidden",
    fontFamily:
      "'Courier New', 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
  },
  crtShell: {
    position: "absolute",
    inset: 0,
    background: "#000",
    color: "#2be24a",
    display: "flex",
    flexDirection: "column",
  },
  panels: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    borderBottom: "1px solid #123318",
  },
  leftPanel: {
    width: "28%",
    minWidth: 180,
    borderRight: "1px solid #123318",
    padding: "10px 14px",
    overflow: "hidden",
    textShadow: "0 0 6px rgba(43,226,74,0.55)",
    fontSize: "clamp(11px, 1.1vw, 15px)",
    lineHeight: 1.55,
  },
  pathBar: {
    opacity: 0.6,
    marginBottom: 6,
    borderBottom: "1px dashed #123318",
    paddingBottom: 6,
  },
  dirLine: {
    whiteSpace: "pre",
  },
  rightPanel: {
    flex: 1,
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    textShadow: "0 0 6px rgba(43,226,74,0.55)",
  },
  playlistHeader: {
    opacity: 0.75,
    marginBottom: 6,
    borderBottom: "1px dashed #123318",
    paddingBottom: 6,
    fontSize: "clamp(12px, 1.2vw, 16px)",
  },
  playlistBody: {
    overflow: "hidden",
    flex: 1,
    fontSize: "clamp(10px, 1vw, 14px)",
    lineHeight: 1.55,
  },
  playlistLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    whiteSpace: "pre",
  },
  trackText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  trackTime: {
    flexShrink: 0,
    opacity: 0.85,
  },
  statusBar: {
    padding: "8px 14px 10px",
    fontSize: "clamp(10px, 1vw, 13px)",
    textShadow: "0 0 6px rgba(43,226,74,0.55)",
  },
  nowPlayingRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
    opacity: 0.9,
  },
  blinkDot: {
    color: "#2be24a",
    animation: "blink 1.1s steps(1) infinite",
  },
  trackRow: {
    marginBottom: 6,
    fontWeight: 700,
  },
  progressTrack: {
    height: 10,
    background: "#0a1a0c",
    border: "1px solid #123318",
    marginBottom: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background:
      "linear-gradient(90deg, #103a17, #2be24a)",
    boxShadow: "0 0 10px rgba(43,226,74,0.7)",
    transition: "width 1s linear",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    opacity: 0.85,
  },
  blurVeil: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(6px) saturate(115%)",
    WebkitBackdropFilter: "blur(6px) saturate(115%)",
    background: "rgba(0,0,0,0.35)",
  },
  foreground: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    width: "100%",
  },
};

const demoStyles: Record<string, React.CSSProperties> = {
  wrap: {
    maxWidth: 640,
    textAlign: "center",
    fontFamily:
      "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  eyebrowless: {
    background: "rgba(10, 14, 11, 0.55)",
    border: "1px solid rgba(43,226,74,0.25)",
    borderRadius: 14,
    padding: "40px 36px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  h1: {
    margin: 0,
    marginBottom: 14,
    fontSize: "clamp(28px, 4vw, 44px)",
    color: "#eafff0",
    letterSpacing: "-0.01em",
  },
  p: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.6,
    color: "rgba(234,255,240,0.75)",
  },
};

const CRT_CSS = `
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes flickerAnim {
  0% { opacity: 0.06; }
  5% { opacity: 0.09; }
  10% { opacity: 0.05; }
  15% { opacity: 0.08; }
  100% { opacity: 0.06; }
}
.cursor {
  display: inline-block;
  margin-left: 1px;
  animation: blink 0.9s steps(1) infinite;
  color: #2be24a;
}
.scanlines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0px,
    rgba(0,0,0,0) 1px,
    rgba(0,0,0,0.18) 2px,
    rgba(0,0,0,0.18) 3px
  );
  mix-blend-mode: multiply;
  z-index: 1;
}
.flicker {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: #2be24a;
  animation: flickerAnim 6s infinite;
  z-index: 1;
  mix-blend-mode: overlay;
}
`;
