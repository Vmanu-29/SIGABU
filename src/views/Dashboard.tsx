import { cases, moduleMeta } from "../data/mockData"
import TopBar from "../components/TopBar"

interface DashboardProps {
  onNavigate: (view: string, extra?: string) => void
}

const kpis = [
  {
    label: "Casos activos",
    value: "34",
    sub: "+5 esta semana",
    icon: "📋",
    color: "#007F2F",
    bg: "#e6f4ec",
  },
  {
    label: "Riesgo alto",
    value: "12",
    sub: "2 nuevos hoy",
    icon: "⚠️",
    color: "#FF005A",
    bg: "#fff0f5",
  },
  {
    label: "Citas hoy",
    value: "0",
    sub: "Sin citas programadas",
    icon: "🗓️",
    color: "#FFB400",
    bg: "#fff9e6",
  },
  {
    label: "Casos cerrados (mes)",
    value: "21",
    sub: "↑ 12% vs mes anterior",
    icon: "✅",
    color: "#108900",
    bg: "#f0fdf4",
  },
]

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

export default function Dashboard({ onNavigate }: DashboardProps) {
  const recent = cases.filter((c) => c.estado !== "cerrado").slice(0, 6)
  const alertas = cases.filter((c) => c.riesgo === "alto")
  const agendaHoy: Array<{ hora: string; nombre: string; tipo: string }> = []

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
        title="Dashboard · SIGABU"
        subtitle="Resumen del sistema — 5 agosto 2026"
        onClose={() => onNavigate("home")}
        actions={
          <button
            onClick={() => onNavigate("salud_mental", "nuevo")}
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
            <span>+</span> Nuevo caso
          </button>
        }
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* KPIs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {kpis.map((k) => (
            <div
              key={k.label}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "20px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: k.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  {k.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: k.color,
                    fontWeight: 600,
                    background: k.bg,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  ↑
                </span>
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: "#2F2F30",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}
              >
                {k.value}
              </div>
              <div
                style={{ color: "#6b7280", fontSize: "0.82rem", marginTop: 4 }}
              >
                {k.label}
              </div>
              <div
                style={{
                  color: k.color,
                  fontSize: "0.72rem",
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {k.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}
        >
          {/* Recent cases */}
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
                padding: "18px 20px",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#2F2F30",
                    margin: 0,
                  }}
                >
                  Casos recientes
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.75rem", margin: 0 }}>
                  {recent.length} casos activos y en seguimiento
                </p>
              </div>
              <button
                onClick={() => onNavigate("expedientes")}
                style={{
                  color: "#007F2F",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Ver todos →
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {[
                    "Código",
                    "Estudiante",
                    "Módulo",
                    "Profesional",
                    "Estado",
                    "Riesgo",
                    "Próxima cita",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
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
                {recent.map((c, i) => (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      cursor: "pointer",
                      background: i % 2 === 0 ? "#fff" : "#fafafa",
                    }}
                    onClick={() => onNavigate("expedientes", c.id)}
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
                        padding: "11px 16px",
                        fontSize: "0.78rem",
                        color: "#007F2F",
                        fontWeight: 600,
                      }}
                    >
                      {c.codigo}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <div
                        style={{
                          fontSize: "0.83rem",
                          fontWeight: 600,
                          color: "#2F2F30",
                        }}
                      >
                        {c.nombre}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                        {c.programa} · S{c.semestre}
                      </div>
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <span
                        style={{
                          background: moduleMeta[c.modulo].bg,
                          color: moduleMeta[c.modulo].color,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 20,
                        }}
                      >
                        {moduleMeta[c.modulo].label}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "11px 16px",
                        fontSize: "0.78rem",
                        color: "#6b7280",
                      }}
                    >
                      {c.profesional.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
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
                    <td style={{ padding: "11px 16px" }}>
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
                        padding: "11px 16px",
                        fontSize: "0.78rem",
                        color: "#6b7280",
                      }}
                    >
                      {c.proximaCita ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts & Activity */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Alertas */}
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
                  padding: "14px 16px",
                  borderBottom: "1px solid #f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#FF005A",
                    display: "inline-block",
                  }}
                />
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "#2F2F30",
                    margin: 0,
                  }}
                >
                  Alertas de riesgo alto
                </h3>
              </div>
              {alertas.map((a) => (
                <div
                  key={a.id}
                  onClick={() => onNavigate("expedientes", a.id)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fff0f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#fff0f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}
                  >
                    ⚠️
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#2F2F30",
                      }}
                    >
                      {a.nombre}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                      {a.motivo.substring(0, 40)}…
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#FF005A",
                        fontWeight: 500,
                        marginTop: 2,
                      }}
                    >
                      {a.codigo}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actividad reciente */}
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                padding: "16px",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#2F2F30",
                  margin: "0 0 14px",
                }}
              >
                Actividad reciente
              </h3>
              {[
                {
                  text: "Informe generado — SM-2026-002",
                  time: "Hace 45 min",
                  icon: "📄",
                },
                {
                  text: "Consentimiento firmado — IU-2026-003",
                  time: "Hace 1 h",
                  icon: "✍️",
                },
                {
                  text: "Alerta temprana detectada — Daniela Herrera",
                  time: "Hace 2 h",
                  icon: "🤖",
                },
              ].map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      flexShrink: 0,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#2F2F30",
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {a.text}
                    </div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "#9ca3af",
                        marginTop: 2,
                      }}
                    >
                      {a.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hoy en citas */}
            <div
              style={{
                background: "linear-gradient(135deg, #007F2F, #004d1c)",
                borderRadius: 12,
                padding: "18px",
              }}
            >
              <div
                style={{
                  color: "#8AFF00",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                📅 Agenda de hoy
              </div>
              {agendaHoy.length === 0 && (
                <div
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "0.78rem",
                    lineHeight: 1.5,
                  }}
                >
                  No hay citas programadas para hoy.
                </div>
              )}
              {agendaHoy.map((a) => (
                <div
                  key={a.hora}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      color: "#8AFF00",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      width: 36,
                      flexShrink: 0,
                    }}
                  >
                    {a.hora}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 6,
                      padding: "6px 10px",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      {a.nombre}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.68rem",
                      }}
                    >
                      {a.tipo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
