import { useState } from "react"

interface StudentDonacionesProps {
  onNavigate: (view: string) => void
}

const ACCENT = "#C2410C"

const situaciones = [
  { id: "emergencia", label: "Situación de emergencia económica", icon: "🆘" },
  { id: "cabeza_familia", label: "Soy cabeza de familia", icon: "👪" },
  { id: "estrato", label: "Estrato 1 o 2 sin apoyo familiar", icon: "🏠" },
  {
    id: "desempleo",
    label: "Desempleo o reducción de ingresos familiares",
    icon: "📉",
  },
]

type Step = 1 | 2 | 3

export default function StudentDonaciones({
  onNavigate,
}: StudentDonacionesProps) {
  const [step, setStep] = useState<Step>(1)
  const [situacion, setSituacion] = useState("")
  const [detalle, setDetalle] = useState("")
  const [consentimiento, setConsentimiento] = useState(false)

  const canStep2 = situacion !== ""
  const canStep3 = detalle.trim().length > 10 && consentimiento

  const steps = [
    { n: 1, label: "Situación" },
    { n: 2, label: "Detalle y consentimiento" },
    { n: 3, label: "Confirmación" },
  ]

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
              color: ACCENT,
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
              Solicitar apoyo alimentario
            </h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
              Ucevistas de Corazón · Donaciones Alimentarias
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate("student_home")}
          title="Cerrar sección"
          aria-label="Cerrar sección"
          style={{
            background: "#fff2e8",
            color: ACCENT,
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
                    background: step >= s.n ? ACCENT : "#e5e7eb",
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
                    color: step >= s.n ? ACCENT : "#9ca3af",
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
                    background: step > s.n ? ACCENT : "#e5e7eb",
                    margin: "0 4px",
                    marginBottom: 20,
                    transition: "background 0.2s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

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
                ¿Cuál es tu situación?
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Esta información nos ayuda a priorizar la entrega de mercados
                con equidad.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {situaciones.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSituacion(s.id)}
                  style={{
                    padding: "18px 16px",
                    borderRadius: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    border: `2px solid ${
                      situacion === s.id ? ACCENT : "#e5e7eb"
                    }`,
                    background: situacion === s.id ? "#fff2e8" : "#fff",
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
                      fontSize: "0.85rem",
                      color: situacion === s.id ? ACCENT : "#2F2F30",
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => canStep2 && setStep(2)}
              disabled={!canStep2}
              style={{
                padding: "12px",
                fontSize: "0.9rem",
                border: "none",
                cursor: canStep2 ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                opacity: canStep2 ? 1 : 0.4,
                borderRadius: 10,
                background: ACCENT,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Continuar →
            </button>
          </div>
        )}

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
                Cuéntanos más
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Tu información será revisada de forma confidencial por el equipo
                de Bienestar.
              </p>
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
                Describe brevemente tu situación{" "}
                <span style={{ color: "#FF005A" }}>*</span>
              </label>
              <textarea
                value={detalle}
                onChange={(e) => setDetalle(e.target.value.slice(0, 300))}
                placeholder="Ejemplo: Vivo con mis dos hermanos menores y actualmente no contamos con ingresos suficientes para cubrir la alimentación del mes…"
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
                  e.target.style.borderColor = ACCENT
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb"
                }}
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.72rem",
                  color: detalle.length < 10 ? "#FF005A" : "#9ca3af",
                  marginTop: 4,
                }}
              >
                {detalle.length}/300 caracteres{" "}
                {detalle.length < 10 && "(mínimo 10)"}
              </div>
            </div>

            <div
              style={{
                background: "#fff2e8",
                border: `1.5px solid ${ACCENT}55`,
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
                <strong>Consentimiento informado:</strong> Autorizas a Bienestar
                Universitario UCEVA a verificar tu matrícula activa y a tratar
                tu información socioeconómica de manera confidencial para la
                asignación priorizada de apoyos alimentarios.
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
                  style={{ accentColor: ACCENT, marginTop: 2, flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  Acepto el consentimiento informado y autorizo el tratamiento
                  de mis datos para esta solicitud.
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
                style={{
                  flex: 2,
                  padding: "11px",
                  border: "none",
                  cursor: canStep3 ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  opacity: canStep3 ? 1 : 0.4,
                  borderRadius: 10,
                  background: ACCENT,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Revisar solicitud →
              </button>
            </div>
          </div>
        )}

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
                Confirma tu solicitud
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                El equipo de Bienestar la revisará junto con los criterios de
                priorización institucionales.
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
                  label: "Situación reportada",
                  value:
                    situaciones.find((s) => s.id === situacion)?.label ?? "",
                },
                {
                  label: "Estado",
                  value: "🟡 Recibida — pendiente de priorización",
                },
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
              <strong>⚠️ Importante:</strong> Si tu solicitud es priorizada,
              recibirás la confirmación por tu correo institucional con el punto
              y fecha de entrega. Deberás presentar tu carné estudiantil para
              validar la entrega.
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
                onClick={() => onNavigate("student_home")}
                style={{
                  flex: 2,
                  padding: "11px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  borderRadius: 10,
                  background: ACCENT,
                  color: "#fff",
                  fontWeight: 700,
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
