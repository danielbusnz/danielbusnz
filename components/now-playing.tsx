"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const punct = { color: "var(--ctp-overlay1)" };

export function NowPlaying() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      void audio.play();
    }
  }

  return (
    <p className="mt-1 font-mono text-sm">
      <span style={{ color: "var(--ctp-subtext1)" }}>currently_listening</span>
      <span style={punct}>: </span>
      <a
        href="https://www.youtube.com/watch?v=7kh_r2uwZIw"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#8caaee" }}
      >
        &quot;2 lost electronic&quot;
      </a>
      <span style={punct}>;</span>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        title={playing ? "pause" : "play"}
        className="ml-2 inline-block align-text-bottom"
      >
        <Image
          src="/cd-rom.png"
          alt=""
          width={85}
          height={96}
          className="h-auto w-5"
        />
      </button>
      <audio
        ref={audioRef}
        src="/audio/pilotredsun-2-lost-electronic.mp3"
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </p>
  );
}
