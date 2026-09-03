import { useState } from "react"
import {
  cases,
  tiposViolencia,
  rutasAtencionVBG,
  marcoNormativoVBG,
} from "../data/mockData"
import TopBar from "../components/TopBar"
import ConsentSignature from "../components/ConsentSignature"
import DesistimientoForm from "../components/DesistimientoForm"

interface VBGProps {
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

export default function VBG({ onNavigate, initialMode }: VBGProps) {
  const [mode, setMode] = useState<"list" | "nuevo" | "desistimiento">(
    initialMode === "nuevo" ? "nuevo" : "list",
  )
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [filterTipo, setFilterTipo] = useState<string>("todos")
  const [reportante, setReportante] = useState<"afectada" | "tercero">(
    "afectada",
  )
  const [grabacion, setGrabacion] = useState(false)
  const [relato, setRelato] = useState("")

  const vbgCases = cases.filter((c) => c.modulo === "vbg")
  const filtered = vbgCases.filter((c) => {
    const matchSearch =
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.codigo.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "todos" || c.estado === filterStatus
    const matchTipo = filterTipo === "todos" || c.tipoViolencia === filterTipo
    return matchSearch && matchStatus && matchTipo
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
          title="Registro de desistimiento"
          subtitle="La persona afectada decide no continuar con el proceso de atención"
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
            moduleColor="#FF005A"
            opciones={vbgCases.map((c) => ({
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
          title="Nuevo reporte · Violencias Basadas en Género"
          subtitle="Apertura de caso — información tratada con carácter confidencial"
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
              maxWidth: 780,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                background: "#fff0f5",
                border: "1.5px solid #ffd0e0",
                borderRadius: 12,
                padding: "14px 18px",
                fontSize: "0.8rem",
                color: "#9d0042",
                lineHeight: 1.6,
              }}
            >
              🔒 Toda la información de este módulo tiene carácter confidencial
              y solo será consultada por personal autorizado de la Vicerrectoría
              de Bienestar Universitario.
            </div>

            {/* Quién reporta */}
            <div
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
                    color: "#FF005A",
                    margin: 0,
                  }}
                >
                  Quién reporta la situación
                </h3>
              </div>
              <div
                style={{
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  {([
                    ["afectada", "La persona afectada"],
                    ["tercero", "Un tercero en su nombre"],
                  ] as const).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setReportante(id)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "center",
                        border: `2px solid ${
                          reportante === id ? "#FF005A" : "#e5e7eb"
                        }`,
                        background: reportante === id ? "#fff0f5" : "#fff",
                        color: reportante === id ? "#FF005A" : "#374151",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: 5,
                      }}
                    >
                      Nombre de la persona afectada (o "Reporte anónimo")
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre completo o 'Anónimo'"
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
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: 5,
                      }}
                    >
                      Programa académico
                    </label>
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
                      <option value="">Seleccionar…</option>
                      {[
                        "Ingeniería de Sistemas",
                        "Administración de Empresas",
                        "Enfermería",
                        "Derecho",
                        "Psicología",
                        "Contaduría Pública",
                        "Ingeniería Industrial",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del hecho */}
            <div
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
                    color: "#FF005A",
                    margin: 0,
                  }}
                >
                  Información del hecho reportado
                </h3>
              </div>
              <div
                style={{
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: 5,
                      }}
                    >
                      Tipo de violencia
                    </label>
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
                      <option value="">Seleccionar…</option>
                      {tiposViolencia.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: 5,
                      }}
                    >
                      Profesional asignado
                    </label>
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
                      {["Dra. Isabela Cárdenas", "Lic. Paula Escobar"].map(
                        (o) => (
                          <option key={o}>{o}</option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    Relato de los hechos
                  </label>
                  <textarea
                    rows={4}
                    value={relato}
                    onChange={(e) => setRelato(e.target.value)}
                    placeholder="Describa la situación reportada, incluyendo fecha, lugar y personas involucradas si se conocen…"
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
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <input
                    type="checkbox"
                    id="grabacion"
                    checked={grabacion}
                    onChange={(e) => setGrabacion(e.target.checked)}
                    style={{ accentColor: "#007F2F", marginTop: 2 }}
                  />
                  <label
                    htmlFor="grabacion"
                    style={{
                      fontSize: "0.8rem",
                      color: "#15803d",
                      lineHeight: 1.5,
                    }}
                  >
                    🤖 Habilitar grabación de la entrevista y transcripción
                    automática mediante IA (requiere consentimiento informado
                    explícito). El sistema analizará el relato para sugerir
                    clasificación de la situación, factores de riesgo/protección
                    y rutas de atención.
                  </label>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    Nivel de riesgo inicial
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["alto", "medio", "bajo"] as const).map((r) => (
                      <span
                        key={r}
                        style={{
                          padding: "7px 16px",
                          borderRadius: 20,
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          background: riskColor[r] + "18",
                          color: riskColor[r],
                          border: `1.5px solid ${riskColor[r]}40`,
                          textTransform: "capitalize",
                        }}
                      >
                        ● {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ConsentSignature
              moduleName="Violencias Basadas en Género"
              moduleColor="#FF005A"
              consentText="Declaro que se ha explicado a la persona reportante que la participación es completamente voluntaria, que puede abandonar el proceso en cualquier momento y que la información suministrada será tratada de manera confidencial conforme a la Ley 1257 de 2008, la Ley 1719 de 2014 y el protocolo institucional de atención a VBG de la UCEVA."
              correoInstitucional="reportante@uceva.edu.co"
            />

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="btn-cta"
                style={{
                  padding: "11px 28px",
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
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
        title="Violencias Basadas en Género y otras formas de violencia"
        subtitle={`${vbgCases.length} casos registrados · ${vbgCases.filter((c) => c.estado === "activo").length} activos · Información confidencial`}
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
              + Nuevo reporte
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
        <div
          style={{
            background: "#fff0f5",
            border: "1px solid #ffd0e0",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: "0.78rem",
            color: "#9d0042",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🔒 Acceso restringido a personal autorizado. Toda consulta queda
          registrada mediante mecanismos de auditoría.
        </div>

        {/* Summary tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {[
            {
              label: "Riesgo alto",
              count: vbgCases.filter((c) => c.riesgo === "alto").length,
              icon: "⚠️",
              color: "#FF005A",
            },
            {
              label: "En seguimiento",
              count: vbgCases.filter((c) => c.estado === "seguimiento").length,
              icon: "📈",
              color: "#FFB400",
            },
            {
              label: "Pendientes de asignar",
              count: vbgCases.filter((c) => c.estado === "pendiente").length,
              icon: "📋",
              color: "#2563eb",
            },
            {
              label: "Desistidos",
              count: vbgCases.filter((c) => c.desistido).length,
              icon: "↩️",
              color: "#9ca3af",
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
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1.5px solid #e5e7eb",
              fontSize: "0.78rem",
              fontFamily: "inherit",
              background: "#fff",
              color: "#374151",
            }}
          >
            <option value="todos">Todos los tipos</option>
            {tiposViolencia.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
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
                    background: filterStatus === s ? "#FF005A" : "#f3f4f6",
                    color: filterStatus === s ? "#fff" : "#6b7280",
                  }}
                >
                  {s === "todos" ? "Todos" : s}
                </button>
              ),
            )}
          </div>
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
                  "Persona",
                  "Tipo de violencia",
                  "Profesional",
                  "Estado",
                  "Riesgo",
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
                    (e.currentTarget.style.background = "#fff0f5")
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
                      color: "#FF005A",
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
                    {c.tipoViolencia && (
                      <span
                        style={{
                          background: "#fff0f5",
                          color: "#FF005A",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: 20,
                        }}
                      >
                        {c.tipoViolencia}
                      </span>
                    )}
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
                    {c.desistido && (
                      <span
                        style={{
                          marginLeft: 6,
                          background: "#f3f4f6",
                          color: "#6b7280",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: 20,
                        }}
                      >
                        Desistido
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        color: riskColor[c.riesgo],
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        textTransform: "capitalize",
                      }}
                    >
                      ● {c.riesgo}
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

        {/* Rutas de atención y marco normativo */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "18px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.88rem",
                color: "#2F2F30",
                margin: "0 0 12px",
              }}
            >
              🗺️ Rutas institucionales de atención
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rutasAtencionVBG.map((r) => (
                <div
                  key={r.id}
                  style={{ borderLeft: "3px solid #FF005A", paddingLeft: 10 }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#2F2F30",
                    }}
                  >
                    {r.nombre}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                    Se activa por: {r.activadaPor}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "18px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.88rem",
                color: "#2F2F30",
                margin: "0 0 12px",
              }}
            >
              ⚖️ Marco normativo aplicable
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {marcoNormativoVBG.map((n) => (
                <li
                  key={n}
                  style={{
                    fontSize: "0.78rem",
                    color: "#374151",
                    lineHeight: 1.5,
                  }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
