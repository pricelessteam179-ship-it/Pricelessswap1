import { useEffect, useRef } from "react";
import Script from "next/script";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!mounted || !container) return;

      if (typeof window !== "undefined" && (window as any).Jupiter) {
        try {
          (window as any).Jupiter.init({
            displayMode: "integrated",
            hideHeader: true,
            container: container,
            integratedTargetId: "jup-container",
            defaultInputMint: "So11111111111111111111111111111111111111112", // SOL
            defaultOutputMint: "AFk1RUr18RCFjhKHQN7ufxPBiQYWjXifAw4y4n44jups", // Priceless
            defaultAmount: 0.1, // Menge an SOL
          });
          clearInterval(interval); // Stoppe das Polling nach erfolgreicher Initialisierung
        } catch (e) {
          console.error("Jupiter.init error:", e);
        }
      }
    }, 100);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        id="jup-container"
        ref={containerRef}
        style={{
          width: 420,
          height: 640,
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      />
      <Script
        src="https://plugin.jup.ag/plugin-v1.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Jupiter plugin loaded")}
      />
    </div>
  );
}

