import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        fontSize: 60,
        fontWeight: 700,
        color: "#ffffff",
      }}
    >
      {/* Pattern dots */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          zIndex: 1,
        }}
      >
        {/* AI Icon */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "60px",
          }}
        >
          🤖
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            textAlign: "center",
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI Engineering
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 400,
            color: "#a0a0a0",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Best Resources & Engineers for Building AI Applications
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          fontSize: "24px",
          color: "#666",
        }}
      >
        aieng.wahyuikbal.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
