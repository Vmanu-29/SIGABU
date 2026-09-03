import { useState } from "react"
import { sistemaUsuarios, rolLabel, rolColor } from "../data/mockData"
import TopBar from "../components/TopBar"

interface AdminProps {
  onNavigate: (view: string) => void
  initialTab?: string
}

const validTabs = ["usuarios", "catalogos", "flujos", "auditoria"] as const
type AdminTab = typeof validTabs[number]

export default function Admin({ onNavigate, initialTab }: AdminProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>(
    validTabs.includes(initialTab as AdminTab)
      ? initialTab as AdminTab
      : "usuarios",
  )

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
        title="Administración · SIGABU"
        subtitle="Gestión y configuración del Sistema de Bienestar Universitario"
        onClose={() => onNavigate("home")}
      />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#0f4d1a",
              }}
            >
              Panel de Administración
            </h2>
            <p
              style={{
                margin: "6px 0 0",
                color: "#6b7280",
                fontSize: "0.92rem",
              }}
            >
              Gestión y configuración de SIGABU
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            background: "#fff",
            borderRadius: 10,
            padding: 4,
            width: "fit-content",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          {([
            ["usuarios", "👥 Usuarios y Roles"],
            ["catalogos", "🗂️ Catálogos"],
            ["flujos", "⚙️ Flujos de trabajo"],
            ["auditoria", "🔍 Auditoría"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: "8px 18px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "all 0.15s",
                background: activeTab === id ? "#007F2F" : "transparent",
                color: activeTab === id ? "#fff" : "#6b7280",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "usuarios" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn-cta"
                style={{
                  padding: "9px 18px",
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                + Agregar usuario
              </button>
            </div>
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
                      "Usuario",
                      "Cargo",
                      "Área",
                      "Tareas activas",
                      "Rol",
                      "Estado",
                      "Acciones",
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
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sistemaUsuarios.map((u, i) => (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        background: i % 2 === 0 ? "#fff" : "#fafafa",
                      }}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #8AFF00, #108900)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              color: "#003a10",
                            }}
                          >
                            {u.avatar}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                color: "#2F2F30",
                              }}
                            >
                              {u.nombre}
                            </div>
                            <div
                              style={{ fontSize: "0.7rem", color: "#9ca3af" }}
                            >
                              {u.correo}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.82rem",
                          color: "#6b7280",
                        }}
                      >
                        {u.cargo}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: "#e6f4ec",
                            color: "#007F2F",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          {u.area}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#2F2F30",
                        }}
                      >
                        {u.tareas}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: rolColor[u.rol] + "18",
                            color: rolColor[u.rol],
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          {rolLabel[u.rol]}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: "#f0fdf4",
                            color: "#15803d",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          Activo
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            style={{
                              background: "#f3f4f6",
                              border: "none",
                              padding: "5px 10px",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: "0.72rem",
                              fontFamily: "inherit",
                              color: "#374151",
                            }}
                          >
                            Editar
                          </button>
                          <button
                            style={{
                              background: "#fff0f5",
                              border: "none",
                              padding: "5px 10px",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: "0.72rem",
                              fontFamily: "inherit",
                              color: "#FF005A",
                            }}
                          >
                            Suspender
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Roles del sistema */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {[
                {
                  rol: "Profesional de Bienestar",
                  permisos: [
                    "Gestión de casos en Salud Mental, Inclusión y VBG",
                    "Uso de la capa de IA (transcripción, análisis de riesgo)",
                    "Programación de citas y tareas terapéuticas",
                    "Registro de actuaciones y desistimientos",
                    "Acceso al repositorio institucional",
                  ],
                  color: "#007F2F",
                },
                {
                  rol: "Personal de Almacén",
                  permisos: [
                    "Registro de donantes y entradas de insumos",
                    "Control de inventario y alertas de stock/vencimiento",
                    "Generación de órdenes de entrega",
                    "Validación de entregas por QR o carné estudiantil",
                  ],
                  color: "#C2410C",
                },
                {
                  rol: "Administrador del Sistema",
                  permisos: [
                    "Gestión de usuarios, roles y permisos (Habeas Data)",
                    "Parametrización de formularios, catálogos y flujos",
                    "Analítica institucional y reportes para entes de control",
                    "Auditoría de accesos y trazabilidad del sistema",
                  ],
                  color: "#FF005A",
                },
              ].map((r) => (
                <div
                  key={r.rol}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: "16px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: r.color,
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: r.color,
                      }}
                    />
                    Rol: {r.rol}
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 14,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    {r.permisos.map((p) => (
                      <li
                        key={p}
                        style={{ fontSize: "0.78rem", color: "#6b7280" }}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "catalogos" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {[
              {
                titulo: "Tipos de discapacidad",
                items: [
                  "Visual",
                  "Auditiva",
                  "Motriz",
                  "Cognitiva",
                  "Psicosocial",
                  "Múltiple",
                ],
                icon: "♿",
              },
              {
                titulo: "Motivos de consulta",
                items: [
                  "Ansiedad",
                  "Depresión",
                  "Crisis académica",
                  "Adaptación universitaria",
                  "Duelo",
                  "Estrés crónico",
                ],
                icon: "🧠",
              },
              {
                titulo: "Tipos de actuación",
                items: [
                  "Primera consulta",
                  "Sesión individual",
                  "Llamada de seguimiento",
                  "Informe",
                  "Interconsulta",
                  "Cierre de caso",
                ],
                icon: "📋",
              },
              {
                titulo: "Apoyos razonables",
                items: [
                  "Tiempo adicional",
                  "Material accesible",
                  "Intérprete LSC",
                  "Adaptación de espacio",
                  "Tutor de apoyo",
                ],
                icon: "🤝",
              },
              {
                titulo: "Tipos de violencia (VBG)",
                items: [
                  "Física",
                  "Psicológica",
                  "Sexual",
                  "Económica",
                  "Patrimonial",
                  "Digital",
                  "Acoso laboral",
                  "Acoso sexual",
                ],
                icon: "🛡️",
              },
              {
                titulo: "Rutas institucionales VBG",
                items: [
                  "Crisis y primeros auxilios psicológicos",
                  "Acompañamiento psicosocial y jurídico",
                  "Proceso disciplinario institucional",
                  "Remisión a entidades externas",
                ],
                icon: "🗺️",
              },
              {
                titulo: "Categorías de mercados (Donaciones)",
                items: ["Mercado Tipo A", "Mercado Tipo B", "Elemento suelto"],
                icon: "🧺",
              },
              {
                titulo: "Criterios de priorización (Donaciones)",
                items: [
                  "Estrato",
                  "Ingresos familiares",
                  "Situación de emergencia",
                  "Cabeza de familia",
                ],
                icon: "📊",
              },
            ].map((cat) => (
              <div
                key={cat.titulo}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "18px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: "#2F2F30",
                      margin: 0,
                    }}
                  >
                    {cat.icon} {cat.titulo}
                  </h4>
                  <button
                    style={{
                      background: "#e6f4ec",
                      color: "#007F2F",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: 6,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    + Agregar
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        background: "#f3f4f6",
                        color: "#374151",
                        fontSize: "0.75rem",
                        padding: "4px 10px",
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {item}{" "}
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#9ca3af",
                          fontSize: "0.7rem",
                          padding: 0,
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "flujos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                nombre: "Flujo de apertura de caso",
                activo: true,
                pasos: [
                  "Recepción de solicitud",
                  "Validación de datos",
                  "Asignación de profesional",
                  "Consentimiento informado",
                  "Primera sesión",
                ],
              },
              {
                nombre: "Flujo de alerta de riesgo alto",
                activo: true,
                pasos: [
                  "Detección por IA o profesional",
                  "Notificación al coordinador",
                  "Activación de protocolo",
                  "Seguimiento diario",
                  "Informe a directivos",
                ],
              },
              {
                nombre: "Flujo de cierre de caso",
                activo: true,
                pasos: [
                  "Evaluación de alta",
                  "Informe final",
                  "Encuesta de satisfacción",
                  "Archivo del expediente",
                  "Estadísticas institucionales",
                ],
              },
              {
                nombre: "Flujo de atención en violencias basadas en género",
                activo: true,
                pasos: [
                  "Recepción del reporte",
                  "Consentimiento informado",
                  "Entrevista y clasificación (IA)",
                  "Activación de ruta institucional",
                  "Seguimiento y cierre",
                ],
              },
              {
                nombre: "Flujo de donaciones — Ucevistas de Corazón",
                activo: true,
                pasos: [
                  "Registro de donante",
                  "Ingreso a inventario",
                  "Caracterización de solicitud",
                  "Priorización y asignación",
                  "Despacho con validación QR/carné",
                ],
              },
            ].map((flujo) => (
              <div
                key={flujo.nombre}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "18px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#2F2F30",
                      }}
                    >
                      {flujo.nombre}
                    </span>
                    <span
                      style={{
                        background: "#f0fdf4",
                        color: "#15803d",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {flujo.activo ? "● Activo" : "○ Inactivo"}
                    </span>
                  </div>
                  <button
                    style={{
                      background: "#f3f4f6",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 7,
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Editar flujo
                  </button>
                </div>
                <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
                  {flujo.pasos.map((paso, i) => (
                    <div
                      key={paso}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          background: i === 0 ? "#007F2F" : "#e6f4ec",
                          color: i === 0 ? "#fff" : "#007F2F",
                          borderRadius: 8,
                          padding: "7px 12px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {paso}
                      </div>
                      {i < flujo.pasos.length - 1 && (
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "0.9rem",
                            padding: "0 4px",
                          }}
                        >
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "auditoria" && (
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
                padding: "16px 20px",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  color: "#2F2F30",
                  margin: 0,
                }}
              >
                Registro de auditoría del sistema
              </h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {[
                    "Fecha/Hora",
                    "Usuario",
                    "Acción",
                    "Módulo",
                    "Descripción",
                    "IP",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    dt: "2026-08-05 08:32",
                    user: "Dra. Carolina Restrepo",
                    accion: "CREAR",
                    modulo: "Salud Mental",
                    desc: "Nueva actuación registrada en caso SM-2026-004",
                    ip: "192.168.1.24",
                  },
                  {
                    dt: "2026-08-05 08:15",
                    user: "Dr. Felipe Ángel",
                    accion: "ACCEDER",
                    modulo: "Expedientes",
                    desc: "Consulta del expediente SM-2026-002",
                    ip: "192.168.1.31",
                  },
                  {
                    dt: "2026-08-05 07:58",
                    user: "Lic. Marcela Torres",
                    accion: "MODIFICAR",
                    modulo: "Inclusión",
                    desc: "Actualización de apoyos en caso IU-2026-003",
                    ip: "192.168.1.18",
                  },
                  {
                    dt: "2026-08-04 17:30",
                    user: "Admin Sistema",
                    accion: "EXPORTAR",
                    modulo: "Analítica",
                    desc: "Reporte mensual julio 2026 exportado en PDF",
                    ip: "192.168.1.2",
                  },
                ].map((log, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontFamily: "monospace",
                      }}
                    >
                      {log.dt}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: "0.78rem",
                        color: "#2F2F30",
                        fontWeight: 500,
                      }}
                    >
                      {log.user}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <span
                        style={{
                          background:
                            log.accion === "CREAR"
                              ? "#f0fdf4"
                              : log.accion === "MODIFICAR"
                                ? "#fffbeb"
                                : log.accion === "EXPORTAR"
                                  ? "#eff6ff"
                                  : "#f9fafb",
                          color:
                            log.accion === "CREAR"
                              ? "#15803d"
                              : log.accion === "MODIFICAR"
                                ? "#92400e"
                                : log.accion === "EXPORTAR"
                                  ? "#2563eb"
                                  : "#374151",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 20,
                          fontFamily: "monospace",
                        }}
                      >
                        {log.accion}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: "0.75rem",
                        color: "#6b7280",
                      }}
                    >
                      {log.modulo}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: "0.78rem",
                        color: "#374151",
                      }}
                    >
                      {log.desc}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: "0.72rem",
                        color: "#9ca3af",
                        fontFamily: "monospace",
                      }}
                    >
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
