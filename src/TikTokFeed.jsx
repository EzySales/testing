// src/TikTokFeed.jsx
import React from "react";

export default function TikTokFeed() {
  const videos = [
    "https://www.tiktok.com/@shelfishmushroom/video/7443131760018363690",
    "https://www.tiktok.com/@shelfishmushroom/video/7443077529418972466",
    "https://www.tiktok.com/@shelfishmushroom/video/7442965173604840754",
  ];

  return (
    <div
      style={{
        marginTop: 40,
        padding: 20,
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #eee",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>
        🎥 Latest TikTok Videos
      </h3>

      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 10,
        }}
      >
        {videos.map((url, index) => (
          <iframe
            key={index}
            src={url}
            style={{
              width: 280,
              height: 500,
              borderRadius: 10,
              border: "none",
              flex: "0 0 auto",
            }}
            allow="autoplay"
          ></iframe>
        ))}
      </div>
    </div>
  );
}
