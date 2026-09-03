import { useState } from "react"
import TopBar from "../components/TopBar"

const documentos = [
  {
    id: 1,
    titulo: "Protocolo de atención en crisis de salud mental",
    tipo: "Protocolo",
    area: "Salud Mental",
    fecha: "2026-01-15",
    version: "v3.2",
    acceso: "Profesionales",
    icon: "🔴",
  },
  {
    id: 2,
    titulo: "Guía de apoyos razonables para estudiantes con discapacidad",
    tipo: "Guía",
    area: "Inclusión",
    fecha: "2026-03-10",
    version: "v2.0",
    acceso: "Todos",
    icon: "♿",
  },
  {
    id: 3,
    titulo: "Rutas de atención institucional — Bienestar Universitario",
    tipo: "Ruta",
    area: "General",
    fecha: "2025-11-20",
    version: "v1.8",
    acceso: "Todos",
    icon: "🗺️",
  },
  {
    id: 4,
    titulo: "Manual de consentimiento informado y protección de datos",
    tipo: "Manual",
    area: "Legal",
    fecha: "2026-02-28",
    version: "v1.1",
    acceso: "Profesionales",
    icon: "📜",
  },
  {
    id: 5,
    titulo: "Escala GAD-7 — Trastorno de Ansiedad Generalizada",
    tipo: "Instrumento",
    area: "Salud Mental",
    fecha: "2025-08-01",
    version: "v1.0",
    acceso: "Profesionales",
    icon: "📊",
  },
  {
    id: 6,
    titulo: "Material psicoeducativo: Manejo del estrés académico",
    tipo: "Material",
    area: "Salud Mental",
    fecha: "2026-04-12",
    version: "v2.3",
    acceso: "Todos",
    icon: "📚",
  },
  {
    id: 7,
    titulo: "Normativa sobre inclusión educativa — Ley 1618 de 2013",
    tipo: "Normativa",
    area: "Inclusión",
    fecha: "2025-06-15",
    version: "v1.0",
    acceso: "Todos",
    icon: "⚖️",
  },
  {
    id: 8,
    titulo: "Lineamientos para la atención psicosocial en contextos académicos",
    tipo: "Lineamiento",
    area: "General",
    fecha: "2026-05-30",
    version: "v1.4",
    acceso: "Profesionales",
    icon: "📋",
  },
  {
    id: 9,
    titulo: "Protocolo institucional de prevención y atención de VBG",
    tipo: "Protocolo",
    area: "Violencias de Género",
    fecha: "2026-02-10",
    version: "v1.0",
    acceso: "Profesionales",
    icon: "🛡️",
  },
  {
    id: 10,
    titulo: "Rutas de atención institucional en violencias basadas en género",
    tipo: "Ruta",
    area: "Violencias de Género",
    fecha: "2026-02-10",
    version: "v1.0",
    acceso: "Todos",
    icon: "🗺️",
  },
  {
    id: 11,
    titulo: "Normatividad — Ley 1257 de 2008 y Ley 1719 de 2014",
    tipo: "Normativa",
    area: "Violencias de Género",
    fecha: "2025-09-05",
    version: "v1.0",
    acceso: "Todos",
    icon: "⚖️",
  },
  {
    id: 12,
    titulo: "Formato de consentimiento informado y desistimiento — VBG",
    tipo: "Manual",
    area: "Violencias de Género",
    fecha: "2026-02-10",
    version: "v1.1",
    acceso: "Profesionales",
    icon: "📜",
  },
  {
    id: 13,
    titulo: "Guía de categorización de mercados — Ucevistas de Corazón",
    tipo: "Guía",
    area: "Donaciones",
    fecha: "2026-05-05",
    version: "v1.0",
    acceso: "Profesionales",
    icon: "🧺",
  },
  {
    id: 14,
    titulo: "Criterios de priorización socioeconómica para apoyos alimentarios",
    tipo: "Lineamiento",
    area: "Donaciones",
    fecha: "2026-05-05",
    version: "v1.0",
    acceso: "Profesionales",
    icon: "📋",
  },
]

const tipoColors: Record<string, string> = {
  Protocolo: "#FF005A",
  Guía: "#2563eb",
  Ruta: "#007F2F",
  Manual: "#7c3aed",
  Instrumento: "#FFB400",
  Material: "#059669",
  Normativa: "#374151",
  Lineamiento: "#007F2F",
}

interface RepositorioProps {
  onNavigate: (view: string) => void
}

export default function Repositorio({ onNavigate }: RepositorioProps) {
  const [search, setSearch] = useState("")
  const [filterArea, setFilterArea] = useState("Todos")

  const areas = [
    "Todos",
    "Salud Mental",
    "Inclusión",
    "Violencias de Género",
    "Donaciones",
    "General",
    "Legal",
  ]
  const filtered = documentos.filter((d) => {
    const matchSearch =
      d.titulo.toLowerCase().includes(search.toLowerCase()) ||
      d.tipo.toLowerCase().includes(search.toLowerCase())
    const matchArea = filterArea === "Todos" || d.area === filterArea
    return matchSearch && matchArea
  })

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TopBar
        title="Repositorio Psicoeducativo"
        subtitle="Protocolos, guías, rutas de atención y material institucional"
        onClose={() => onNavigate("home")}
        actions={
          <button
            className="btn-cta"
            style={{
              padding: "8px 16px",
              fontSize: "0.82rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            + Subir documento
          </button>
        }
      />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Filters */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "14px 18px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: 1,
              minWidth: 200,
              background: "#f9fafb",
              borderRadius: 8,
              padding: "8px 12px",
              border: "1.5px solid #e5e7eb",
            }}
          >
            <span style={{ color: "#9ca3af" }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar documentos, protocolos, guías…"
              style={{
                border: "none",
                background: "none",
                fontSize: "0.875rem",
                outline: "none",
                flex: 1,
                fontFamily: "inherit",
                color: "#2F2F30",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {areas.map((a) => (
              <button
                key={a}
                onClick={() => setFilterArea(a)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: filterArea === a ? "#007F2F" : "#f3f4f6",
                  color: filterArea === a ? "#fff" : "#6b7280",
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Docs grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="module-card"
              style={{ padding: "18px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}
                >
                  {doc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "#2F2F30",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {doc.titulo}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      marginTop: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        background: (tipoColors[doc.tipo] ?? "#374151") + "18",
                        color: tipoColors[doc.tipo] ?? "#374151",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: 20,
                      }}
                    >
                      {doc.tipo}
                    </span>
                    <span
                      style={{
                        background: "#f3f4f6",
                        color: "#6b7280",
                        fontSize: "0.65rem",
                        padding: "2px 7px",
                        borderRadius: 20,
                      }}
                    >
                      {doc.area}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 10,
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#9ca3af" }}>
                    {doc.version} · {doc.fecha}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: doc.acceso === "Todos" ? "#007F2F" : "#FFB400",
                      fontWeight: 600,
                      marginTop: 1,
                    }}
                  >
                    🔑 {doc.acceso}
                  </div>
                </div>
                <button
                  style={{
                    background: "#e6f4ec",
                    color: "#007F2F",
                    border: "none",
                    borderRadius: 7,
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
