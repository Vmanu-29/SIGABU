interface StudentMisCitasProps {
  onNavigate: (view: string) => void
}

const citas: Array<{
  id: string
  servicio: string
  icon: string
  fecha: string
  hora: string
  modalidad: string
  profesional: string
  estado: string
  ubicacion: string
  nota: string | null
}> = []

const estadoConfig: Record<string, { label: string; color: string; bg: string }> =
  {
    confirmada: { label: "Confirmada", color: "#007F2F", bg: "#e6f4ec" },
    pendiente: { label: "Pendiente", color: "#FFB400", bg: "#fff9e6" },
    completada: { label: "Completada", color: "#6b7280", bg: "#f5f5f5" },
    cancelada: { label: "Cancelada", color: "#FF005A", bg: "#fff0f5" },
  }

export default function StudentMisCitas({ onNavigate }: StudentMisCitasProps) {
  const proxima = citas.find((c) => c.estado === "confirmada")
  const pendientes = citas.filter((c) => c.estado === "pendiente")
  const historial = citas.filter(
    (c) => c.estado === "completada" || c.estado === "cancelada",
  )

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#F7F9F8",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#2F2F30",
            }}
          >
            Mis citas
          </h1>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
            Historial y estado de tus solicitudes de atención
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => onNavigate("student_cita")}
            className="btn-cta"
            style={{
              padding: "9px 18px",
              fontSize: "0.82rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            + Nueva solicitud
          </button>
          <button
            onClick={() => onNavigate("student_home")}
            title="Cerrar sección"
            aria-label="Cerrar sección"
            style={{
              background: "#fff0f5",
              color: "#FF005A",
              border: "none",
              borderRadius: 8,
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              fontWeight: 700,
              fontFamily: "inherit",
            }}
          >
            ×
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 28px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Próxima cita destacada */}
        {proxima && (
          <div>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#2F2F30",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Próxima cita
            </h2>
            <div
              style={{
                background: "linear-gradient(135deg, #007F2F, #004d1c)",
                borderRadius: 16,
                padding: "24px",
                color: "#fff",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "rgba(138,255,0,0.15)",
                  border: "1.5px solid rgba(138,255,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  flexShrink: 0,
                }}
              >
                {proxima.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    marginBottom: 6,
                  }}
                >
                  {proxima.servicio}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span>
                    📅{" "}
                    {new Date(proxima.fecha + "T12:00:00").toLocaleDateString(
                      "es-CO",
                      { weekday: "long", day: "numeric", month: "long" },
                    )}
                  </span>
                  <span>🕐 {proxima.hora}</span>
                  <span>
                    {proxima.modalidad === "presencial" ? "🏢" : "💻"}{" "}
                    {proxima.modalidad === "presencial"
                      ? "Presencial"
                      : "Virtual"}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  👩‍⚕️ {proxima.profesional} · {proxima.ubicacion}
                </div>
                {proxima.nota && (
                  <div
                    style={{
                      marginTop: 10,
                      background: "rgba(138,255,0,0.1)",
                      border: "1px solid rgba(138,255,0,0.2)",
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontSize: "0.78rem",
                      color: "#8AFF00",
                    }}
                  >
                    💡 {proxima.nota}
                  </div>
                )}
              </div>
              <div
                style={{
                  background: estadoConfig.confirmada.bg,
                  color: estadoConfig.confirmada.color,
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✓ {estadoConfig.confirmada.label}
              </div>
            </div>
          </div>
        )}

        {/* Solicitudes pendientes */}
        {pendientes.length > 0 && (
          <div>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#2F2F30",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Solicitudes en revisión
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pendientes.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #FFB40033",
                    borderRadius: 14,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "#fff9e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: "#2F2F30",
                      }}
                    >
                      {c.servicio}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: 2,
                      }}
                    >
                      📅{" "}
                      {new Date(c.fecha + "T12:00:00").toLocaleDateString(
                        "es-CO",
                        { day: "numeric", month: "long" },
                      )}{" "}
                      · {c.hora} · {c.modalidad}
                    </div>
                    {c.nota && (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#92400e",
                          marginTop: 4,
                        }}
                      >
                        ℹ️ {c.nota}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      background: "#fff9e6",
                      color: "#FFB400",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    🕐 Pendiente
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historial */}
        {citas.length > 0 && (
          <div>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#2F2F30",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Historial de atenciones
            </h2>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              {historial.length === 0 ? (
                <div
                  style={{
                    padding: "32px",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "0.85rem",
                  }}
                >
                  No tienes atenciones anteriores.
                </div>
              ) : (
                historial.map((c, i) => {
                  const cfg = estadoConfig[c.estado]
                  return (
                    <div
                      key={c.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 18px",
                        borderBottom:
                          i < historial.length - 1
                            ? "1px solid #f0f0f0"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 9,
                          background: "#f5f5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.1rem",
                          flexShrink: 0,
                        }}
                      >
                        {c.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            color: "#374151",
                          }}
                        >
                          {c.servicio}
                        </div>
                        <div
                          style={{
                            fontSize: "0.73rem",
                            color: "#9ca3af",
                            marginTop: 2,
                          }}
                        >
                          {new Date(c.fecha + "T12:00:00").toLocaleDateString(
                            "es-CO",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}{" "}
                          · {c.hora} · {c.profesional}
                        </div>
                      </div>
                      <span
                        style={{
                          background: cfg.bg,
                          color: cfg.color,
                          borderRadius: 20,
                          padding: "3px 10px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Si no hay nada */}
        {citas.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗓️</div>
            <div
              style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 6 }}
            >
              Aún no tienes citas
            </div>
            <div style={{ fontSize: "0.82rem", marginBottom: 20 }}>
              Solicita tu primera sesión de acompañamiento
            </div>
            <button
              onClick={() => onNavigate("student_cita")}
              className="btn-cta"
              style={{
                padding: "10px 24px",
                fontSize: "0.85rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Solicitar cita
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
