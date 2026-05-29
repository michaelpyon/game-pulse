import { ImageResponse } from "next/og";

export const alt = "GamePulse, game health signal engine";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0E17",
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#E2E8F0",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#06B6D4",
            }}
          >
            game-pulse
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.02 }}>
            GamePulse
          </div>
          <div style={{ fontSize: 40, fontWeight: 500, color: "#06B6D4" }}>
            Game health signal engine
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#94A3B8",
          }}
        >
          <div style={{ color: "#22C55E" }}>&gt;</div>
          8 titles · confidence-scored sub-indices · daily refresh
        </div>
      </div>
    ),
    size,
  );
}
