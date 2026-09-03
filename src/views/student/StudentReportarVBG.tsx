import { useState } from "react"

interface StudentReportarVBGProps {
  onNavigate: (view: string) => void
}

const tiposViolencia = [
  "Física",
  "Psicológica",
  "Sexual",
  "Económica",
  "Patrimonial",
  "Digital",
  "Acoso laboral",
  "Acoso sexual",
]

type Step = 1 | 2 | 3

export default function StudentReportarVBG({
  onNavigate,
}: StudentReportarVBGProps) {
  const [step, setStep] = useState<Step>(1)
  const [quienReporta, setQuienReporta] =
    useState<"yo" | "tercero" | "anonimo" | "">("")
  const [tipo, setTipo] = useState("")
  const [relato, setRelato] = useState("")
  const [consentimiento, setConsentimiento] = useState(false)
  const [urgente, setUrgente] = useState(false)

  const canStep2 = quienReporta !== ""
  const canStep3 = tipo !== "" && relato.trim().length > 15 && consentimiento

  const steps = [
    { n: 1, label: "Quién reporta" },
    { n: 2, label: "Relato y consentimiento" },
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
              color: "#FF005A",
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
              Reportar una situación
            </h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
              Violencias de Género · Confidencial
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
        {/* Aviso confidencialidad */}
        <div
          style={{
            background: "#fff0f5",
            border: "1.5px solid #ffd0e0",
            borderRadius: 12,
            padding: "14px 16px",
            fontSize: "0.8rem",
            color: "#9d0042",
            lineHeight: 1.6,
          }}
        >
          🔒 Este espacio es confidencial. Solo el equipo autorizado de la
          Vicerrectoría de Bienestar Universitario podrá acceder a la
          información que compartas.
        </div>

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
                    background: step >= s.n ? "#FF005A" : "#e5e7eb",
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
                    color: step >= s.n ? "#FF005A" : "#9ca3af",
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
                    background: step > s.n ? "#FF005A" : "#e5e7eb",
                    margin: "0 4px",
                    marginBottom: 20,
                    transition: "background 0.2s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Paso 1 */}
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
                ¿Quién está reportando?
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Puedes reportar por ti mismo/a, en nombre de otra persona, o de
                forma anónima.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {([
                {
                  id: "yo",
                  icon: "🙋",
                  label: "Soy la persona afectada",
                  desc: "Quiero reportar una situación que estoy viviendo.",
                },
                {
                  id: "tercero",
                  icon: "🤝",
                  label: "Reporto en nombre de otra persona",
                  desc: "Conozco a alguien que necesita apoyo y acompañamiento.",
                },
                {
                  id: "anonimo",
                  icon: "🕶️",
                  label: "Prefiero reportar de forma anónima",
                  desc: "No compartiré mi identidad ni la de la persona afectada.",
                },
              ] as const).map((o) => (
                <button
                  key={o.id}
                  onClick={() => setQuienReporta(o.id)}
                  style={{
                    padding: "16px",
                    borderRadius: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    border: `2px solid ${
                      quienReporta === o.id ? "#FF005A" : "#e5e7eb"
                    }`,
                    background: quienReporta === o.id ? "#fff0f5" : "#fff",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{ fontSize: "1.6rem" }}>{o.icon}</span>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: quienReporta === o.id ? "#FF005A" : "#2F2F30",
                      }}
                    >
                      {o.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: 2,
                      }}
                    >
                      {o.desc}
                    </div>
                  </div>
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
                background: "linear-gradient(135deg, #FF005A, #c40047)",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Paso 2 */}
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
                Cuéntanos qué ocurrió
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Tómate tu tiempo. No es necesario que incluyas detalles que no
                te sientas listo/a para compartir.
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
                Tipo de situación <span style={{ color: "#FF005A" }}>*</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tiposViolencia.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 20,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      border: `1.5px solid ${
                        tipo === t ? "#FF005A" : "#e5e7eb"
                      }`,
                      background: tipo === t ? "#fff0f5" : "#fff",
                      color: tipo === t ? "#FF005A" : "#374151",
                    }}
                  >
                    {t}
                  </button>
                ))}
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
                ¿Qué sucedió? <span style={{ color: "#FF005A" }}>*</span>
              </label>
              <textarea
                value={relato}
                onChange={(e) => setRelato(e.target.value.slice(0, 500))}
                placeholder="Describe brevemente la situación: qué pasó, cuándo y, si te sientes cómodo/a, quién estuvo involucrado…"
                rows={5}
                maxLength={500}
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
                  e.target.style.borderColor = "#FF005A"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb"
                }}
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.72rem",
                  color: relato.length < 15 ? "#FF005A" : "#9ca3af",
                  marginTop: 4,
                }}
              >
                {relato.length}/500 caracteres{" "}
                {relato.length < 15 && "(mínimo 15)"}
              </div>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                background: "#fff9e6",
                border: "1.5px solid #FFB400",
                borderRadius: 12,
                padding: "12px 16px",
              }}
            >
              <input
                type="checkbox"
                checked={urgente}
                onChange={(e) => setUrgente(e.target.checked)}
                style={{ accentColor: "#FFB400", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#92400e",
                  fontWeight: 500,
                }}
              >
                Esta situación requiere atención urgente o hay riesgo inmediato.
              </span>
            </label>

            {/* Consentimiento */}
            <div
              style={{
                background: "#fff0f5",
                border: "1.5px solid #ffd0e0",
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
                gestionar esta información de manera confidencial, conforme a la
                Ley 1257 de 2008, la Ley 1719 de 2014 y las políticas
                institucionales de protección de datos. Puedes desistir del
                proceso en cualquier momento.
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
                    accentColor: "#FF005A",
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
                  de esta información.
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
                  background: "linear-gradient(135deg, #FF005A, #c40047)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Revisar y enviar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 3 */}
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
                Confirma tu reporte
              </h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280" }}>
                Un profesional del equipo de Violencias de Género revisará tu
                reporte de manera confidencial.
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
                  label: "Quién reporta",
                  value:
                    quienReporta === "yo"
                      ? "🙋 La persona afectada"
                      : quienReporta === "tercero"
                        ? "🤝 En nombre de otra persona"
                        : "🕶️ Reporte anónimo",
                },
                { label: "Tipo de situación", value: tipo },
                {
                  label: "Prioridad",
                  value: urgente
                    ? "🔴 Urgente — requiere atención inmediata"
                    : "🟡 Atención en el flujo institucional habitual",
                },
                {
                  label: "Estado",
                  value: "🟡 Recibido — pendiente de asignación",
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

            {urgente && (
              <div
                style={{
                  background: "#fff0f5",
                  border: "1.5px solid #FF005A",
                  borderRadius: 12,
                  padding: "14px 16px",
                  fontSize: "0.8rem",
                  color: "#9d0042",
                  lineHeight: 1.6,
                }}
              >
                <strong>🆘 ¿Necesitas ayuda inmediata?</strong> Si estás en
                riesgo en este momento, comunícate con la Línea 106 (gratuita,
                24h) o acude directamente a la Vicerrectoría de Bienestar
                Universitario.
              </div>
            )}

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
              <strong>⚠️ Importante:</strong> El equipo de Bienestar se pondrá en
              contacto de forma confidencial para brindarte acompañamiento.
              Puedes desistir del proceso en cualquier momento sin que esto
              afecte tu situación académica.
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
                  background: "linear-gradient(135deg, #FF005A, #c40047)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                ✓ Enviar reporte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
