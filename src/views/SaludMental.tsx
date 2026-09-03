import { useState } from "react"
import { cases } from "../data/mockData"
import TopBar from "../components/TopBar"
import ConsentSignature from "../components/ConsentSignature"
import DesistimientoForm from "../components/DesistimientoForm"

interface SaludMentalProps {
  onNavigate: (view: string, extra?: string) => void
  initialMode?: string
}

const statusColor: Record<string, string> = {
  activo: "#007F2F",
  seguimiento: "#FFB400",
  cerrado: "#9ca3af",
  pendiente: "#FF005A",
}
const riskColor: Record<string, string> = {
  alto: "#FF005A",
  medio: "#FFB400",
  bajo: "#007F2F",
}

interface Field {
  label: string
  type: string
  placeholder?: string
  required?: boolean
  options?: string[]
  maxLength?: number
}

const formFields: { section: string; fields: Field[] }[] = [
  {
    section: "Datos del estudiante",
    fields: [
      {
        label: "Nombre completo",
        type: "text",
        placeholder: "Ej. Juan Esteban Morales Ríos",
        required: true,
      },
      {
        label: "Documento de identidad",
        type: "text",
        placeholder: "Número de cédula o TI",
        required: true,
      },
      {
        label: "Programa académico",
        type: "select",
        options: [
          "Ingeniería de Sistemas",
          "Administración de Empresas",
          "Enfermería",
          "Derecho",
          "Psicología",
          "Contaduría Pública",
          "Licenciatura en Matemáticas",
          "Ingeniería Industrial",
        ],
      },
      {
        label: "Semestre",
        type: "select",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
      {
        label: "Correo institucional",
        type: "email",
        placeholder: "usuario@uceva.edu.co",
      },
      {
        label: "Teléfono de contacto",
        type: "tel",
        placeholder: "+57 300 000 0000",
      },
    ],
  },
  {
    section: "Información del caso",
    fields: [
      {
        label: "Motivo de consulta",
        type: "textarea",
        placeholder: "Descripción del motivo de atención…",
        maxLength: 300,
      },
      {
        label: "Profesional asignado",
        type: "select",
        options: [
          "Dra. Carolina Restrepo",
          "Dr. Felipe Ángel",
          "Lic. Marcela Torres",
          "Dr. Andrés Castaño",
        ],
      },
      {
        label: "Nivel de riesgo inicial",
        type: "select",
        options: ["Bajo", "Medio", "Alto"],
      },
      { label: "Fecha de primera cita", type: "date", placeholder: "" },
    ],
  },
  {
    section: "Consentimiento informado",
    fields: [
      {
        label: "Medio de obtención",
        type: "select",
        options: [
          "Formulario digital (SIGABU)",
          "Documento físico digitalizado",
          "Firma electrónica certificada",
        ],
      },
      { label: "Fecha de consentimiento", type: "date", placeholder: "" },
    ],
  },
]

export default function SaludMental({
  onNavigate,
  initialMode,
}: SaludMentalProps) {
  const [mode, setMode] = useState<"list" | "nuevo" | "desistimiento">(
    initialMode === "nuevo" ? "nuevo" : "list",
  )
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [filterRisk, setFilterRisk] = useState<string>("todos")
  const [textareaValues, setTextareaValues] = useState<Record<string, string>>(
    {},
  )
  const [signed, setSigned] = useState(false)

  const smCases = cases.filter((c) => c.modulo === "salud_mental")
  const filtered = smCases.filter((c) => {
    const matchSearch =
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.codigo.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "todos" || c.estado === filterStatus
    const matchRisk = filterRisk === "todos" || c.riesgo === filterRisk
    return matchSearch && matchStatus && matchRisk
  })

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
          title="Registro de desistimiento · Salud Mental"
          subtitle="El estudiante decide no continuar con el proceso de atención psicológica"
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
            moduleColor="#007F2F"
            opciones={smCases.map((c) => ({
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
          title="Nuevo caso · Salud Mental"
          subtitle="Registro de nuevo caso de atención psicológica"
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
              gap: 24,
            }}
          >
            {formFields.map((sec) => (
              <div
                key={sec.section}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    background: "#f9fafb",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "#007F2F",
                      margin: 0,
                    }}
                  >
                    {sec.section}
                  </h3>
                </div>
                <div
                  style={{
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 16,
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
                        {f.label}{" "}
                        {"required" in f && f.required && (
                          <span style={{ color: "#FF005A" }}>*</span>
                        )}
                      </label>
                      {f.type === "select" ? (
                        <select
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1.5px solid #e5e7eb",
                            borderRadius: 8,
                            fontSize: "0.875rem",
                            color: "#2F2F30",
                            fontFamily: "inherit",
                            outline: "none",
                            background: "#fff",
                          }}
                        >
                          <option value="">Seleccionar…</option>
                          {f.options?.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : f.type === "textarea" ? (
                        <div>
                          <textarea
                            placeholder={f.placeholder}
                            rows={3}
                            maxLength={f.maxLength}
                            value={textareaValues[f.label] ?? ""}
                            onChange={(e) =>
                              setTextareaValues((prev) => ({
                                ...prev,
                                [f.label]: e.target.value,
                              }))
                            }
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              border: "1.5px solid #e5e7eb",
                              borderRadius: 8,
                              fontSize: "0.875rem",
                              color: "#2F2F30",
                              fontFamily: "inherit",
                              outline: "none",
                              resize: "vertical",
                              boxSizing: "border-box",
                            }}
                          />
                          {f.maxLength && (
                            <div
                              style={{
                                textAlign: "right",
                                fontSize: "0.7rem",
                                color: "#9ca3af",
                                marginTop: 4,
                              }}
                            >
                              {textareaValues[f.label]?.length ?? 0}/
                              {f.maxLength} caracteres
                            </div>
                          )}
                        </div>
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
                            color: "#2F2F30",
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
              moduleName="Salud Mental y Apoyo Psicosocial"
              moduleColor="#007F2F"
              consentText="Confirmo que el consentimiento informado ha sido debidamente explicado al estudiante, quien ha aceptado voluntariamente participar en el proceso de atención psicológica bajo los términos institucionales de confidencialidad, protección de datos y trazabilidad establecidos por la Vicerrectoría de Bienestar Universitario de la UCEVA, conforme a la Ley 1090 de 2006."
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
                Registrar caso
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
        title="Salud Mental y Apoyo Psicosocial"
        subtitle={`${smCases.length} casos registrados · ${smCases.filter((c) => c.estado === "activo").length} activos`}
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
              + Nuevo caso
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
              label: "Casos activos",
              count: smCases.filter((c) => c.estado === "activo").length,
              icon: "🧠",
              color: "#007F2F",
            },
            {
              label: "Riesgo alto",
              count: smCases.filter((c) => c.riesgo === "alto").length,
              icon: "⚠️",
              color: "#FF005A",
            },
            {
              label: "En seguimiento",
              count: smCases.filter((c) => c.estado === "seguimiento").length,
              icon: "📈",
              color: "#FFB400",
            },
            {
              label: "Sesiones promedio",
              count:
                Math.round(
                  (smCases.reduce((acc, c) => acc + c.sesiones, 0) /
                    (smCases.length || 1)) *
                    10,
                ) / 10,
              icon: "🗓️",
              color: "#2563eb",
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

        {/* Filters */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "16px 20px",
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
          <div style={{ display: "flex", gap: 6 }}>
            {["todos", "activo", "seguimiento", "pendiente", "cerrado"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    background: filterStatus === s ? "#007F2F" : "#f3f4f6",
                    color: filterStatus === s ? "#fff" : "#6b7280",
                  }}
                >
                  {s === "todos" ? "Todos" : s}
                </button>
              ),
            )}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["todos", "alto", "medio", "bajo"].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRisk(r)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  background:
                    filterRisk === r
                      ? r === "todos"
                        ? "#007F2F"
                        : riskColor[r]
                      : "#f3f4f6",
                  color: filterRisk === r ? "#fff" : "#6b7280",
                }}
              >
                {r === "todos" ? "Riesgo" : `● ${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 14,
          }}
        >
          {filtered.map((c) => (
            <div
              key={c.id}
              className="module-card"
              style={{ padding: "18px" }}
              onClick={() => onNavigate("expedientes", c.id)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#007F2F",
                      fontWeight: 700,
                    }}
                  >
                    {c.codigo}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "#2F2F30",
                      marginTop: 2,
                    }}
                  >
                    {c.nombre}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    {c.programa} · Semestre {c.semestre}
                  </div>
                </div>
                <span
                  style={{
                    background: riskColor[c.riesgo] + "18",
                    color: riskColor[c.riesgo],
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: 20,
                  }}
                >
                  ● {c.riesgo}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#6b7280",
                  lineHeight: 1.5,
                  margin: "0 0 12px",
                  borderLeft: "2px solid #e5e7eb",
                  paddingLeft: 8,
                }}
              >
                {c.motivo}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    background: statusColor[c.estado] + "18",
                    color: statusColor[c.estado],
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {c.estado}
                </span>
                <span
                  style={{
                    background: "#f3f4f6",
                    color: "#6b7280",
                    fontSize: "0.7rem",
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  🗓️ {c.sesiones} sesiones
                </span>
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
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                  {c.profesional.split(" ").slice(0, 3).join(" ")}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: c.proximaCita ? "#007F2F" : "#9ca3af",
                    fontWeight: c.proximaCita ? 600 : 400,
                  }}
                >
                  {c.proximaCita ? `📅 ${c.proximaCita}` : "Sin cita próxima"}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "48px", color: "#9ca3af" }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>🔍</div>
            <p style={{ fontWeight: 600, color: "#6b7280" }}>
              No se encontraron casos
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
