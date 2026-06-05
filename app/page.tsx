"use client";

import { useEffect, type CSSProperties } from "react";

export default function HomePage() {
  useEffect(() => {
    fetch("/api/log", { method: "POST" })
      .then((r) => r.json())
      .then((data) => console.log("Connexion enregistrée :", data))
      .catch(() => console.log("Erreur d’enregistrement"));
  }, []);

  return (
    <main style={styles.main}>
      <div style={styles.backgroundGlow}></div>

      <section style={styles.card}>
        <div style={styles.badge}>🔥 Nouveau</div>

        <div style={styles.imageWrap}>
          <img src="/skibidi.png" alt="SkibidiBous" style={styles.avatar} />
        </div>

        <h1 style={styles.title}>Mode vitesse activé</h1>

        <p style={styles.subtitle}>
          Un site simple, propre et énergique, inspiré d’un style action-game
          orange avec un personnage qui fonce.
        </p>

        <div style={styles.buttons}>
          <button style={styles.primaryButton}>Entrer</button>
          <button style={styles.secondaryButton}>En savoir plus</button>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-14px) rotate(2deg);
          }
        }

        @keyframes pop {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        button {
          cursor: pointer;
        }

        button:hover {
          transform: translateY(-3px) scale(1.03);
        }

        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#fff",
    overflow: "hidden",
    position: "relative",
    background:
      "radial-gradient(circle at center, #ff7a2f 0%, #f0522a 35%, #b92316 100%)",
  },

  backgroundGlow: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.13) 0deg, rgba(255,255,255,0.13) 8deg, transparent 8deg, transparent 18deg)",
    opacity: 0.45,
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "min(92%, 460px)",
    padding: "34px 28px",
    borderRadius: "28px",
    textAlign: "center",
    background: "rgba(20, 20, 20, 0.38)",
    border: "1px solid rgba(255,255,255,0.22)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
    backdropFilter: "blur(18px)",
    animation: "pop 0.8s ease forwards",
  },

  badge: {
    display: "inline-block",
    marginBottom: "18px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: "14px",
    fontWeight: 800,
    letterSpacing: "0.5px",
  },

  imageWrap: {
    width: "220px",
    height: "220px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "0 0 35px rgba(255,255,255,0.22), 0 18px 45px rgba(0,0,0,0.35)",
    overflow: "hidden",
    animation: "float 3.2s ease-in-out infinite",
  },

  avatar: {
    width: "122%",
    height: "122%",
    objectFit: "cover",
    transform: "translateY(4px)",
  },

  title: {
    margin: "10px 0 10px",
    fontSize: "42px",
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-1.6px",
    textShadow: "0 5px 20px rgba(0,0,0,0.45)",
  },

  subtitle: {
    margin: "0 auto 26px",
    maxWidth: "360px",
    fontSize: "16px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.86)",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  primaryButton: {
    border: "none",
    padding: "13px 24px",
    borderRadius: "14px",
    background: "#ffffff",
    color: "#e74620",
    fontWeight: 900,
    fontSize: "15px",
    transition: "0.2s ease",
    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
  },

  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.35)",
    padding: "13px 24px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.12)",
    color: "#ffffff",
    fontWeight: 850,
    fontSize: "15px",
    transition: "0.2s ease",
  },
};