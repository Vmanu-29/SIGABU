import { useState } from "react"
import { cases } from "../data/mockData"
import TopBar from "../components/TopBar"
import ConsentSignature from "../components/ConsentSignature"
import DesistimientoForm from "../components/DesistimientoForm"

interface InclusionProps {
  onNavigate: (view: string, extra?: string) => void
}

const statusColor: Record<string, string> = {
  activo: "#007F2F",
  seguimiento: "#FFB400",
  cerrado: "#9ca3af",
  pendiente: "#FF005A",
}

const discapacidadTipos = [
  "Visual",
  "Auditiva",
  "Motriz",
  "Cognitiva",
  "Psicosocial",
  "Múltiple",
  "Otra",
]

const detectTipo = (motivo: string) =>
  motivo.includes("visual")
    ? "Visual"
    : motivo.includes("auditiva")
      ? "Auditiva"
      : motivo.includes("motriz")
        ? "Motriz"
        : "Cognitiva"

export default function Inclusion({ onNavigate }: InclusionProps) {
  const [mode, setMode] = useState<"list" | "nuevo" | "desistimiento">("list")
  const [search, setSearch] = useState("")
  const [signed, setSigned] = useState(false)

  const iuCases = cases.filter((c) => c.modulo === "inclusion")
  const filtered = iuCases.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.codigo.toLowerCase().includes(search.toLowerCase()),
  )

  const tileCounts = discapacidadTipos
    .slice(0, 3)
    .reduce<Record<string, number>>((acc, tipo) => {
      acc[tipo] = iuCases.filter((c) => detectTipo(c.motivo) === tipo).length
      return acc
    }, {})

  if (mode === "desistimiento") {
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
          title="Registro de desistimiento · Inclusión"
          subtitle="El estudiante decide no continuar con el proceso de acompañamiento"
          onClose={() => setMode("list")}
          actions={
            <button
              onClick={() => setMode("list")}
              style={{
                background: "#f3f4f6",
                border: "none",
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.82rem",
                fontFamily: "inherit",
                color: "#374151",
              }}
            >
              ← Volver
            </button>
          }
        />
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <DesistimientoForm
            moduleColor="#2563eb"
            opciones={iuCases.map((c) => ({
              id: c.id,
              label: `${c.codigo} · ${c.nombre}`,
            }))}
            onCancel={() => setMode("list")}
            onSubmit={() => setMode("list")}
          />
        </div>
      </div>
    )
  }

  if (mode === "nuevo") {
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
          title="Nueva caracterización · Inclusión"
          subtitle="Registro de estudiante con condición de discapacidad"
          onClose={() => setMode("list")}
          actions={
            <button
              onClick={() => setMode("list")}
              style={{
                background: "#f3f4f6",
                border: "none",
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.82rem",
                fontFamily: "inherit",
                color: "#374151",
              }}
            >
              ← Volver
            </button>
          }
        />
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div
            style={{
              maxWidth: 760,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {[
              {
                title: "Datos del estudiante",
                fields: [
                  {
                    label: "Nombre completo",
                    type: "text",
                    placeholder: "Nombre completo del estudiante",
                  },
                  {
                    label: "Documento",
                    type: "text",
                    placeholder: "Cédula o TI",
                  },
                  {
                    label: "Programa",
                    type: "select",
                    options: [
                      "Ingeniería de Sistemas",
                      "Administración de Empresas",
                      "Enfermería",
                      "Derecho",
                      "Psicología",
                      "Contaduría Pública",
                    ],
                  },
                  {
                    label: "Semestre",
                    type: "select",
                    options: [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                    ],
                  },
                  {
                    label: "Correo institucional",
                    type: "email",
                    placeholder: "usuario@uceva.edu.co",
                  },
                ],
              },
              {
                title: "Condición y apoyos",
                fields: [
                  {
                    label: "Tipo de discapacidad",
                    type: "select",
                    options: discapacidadTipos,
                  },
                  {
                    label: "Certificado de discapacidad",
                    type: "select",
                    options: ["Presentado", "En trámite", "No aplica"],
                  },
                  {
                    label: "Apoyos requeridos",
                    type: "textarea",
                    placeholder:
                      "Describa los apoyos académicos, de infraestructura y otros requeridos…",
                  },
                  {
                    label: "Adaptaciones curriculares",
                    type: "select",
                    options: [
                      "No requeridas",
                      "Tiempo adicional en evaluaciones",
                      "Material en formato accesible",
                      "Intérprete LSC",
                      "Otro",
                    ],
                  },
                  {
                    label: "Profesional asignado",
                    type: "select",
                    options: ["Lic. Marcela Torres", "Dr. Andrés Castaño"],
                  },
                ],
              },
              {
                title: "Seguimiento institucional",
                fields: [
                  {
                    label: "Dependencias involucradas",
                    type: "textarea",
                    placeholder:
                      "Ej. Registro Académico, Planta Física, Laboratorios…",
                  },
                  {
                    label: "Fecha de caracterización",
                    type: "date",
                    placeholder: "",
                  },
                  {
                    label: "Observaciones iniciales",
                    type: "textarea",
                    placeholder: "Observaciones del profesional sobre el caso…",
                  },
                ],
              },
            ].map((sec) => (
              <div
                key={sec.title}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 20px",
                    background: "#f9fafb",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#007F2F",
                      margin: 0,
                    }}
                  >
                    {sec.title}
                  </h3>
                </div>
                <div
                  style={{
                    padding: "18px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                  }}
                >
                  {sec.fields.map((f) => (
                    <div
                      key={f.label}
                      style={{
                        gridColumn:
                          f.type === "textarea" ? "1 / -1" : undefined,
                      }}
                    >
                      <label
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#374151",
                          display: "block",
                          marginBottom: 5,
                        }}
                      >
                        {f.label}
                      </label>
                      {f.type === "select" ? (
                        <select
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1.5px solid #e5e7eb",
                            borderRadius: 8,
                            fontSize: "0.875rem",
                            fontFamily: "inherit",
                            outline: "none",
                            background: "#fff",
                          }}
                        >
                          <option>Seleccionar…</option>
                          {f.options?.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : f.type === "textarea" ? (
                        <textarea
                          rows={3}
                          placeholder={f.placeholder}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1.5px solid #e5e7eb",
                            borderRadius: 8,
                            fontSize: "0.875rem",
                            fontFamily: "inherit",
                            outline: "none",
                            resize: "vertical",
                            boxSizing: "border-box",
                          }}
                        />
                      ) : (
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1.5px solid #e5e7eb",
                            borderRadius: 8,
                            fontSize: "0.875rem",
                            fontFamily: "inherit",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <ConsentSignature
              moduleName="Inclusión Universitaria"
              moduleColor="#2563eb"
              consentText="Confirmo que el consentimiento informado ha sido debidamente explicado al estudiante, quien ha aceptado voluntariamente la caracterización y el tratamiento de su información conforme a los términos institucionales de confidencialidad, protección de datos y trazabilidad de la Vicerrectoría de Bienestar Universitario de la UCEVA."
              correoInstitucional="usuario@uceva.edu.co"
              onSigned={setSigned}
            />

            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn-cta"
                disabled={!signed}
                style={{
                  padding: "11px 28px",
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: signed ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  opacity: signed ? 1 : 0.45,
                }}
                onClick={() => setMode("list")}
              >
                Registrar caracterización
              </button>
              <button
                style={{
                  padding: "11px 20px",
                  fontSize: "0.9rem",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: "#fff",
                  color: "#374151",
                }}
                onClick={() => setMode("list")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
        title="Inclusión Universitaria"
        subtitle={`${iuCases.length} estudiantes caracterizados · ${iuCases.filter((c) => c.estado === "activo").length} en atención activa`}
        onClose={() => onNavigate("home")}
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setMode("desistimiento")}
              style={{
                background: "#f3f4f6",
                border: "none",
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.82rem",
                fontFamily: "inherit",
                color: "#374151",
              }}
            >
              Registrar desistimiento
            </button>
            <button
              onClick={() => setMode("nuevo")}
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
              + Nueva caracterización
            </button>
          </div>
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
        {/* Panel segmentado del módulo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {[
            {
              label: "Visual",
              count: tileCounts["Visual"] ?? 0,
              icon: "👁️",
              color: "#2563eb",
            },
            {
              label: "Auditiva",
              count: tileCounts["Auditiva"] ?? 0,
              icon: "👂",
              color: "#7c3aed",
            },
            {
              label: "Motriz",
              count: tileCounts["Motriz"] ?? 0,
              icon: "♿",
              color: "#059669",
            },
            {
              label: "Caracterización pendiente",
              count: iuCases.filter((c) => c.estado === "pendiente").length,
              icon: "📋",
              color: "#FF005A",
            },
          ].map((t) => (
            <div
              key={t.label}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "16px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: t.color + "15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                {t.icon}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "#2F2F30",
                    lineHeight: 1,
                  }}
                >
                  {t.count}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                  {t.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "14px 18px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1.5px solid #e5e7eb",
          }}
        >
          <span style={{ color: "#9ca3af" }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o código…"
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

        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {[
                  "Código",
                  "Estudiante",
                  "Condición",
                  "Apoyos requeridos",
                  "Profesional",
                  "Estado",
                  "Última actuación",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "11px 16px",
                      textAlign: "left",
                      fontSize: "0.72rem",
                      color: "#6b7280",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  onClick={() => onNavigate("expedientes", c.id)}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                    background: i % 2 === 0 ? "#fff" : "#fafafa",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f0fdf4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      i % 2 === 0 ? "#fff" : "#fafafa")
                  }
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "0.78rem",
                      color: "#007F2F",
                      fontWeight: 600,
                    }}
                  >
                    {c.codigo}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "#2F2F30",
                      }}
                    >
                      {c.nombre}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                      {c.programa}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#eff6ff",
                        color: "#2563eb",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {detectTipo(c.motivo)}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "0.78rem",
                      color: "#6b7280",
                      maxWidth: 200,
                    }}
                  >
                    {c.motivo}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "0.78rem",
                      color: "#6b7280",
                    }}
                  >
                    {c.profesional.split(" ").slice(0, 3).join(" ")}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: statusColor[c.estado] + "18",
                        color: statusColor[c.estado],
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 20,
                        textTransform: "capitalize",
                      }}
                    >
                      {c.estado}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "0.78rem",
                      color: "#6b7280",
                    }}
                  >
                    {c.ultimaActuacion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
