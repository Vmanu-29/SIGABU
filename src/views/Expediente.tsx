import { useState } from "react"
import {
  cases,
  moduleMeta,
  rutasAtencionVBG,
  marcoNormativoVBG,
} from "../data/mockData"
import TopBar from "../components/TopBar"

interface ExpedienteProps {
  caseId?: string
  onNavigate: (view: string, extra?: string) => void
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

const actuaciones = [
  {
    fecha: "2026-08-04",
    tipo: "Sesión psicológica",
    profesional: "Dra. Carolina Restrepo",
    resumen:
      "Sesión de seguimiento. El estudiante reporta disminución de síntomas ansiosos. Se refuerzan estrategias de regulación emocional.",
    ia: "Clasificación: Progreso positivo. Factores protectores identificados: red de apoyo familiar activa. Sin señales de riesgo inmediato.",
  },
  {
    fecha: "2026-07-28",
    tipo: "Llamada de seguimiento",
    profesional: "Dra. Carolina Restrepo",
    resumen:
      "Seguimiento telefónico entre sesiones. El estudiante manifiesta dificultades con carga académica del semestre.",
    ia: "Alerta: Mención de sobrecarga académica. Recomendación: Articular con Registro Académico para revisión de créditos.",
  },
  {
    fecha: "2026-07-14",
    tipo: "Primera consulta",
    profesional: "Dra. Carolina Restrepo",
    resumen:
      "Primera atención. Apertura del caso. Se aplica entrevista psicológica inicial y escala de ansiedad GAD-7. Puntuación: 16/21 (ansiedad severa).",
    ia: "Clasificación: Riesgo alto. Factores de riesgo: aislamiento social, bajo rendimiento académico. Protocolo sugerido: Atención prioritaria.",
  },
]

const citasExpediente: Array<{
  fecha: string
  hora: string
  tipo: string
  estado: string
  obs: string
}> = []

const iaInsightsByModule = {
  salud_mental: [
    {
      title: "🔴 Factores de riesgo identificados",
      items: [
        "Ansiedad severa (GAD-7: 16/21)",
        "Bajo rendimiento académico",
        "Aislamiento social reportado",
        "Presión familiar por desempeño",
      ],
      color: "#FF005A",
      bg: "#fff0f5",
    },
    {
      title: "🟢 Factores protectores",
      items: [
        "Red de apoyo familiar activa",
        "Motivación académica presente",
        "Adherencia al tratamiento",
        "Habilidades de comunicación",
      ],
      color: "#007F2F",
      bg: "#f0fdf4",
    },
    {
      title: "📋 Protocolo sugerido por IA",
      items: [
        "Continuar atención individual semanal",
        "Articular con Registro Académico (carga académica)",
        "Aplicar escala GAD-7 en próxima sesión",
        "Explorar grupos de apoyo entre pares",
      ],
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      title: "📊 Análisis de progreso",
      items: [
        "Tendencia: Mejora moderada (3 sesiones)",
        "Adherencia: 100% (sin ausencias)",
        "Síntomas: Reducción del 20%",
        "Próxima evaluación: 2026-08-20",
      ],
      color: "#FFB400",
      bg: "#fffbeb",
    },
  ],
  inclusion: [
    {
      title: "🔴 Barreras identificadas",
      items: [
        "Acceso limitado a material en formato accesible",
        "Infraestructura no adaptada en algunos espacios",
        "Tiempos de evaluación no ajustados",
      ],
      color: "#FF005A",
      bg: "#fff0f5",
    },
    {
      title: "🟢 Apoyos activos",
      items: [
        "Adaptación curricular aprobada",
        "Acompañamiento de tutor de apoyo",
        "Articulación con docentes del programa",
      ],
      color: "#007F2F",
      bg: "#f0fdf4",
    },
    {
      title: "📋 Ruta sugerida por IA",
      items: [
        "Confirmar apoyos con Registro Académico",
        "Programar seguimiento semestral",
        "Actualizar certificado de discapacidad si aplica",
      ],
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      title: "📊 Análisis de progreso",
      items: [
        "Adaptaciones implementadas: 3 de 4",
        "Satisfacción reportada: Alta",
        "Próxima revisión: fin de semestre",
      ],
      color: "#FFB400",
      bg: "#fffbeb",
    },
  ],
  vbg: [
    {
      title: "🔴 Factores de riesgo identificados",
      items: [
        "Relación de poder o dependencia con el presunto agresor",
        "Reincidencia de los hechos reportados",
        "Ausencia de red de apoyo cercana",
      ],
      color: "#FF005A",
      bg: "#fff0f5",
    },
    {
      title: "🟢 Factores protectores",
      items: [
        "Consentimiento informado firmado",
        "Disposición a continuar el proceso",
        "Red de apoyo institucional activada",
      ],
      color: "#007F2F",
      bg: "#f0fdf4",
    },
    {
      title: "🗺️ Ruta institucional sugerida por IA",
      items: rutasAtencionVBG.slice(0, 3).map((r) => r.nombre),
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      title: "⚖️ Normatividad aplicable",
      items: marcoNormativoVBG.slice(0, 3),
      color: "#FFB400",
      bg: "#fffbeb",
    },
  ],
} as const

const seguimientoPlazos = [
  { plazo: "1 mes", fecha: "2026-09-04" },
  { plazo: "3 meses", fecha: "2026-11-04" },
  { plazo: "6 meses", fecha: "2027-02-04" },
]

export default function Expediente({ caseId, onNavigate }: ExpedienteProps) {
  const [activeTab, setActiveTab] =
    useState<"expediente" | "actuaciones" | "ia" | "citas">("expediente")
  const [showAddNote, setShowAddNote] = useState(false)
  const [recordatoriosActivos, setRecordatoriosActivos] = useState(true)

  const caso = cases.find((c) => c.id === caseId) ?? cases[0]

  if (!caseId) {
    // List mode
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
          title="Expedientes digitales"
          subtitle={`${cases.length} expedientes en el sistema`}
          onClose={() => onNavigate("home")}
        />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {cases.map((c) => (
            <div
              key={c.id}
              onClick={() => onNavigate("expedientes", c.id)}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                cursor: "pointer",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(0,127,47,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)")
              }
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: moduleMeta[c.modulo].bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                {moduleMeta[c.modulo].icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: "#2F2F30",
                    }}
                  >
                    {c.nombre}
                  </span>
                  <span
                    style={{
                      background: statusColor[c.estado] + "18",
                      color: statusColor[c.estado],
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      padding: "1px 7px",
                      borderRadius: 20,
                      textTransform: "capitalize",
                    }}
                  >
                    {c.estado}
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  {c.codigo} · {c.programa} · S{c.semestre}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginTop: 3,
                  }}
                >
                  {c.motivo}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    color: riskColor[c.riesgo],
                    fontWeight: 700,
                    fontSize: "0.78rem",
                  }}
                >
                  ● {c.riesgo}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#9ca3af",
                    marginTop: 2,
                  }}
                >
                  {c.ultimaActuacion}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                  {c.sesiones} sesiones
                </div>
              </div>
            </div>
          ))}
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
        title={`Expediente · ${caso.nombre}`}
        subtitle={`${caso.codigo} · ${caso.programa}`}
        onClose={() => onNavigate("expedientes")}
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onNavigate("expedientes")}
              style={{
                background: "#f3f4f6",
                border: "none",
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.82rem",
                fontFamily: "inherit",
              }}
            >
              ← Volver
            </button>
            <button
              className="btn-cta"
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onClick={() => {
                setActiveTab("actuaciones")
                setShowAddNote(true)
              }}
            >
              + Actuación
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
          gap: 18,
        }}
      >
        {/* Header card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "20px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: moduleMeta[caso.modulo].bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
            }}
          >
            {moduleMeta[caso.modulo].icon}
          </div>
          <div>
            <div
              style={{ fontWeight: 800, fontSize: "1.1rem", color: "#2F2F30" }}
            >
              {caso.nombre}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: 2 }}>
              {caso.programa} · Semestre {caso.semestre} · CC {caso.documento}
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: statusColor[caso.estado] + "18",
                  color: statusColor[caso.estado],
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 20,
                  textTransform: "capitalize",
                }}
              >
                {caso.estado}
              </span>
              <span
                style={{
                  background: riskColor[caso.riesgo] + "18",
                  color: riskColor[caso.riesgo],
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                Riesgo {caso.riesgo}
              </span>
              <span
                style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  fontSize: "0.72rem",
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                📋 {caso.sesiones} sesiones
              </span>
              <span
                style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  fontSize: "0.72rem",
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                📅 Apertura: {caso.fechaApertura}
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: 4 }}
            >
              Profesional asignado
            </div>
            <div
              style={{ fontWeight: 600, fontSize: "0.85rem", color: "#2F2F30" }}
            >
              {caso.profesional}
            </div>
            {caso.proximaCita && (
              <div
                style={{
                  marginTop: 8,
                  background: "#e6f4ec",
                  color: "#007F2F",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: 20,
                }}
              >
                📅 Próxima: {caso.proximaCita}
              </div>
            )}
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
            ["expediente", "📋 Datos"],
            ["actuaciones", "📝 Actuaciones"],
            ["ia", "🤖 Analítica IA"],
            ["citas", "🗓️ Citas"],
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

        {activeTab === "expediente" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {[
              {
                title:
                  caso.modulo === "vbg"
                    ? "Relato de los hechos"
                    : "Motivo de consulta",
                content: caso.motivo,
              },
              {
                title: "Datos de contacto",
                content:
                  "Correo: estudiante@uceva.edu.co\nTeléfono: +57 310 123 4567\nEmergencia: Juan Morales (padre) — +57 315 987 6543",
              },
              {
                title: "Consentimiento informado",
                content:
                  (caso.modulo === "vbg" && caso.desistido
                    ? "Estado: ↩️ Desistido por la persona\n"
                    : "Estado: ✅ Firmado\n") +
                  "Medio: Formulario digital SIGABU\nFecha: " +
                  caso.fechaApertura,
              },
              caso.modulo === "vbg"
                ? {
                    title: "Clasificación y ruta institucional",
                    content: `Tipo de violencia: ${caso.tipoViolencia ?? "Por clasificar"}\nNivel de riesgo: ${caso.riesgo}\nRuta activada: ${rutasAtencionVBG[0].nombre}`,
                  }
                : {
                    title: "Protocolo de atención",
                    content:
                      "Modalidad: Atención individual presencial\nFrecuencia: Semanal\nObjetivo terapéutico: Reducción de síntomas ansiosos y fortalecimiento de estrategias de afrontamiento.",
                  },
            ].map((item) => (
              <div
                key={item.title}
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
                    fontSize: "0.82rem",
                    color: "#007F2F",
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                <pre
                  style={{
                    margin: 0,
                    fontFamily: "inherit",
                    fontSize: "0.82rem",
                    color: "#374151",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.content}
                </pre>
              </div>
            ))}
          </div>
        )}

        {activeTab === "actuaciones" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {showAddNote && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "20px",
                  boxShadow: "0 2px 10px rgba(0,127,47,0.12)",
                  border: "1.5px solid #007F2F",
                }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    color: "#007F2F",
                    margin: "0 0 14px",
                    fontSize: "0.92rem",
                  }}
                >
                  + Nueva actuación
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Tipo de actuación
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        border: "1.5px solid #e5e7eb",
                        borderRadius: 8,
                        fontFamily: "inherit",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    >
                      {[
                        "Sesión psicológica",
                        "Llamada de seguimiento",
                        "Informe",
                        "Evaluación",
                        "Interconsulta",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Fecha
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-08-05"
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        border: "1.5px solid #e5e7eb",
                        borderRadius: 8,
                        fontFamily: "inherit",
                        fontSize: "0.85rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Descripción de la actuación
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Registre el contenido de la sesión, intervenciones realizadas y observaciones…"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 8,
                      fontFamily: "inherit",
                      fontSize: "0.85rem",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <input
                    type="checkbox"
                    id="grabar"
                    style={{ accentColor: "#007F2F" }}
                  />
                  <label
                    htmlFor="grabar"
                    style={{ fontSize: "0.78rem", color: "#374151" }}
                  >
                    Habilitar grabación de sesión (requiere consentimiento
                    previo)
                  </label>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn-cta"
                    style={{
                      padding: "9px 20px",
                      fontSize: "0.85rem",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                    onClick={() => setShowAddNote(false)}
                  >
                    Guardar actuación
                  </button>
                  <button
                    style={{
                      padding: "9px 16px",
                      fontSize: "0.85rem",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      background: "#fff",
                      color: "#374151",
                    }}
                    onClick={() => setShowAddNote(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            {actuaciones.map((a, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "18px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  borderLeft: "3px solid #007F2F",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <span
                      style={{
                        background: "#e6f4ec",
                        color: "#007F2F",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {a.tipo}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      {a.fecha}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {a.profesional}
                  </span>
                </div>
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "0.83rem",
                    color: "#374151",
                    lineHeight: 1.6,
                  }}
                >
                  {a.resumen}
                </p>
                <div
                  style={{
                    background: "#f0fdf4",
                    borderRadius: 8,
                    padding: "10px 12px",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#007F2F",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    🤖 ANÁLISIS IA
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.78rem",
                      color: "#15803d",
                      lineHeight: 1.55,
                    }}
                  >
                    {a.ia}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "ia" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {iaInsightsByModule[caso.modulo].map((section) => (
              <div
                key={section.title}
                style={{
                  background: section.bg,
                  borderRadius: 12,
                  padding: "18px",
                  border: `1px solid ${section.color}25`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: section.color,
                    marginBottom: 12,
                  }}
                >
                  {section.title}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {section.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "0.82rem",
                        color: "#374151",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "citas" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Seguimientos automáticos */}
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "#2F2F30",
                      margin: 0,
                    }}
                  >
                    🤖 Seguimientos automáticos
                  </h3>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                    }}
                  >
                    Recordatorios y correos disparados por el sistema en los
                    cortes de seguimiento del caso.
                  </p>
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={recordatoriosActivos}
                    onChange={(e) => setRecordatoriosActivos(e.target.checked)}
                    style={{ accentColor: "#007F2F" }}
                  />
                  Recordatorios activos
                </label>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                {seguimientoPlazos.map((s) => (
                  <div
                    key={s.plazo}
                    style={{
                      flex: "1 1 160px",
                      border: `1.5px solid ${
                        recordatoriosActivos ? "#bbf7d0" : "#e5e7eb"
                      }`,
                      background: recordatoriosActivos ? "#f0fdf4" : "#f9fafb",
                      borderRadius: 10,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: recordatoriosActivos ? "#007F2F" : "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Seguimiento a {s.plazo}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#2F2F30",
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      📅 {s.fecha}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: recordatoriosActivos ? "#15803d" : "#9ca3af",
                        marginTop: 4,
                      }}
                    >
                      {recordatoriosActivos
                        ? "✓ Correo y recordatorio programados"
                        : "○ Recordatorio desactivado"}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "0 20px 16px",
                  fontSize: "0.72rem",
                  color: "#9ca3af",
                }}
              >
                También se dispara un recordatorio antes del cierre del corte
                académico para revisar el estado de cada caso abierto.
              </div>
            </div>

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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  Historial de citas
                </h3>
                <button
                  className="btn-cta"
                  style={{
                    padding: "7px 14px",
                    fontSize: "0.78rem",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  + Agendar cita
                </button>
              </div>
              {citasExpediente.length === 0 ? (
                <div
                  style={{
                    padding: "36px 20px",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "0.85rem",
                  }}
                >
                  No hay citas registradas para este expediente.
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["Fecha", "Hora", "Tipo", "Estado", "Observación"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{
                              padding: "10px 16px",
                              textAlign: "left",
                              fontSize: "0.72rem",
                              color: "#6b7280",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {citasExpediente.map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td
                          style={{
                            padding: "11px 16px",
                            fontSize: "0.82rem",
                            color: "#2F2F30",
                            fontWeight: 500,
                          }}
                        >
                          {c.fecha}
                        </td>
                        <td
                          style={{
                            padding: "11px 16px",
                            fontSize: "0.82rem",
                            color: "#6b7280",
                          }}
                        >
                          {c.hora}
                        </td>
                        <td style={{ padding: "11px 16px" }}>
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
                            {c.tipo}
                          </span>
                        </td>
                        <td style={{ padding: "11px 16px" }}>
                          <span
                            style={{
                              background:
                                c.estado === "Realizada"
                                  ? "#f0fdf4"
                                  : "#fffbeb",
                              color:
                                c.estado === "Realizada"
                                  ? "#15803d"
                                  : "#92400e",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: 20,
                            }}
                          >
                            {c.estado}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "11px 16px",
                            fontSize: "0.78rem",
                            color: "#6b7280",
                          }}
                        >
                          {c.obs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
