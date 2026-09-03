import { useState } from "react"

interface StudentCitaProps {
  onNavigate: (view: string) => void
}

const servicios = [
  {
    id: "psicologia",
    label: "Atención Psicológica",
    icon: "🧠",
    desc: "Orientación emocional, ansiedad, estrés académico, duelo, relaciones.",
  },
  {
    id: "trabajo_social",
    label: "Trabajo Social",
    icon: "🤝",
    desc: "Apoyo socioeconómico, orientación familiar, situaciones de vulnerabilidad.",
  },
  {
    id: "inclusion",
    label: "Inclusión Universitaria",
    icon: "♿",
    desc: "Caracterización de discapacidad, ajustes razonables, apoyos académicos.",
  },
  {
    id: "orientacion",
    label: "Orientación Vocacional",
    icon: "🧭",
    desc: "Proyecto de vida, elección de carrera, dificultades académicas.",
  },
]

const horarios = [
  "8:00 am",
  "9:00 am",
  "10:00 am",
  "11:00 am",
  "2:00 pm",
  "3:00 pm",
  "4:00 pm",
]

type Step = 1 | 2 | 3 | 4

export default function StudentCita({ onNavigate }: StudentCitaProps) {
  const [step, setStep] = useState<Step>(1)
  const [servicio, setServicio] = useState("")
  const [motivo, setMotivo] = useState("")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [modalidad, setModalidad] = useState<"presencial" | "virtual" | "">("")
  const [consentimiento, setConsentimiento] = useState(false)

  const canStep2 = servicio !== ""
  const canStep3 = motivo.trim().length > 15 && consentimiento
  const canStep4 = fecha !== "" && hora !== "" && modalidad !== ""

  const steps = [
    { n: 1, label: "Servicio" },
    { n: 2, label: "Motivo" },
    { n: 3, label: "Fecha y hora" },
    { n: 4, label: "Confirmación" },
  ]

  const selectedServicio = servicios.find((s) => s.id === servicio)

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
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() =>
              step > 1
                ? setStep((step - 1) as Step)
                : onNavigate("student_home")
            }
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#007F2F",
              fontSize: "0.85rem",
              fontWeight: 600,
              fontFamily: "inherit",
              padding: "4px 0",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ← {step > 1 ? "Atrás" : "Inicio"}
          </button>
          <div style={{ width: 1, height: 20, background: "#e5e7eb" }} />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#2F2F30",
              }}
            >
              Solicitar cita
            </h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
              Bienestar Universitario · UCEVA
            </p>
          </div>
        </div>
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
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px",
          maxWidth: 740,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < steps.length - 1 ? 1 : 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background:
                      step > s.n
                        ? "#007F2F"
                        : step === s.n
                          ? "#007F2F"
                          : "#e5e7eb",
                    color: step >= s.n ? "#fff" : "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                >
                  {step > s.n ? "✓" : s.n}
                </div>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: step >= s.n ? "#007F2F" : "#9ca3af",
                    fontWeight: step === s.n ? 700 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: step > s.n ? "#007F2F" : "#e5e7eb",
                    margin: "0 4px",
                    marginBottom: 20,
                    transition: "background 0.2s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Paso 1: Servicio */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h2
                style={{
                  margin: "0 0 4px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#2F2F30",
                }}
              >
                ¿Qué servicio necesitas?
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Selecciona el tipo de acompañamiento que estás buscando.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {servicios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setServicio(s.id)}
                  style={{
                    padding: "18px 16px",
                    borderRadius: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    border: `2px solid ${
                      servicio === s.id ? "#007F2F" : "#e5e7eb"
                    }`,
                    background: servicio === s.id ? "#f0fdf4" : "#fff",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: servicio === s.id ? "#007F2F" : "#2F2F30",
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => canStep2 && setStep(2)}
              disabled={!canStep2}
              className="btn-cta"
              style={{
                padding: "12px",
                fontSize: "0.9rem",
                border: "none",
                cursor: canStep2 ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                opacity: canStep2 ? 1 : 0.4,
                borderRadius: 10,
              }}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Paso 2: Motivo + Consentimiento */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h2
                style={{
                  margin: "0 0 4px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#2F2F30",
                }}
              >
                Cuéntanos cómo te sientes
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Esta información es confidencial y solo la verá el profesional
                asignado.
              </p>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>
                {selectedServicio?.icon}
              </span>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#2F2F30",
                  }}
                >
                  {selectedServicio?.label}
                </div>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007F2F",
                    fontSize: "0.73rem",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "inherit",
                  }}
                >
                  Cambiar servicio
                </button>
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                ¿Cuál es el motivo de tu consulta?{" "}
                <span style={{ color: "#FF005A" }}>*</span>
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value.slice(0, 300))}
                placeholder="Describe brevemente lo que estás viviendo o lo que te gustaría trabajar en la sesión. Ejemplo: 'Siento mucha ansiedad por los exámenes y no puedo concentrarme...'"
                rows={5}
                maxLength={300}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 10,
                  fontSize: "0.88rem",
                  fontFamily: "inherit",
                  color: "#2F2F30",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  lineHeight: 1.6,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#007F2F"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb"
                }}
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.72rem",
                  color: motivo.length < 15 ? "#FF005A" : "#9ca3af",
                  marginTop: 4,
                }}
              >
                {motivo.length}/300 caracteres{" "}
                {motivo.length < 15 && "(mínimo 15)"}
              </div>
            </div>

            {/* Consentimiento */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1.5px solid #bbf7d0",
                borderRadius: 12,
                padding: "16px",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "0.8rem",
                  color: "#374151",
                  lineHeight: 1.6,
                }}
              >
                <strong>Consentimiento informado:</strong> Al marcar esta
                casilla, autorizas a Bienestar Universitario UCEVA a registrar y
                gestionar la información de tu consulta de manera confidencial,
                conforme a la Ley 1090 de 2006 (Código Deontológico del
                Psicólogo) y las políticas institucionales de protección de
                datos.
              </p>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={consentimiento}
                  onChange={(e) => setConsentimiento(e.target.checked)}
                  style={{
                    accentColor: "#007F2F",
                    marginTop: 2,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  Acepto el consentimiento informado y autorizo el tratamiento
                  de mis datos para esta atención.
                </span>
              </label>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: "11px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  color: "#374151",
                }}
              >
                ← Atrás
              </button>
              <button
                onClick={() => canStep3 && setStep(3)}
                disabled={!canStep3}
                className="btn-cta"
                style={{
                  flex: 2,
                  padding: "11px",
                  border: "none",
                  cursor: canStep3 ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  opacity: canStep3 ? 1 : 0.4,
                  borderRadius: 10,
                }}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Fecha y hora */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h2
                style={{
                  margin: "0 0 4px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#2F2F30",
                }}
              >
                Elige fecha, hora y modalidad
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Selecciona cuándo y cómo quieres tu sesión.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Fecha preferida <span style={{ color: "#FF005A" }}>*</span>
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 10,
                    fontSize: "0.88rem",
                    fontFamily: "inherit",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2F2F30",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#007F2F"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb"
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Hora preferida <span style={{ color: "#FF005A" }}>*</span>
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {horarios.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHora(h)}
                      style={{
                        padding: "7px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        border: `1.5px solid ${
                          hora === h ? "#007F2F" : "#e5e7eb"
                        }`,
                        background: hora === h ? "#f0fdf4" : "#fff",
                        color: hora === h ? "#007F2F" : "#374151",
                        transition: "all 0.12s",
                      }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                Modalidad <span style={{ color: "#FF005A" }}>*</span>
              </label>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  {
                    id: "presencial",
                    label: "Presencial",
                    icon: "🏢",
                    desc: "Edificio Bienestar, piso 2",
                  },
                  {
                    id: "virtual",
                    label: "Virtual",
                    icon: "💻",
                    desc: "Enlace por correo institucional",
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() =>
                      setModalidad(m.id as "presencial" | "virtual")
                    }
                    style={{
                      flex: 1,
                      padding: "16px",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "center",
                      border: `2px solid ${
                        modalidad === m.id ? "#007F2F" : "#e5e7eb"
                      }`,
                      background: modalidad === m.id ? "#f0fdf4" : "#fff",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>
                      {m.icon}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: modalidad === m.id ? "#007F2F" : "#2F2F30",
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "#9ca3af",
                        marginTop: 2,
                      }}
                    >
                      {m.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  flex: 1,
                  padding: "11px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  color: "#374151",
                }}
              >
                ← Atrás
              </button>
              <button
                onClick={() => canStep4 && setStep(4)}
                disabled={!canStep4}
                className="btn-cta"
                style={{
                  flex: 2,
                  padding: "11px",
                  border: "none",
                  cursor: canStep4 ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  opacity: canStep4 ? 1 : 0.4,
                  borderRadius: 10,
                }}
              >
                Revisar solicitud →
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Confirmación */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h2
                style={{
                  margin: "0 0 4px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#2F2F30",
                }}
              >
                Confirma tu solicitud
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Revisa los datos antes de enviar. Recibirás confirmación a tu
                correo.
              </p>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              {[
                {
                  label: "Servicio solicitado",
                  value: `${selectedServicio?.icon} ${selectedServicio?.label}`,
                },
                {
                  label: "Fecha preferida",
                  value: fecha
                    ? new Date(fecha + "T12:00:00").toLocaleDateString(
                        "es-CO",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "",
                },
                { label: "Hora preferida", value: hora },
                {
                  label: "Modalidad",
                  value:
                    modalidad === "presencial"
                      ? "🏢 Presencial — Edificio Bienestar, piso 2"
                      : "💻 Virtual — Enlace por correo",
                },
                { label: "Estado", value: "🟡 Pendiente de confirmación" },
              ].map((row, i, filas) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    padding: "13px 16px",
                    background: i % 2 === 0 ? "#fafafa" : "#fff",
                    borderBottom:
                      i < filas.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 180,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#6b7280",
                      flexShrink: 0,
                    }}
                  >
                    {row.label}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#2F2F30" }}>
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#fff9e6",
                border: "1.5px solid #FFB400",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: "0.8rem",
                color: "#92400e",
                lineHeight: 1.6,
              }}
            >
              <strong>⚠️ Importante:</strong> Esta es una solicitud de cita, no
              una cita confirmada. El equipo de Bienestar se comunicará contigo
              en las próximas 24 horas hábiles para confirmar la disponibilidad.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setStep(3)}
                style={{
                  flex: 1,
                  padding: "11px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  color: "#374151",
                }}
              >
                ← Atrás
              </button>
              <button
                onClick={() => onNavigate("student_mis_citas")}
                className="btn-cta"
                style={{
                  flex: 2,
                  padding: "11px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  borderRadius: 10,
                }}
              >
                ✓ Enviar solicitud
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
