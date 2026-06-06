"use client";

import { useState } from "react";

export default function ConsultPage() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        setJsonData(parsed);
        setError("");
      } catch (err) {
        setError("Fichier JSON invalide. Vérifie sa structure.");
        setJsonData(null);
      }
    };
    reader.readAsText(file);
  };

  // Filtrer les résultats (si la structure contient un tableau "results")
  const getFilteredResults = () => {
    if (!jsonData) return [];
    let results = jsonData.results || jsonData.raw_response?.results?.[0]?.body?.results || [];
    if (!Array.isArray(results)) results = [];
    if (!searchTerm) return results;
    const term = searchTerm.toLowerCase();
    return results.filter((res: any) =>
      JSON.stringify(res.data || res).toLowerCase().includes(term)
    );
  };

  const filteredResults = getFilteredResults();

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>📂 Visualisateur de résultats JSON</h1>
        <p style={styles.subtitle}>
          Glisse ou sélectionne un fichier JSON (type <code>lookup2bz-resultats.json</code>) pour afficher son contenu de manière claire.
        </p>

        <div style={styles.uploadZone}>
          <label style={styles.uploadLabel}>
            📁 Choisir un fichier JSON
            <input
              type="file"
              accept="application/json"
              onChange={handleFileUpload}
              style={styles.fileInput}
            />
          </label>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {jsonData && (
          <>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="🔍 Rechercher dans les résultats (nom, email, adresse...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <span style={styles.searchInfo}>
                {filteredResults.length} résultat(s) sur {getFilteredResults().length}
              </span>
            </div>

            <div style={styles.resultsGrid}>
              {filteredResults.map((result: any, idx: number) => (
                <ResultCard key={idx} result={result} index={idx} />
              ))}
              {filteredResults.length === 0 && (
                <div style={styles.noResults}>Aucun résultat ne correspond à la recherche.</div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// Composant pour afficher une carte détaillée d'un résultat
function ResultCard({ result, index }: { result: any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const data = result.data || result;
  const source = result.source || "source inconnue";
  const title = result._title || data.nom || data.prenom || `Entrée ${index + 1}`;

  // Fonction pour rendre une ligne clé/valeur proprement
  const renderKeyValue = (key: string, value: any) => {
    if (value === null || value === undefined) return null;
    if (typeof value === "object") {
      return (
        <div key={key} style={styles.objectField}>
          <strong>{key} :</strong>
          <pre style={styles.pre}>{JSON.stringify(value, null, 2)}</pre>
        </div>
      );
    }
    return (
      <div key={key} style={styles.fieldRow}>
        <span style={styles.fieldKey}>{key}</span>
        <span style={styles.fieldValue}>{String(value)}</span>
      </div>
    );
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader} onClick={() => setExpanded(!expanded)}>
        <div>
          <span style={styles.cardTitle}>{title}</span>
          <span style={styles.cardSource}>📁 {source}</span>
        </div>
        <span style={styles.expandIcon}>{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div style={styles.cardContent}>
          {Object.entries(data).map(([k, v]) => renderKeyValue(k, v))}
        </div>
      )}
    </div>
  );
}

// Styles (inline, cohérents avec le reste du site)
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: "100vh",
    width: "100%",
    background: "#f5f7fb",
    fontFamily: "Inter, Arial, sans-serif",
    padding: "2rem 1rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "0.5rem",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#475569",
    marginBottom: "2rem",
  },
  uploadZone: {
    marginBottom: "2rem",
  },
  uploadLabel: {
    display: "inline-block",
    background: "#ffffff",
    border: "2px dashed #cbd5e1",
    borderRadius: "12px",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#3b82f6",
    cursor: "pointer",
    transition: "0.2s",
  },
  fileInput: {
    display: "none",
  },
  errorBox: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "1rem",
    borderRadius: "12px",
    marginBottom: "1.5rem",
  },
  searchBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "2rem",
  },
  searchInput: {
    flex: "1",
    padding: "0.75rem 1rem",
    borderRadius: "40px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    outline: "none",
    transition: "0.2s",
  },
  searchInfo: {
    fontSize: "0.875rem",
    color: "#475569",
    background: "#e2e8f0",
    padding: "0.5rem 1rem",
    borderRadius: "40px",
  },
  resultsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    cursor: "pointer",
    background: "#fafcff",
    borderBottom: "1px solid #eef2f6",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#0f172a",
    display: "block",
  },
  cardSource: {
    fontSize: "0.75rem",
    color: "#64748b",
    marginLeft: "0.75rem",
  },
  expandIcon: {
    fontSize: "1rem",
    color: "#94a3b8",
  },
  cardContent: {
    padding: "1.5rem",
    borderTop: "1px solid #eef2f6",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  fieldRow: {
    display: "flex",
    flexWrap: "wrap",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "0.5rem",
    marginBottom: "0.5rem",
  },
  fieldKey: {
    width: "160px",
    fontWeight: "600",
    color: "#334155",
    fontSize: "0.85rem",
    textTransform: "capitalize",
  },
  fieldValue: {
    flex: 1,
    color: "#1e293b",
    fontSize: "0.9rem",
    wordBreak: "break-word",
  },
  objectField: {
    marginBottom: "0.75rem",
  },
  pre: {
    background: "#f8fafc",
    padding: "0.5rem",
    borderRadius: "8px",
    fontSize: "0.8rem",
    overflowX: "auto",
    marginTop: "0.25rem",
  },
  noResults: {
    textAlign: "center",
    padding: "3rem",
    color: "#64748b",
    background: "#ffffff",
    borderRadius: "20px",
  },
};