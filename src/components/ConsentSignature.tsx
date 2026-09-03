import { useRef, useState, useEffect } from "react"

interface ConsentSignatureProps {
  moduleName: string
  moduleColor: string
  consentText: string
  correoInstitucional?: string
  onSigned?: (signed: boolean) => void
}

type Metodo = "pantalla" | "correo"

export default function ConsentSignature({
  moduleName,
  moduleColor,
  consentText,
  correoInstitucional,
  onSigned,
}: ConsentSignatureProps) {
  const [aceptado, setAceptado] = useState(false)
  const [metodo, setMetodo] = useState<Metodo>("pantalla")
  const [hasDrawn, setHasDrawn] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [correoEnviado, setCorreoEnviado] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const signed = aceptado && (metodo === "pantalla" ? hasDrawn : correoEnviado)

  useEffect(() => {
    onSigned?.(signed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed])

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const point = "touches" in e ? e.touches[0] : e
    return { x: point.clientX - rect.left, y: point.clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setDrawing(true)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.lineWidth = 2.2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#2F2F30"
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasDrawn(true)
  }

  const endDraw = () => setDrawing(false)

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "20px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <h3
        style={{
          fontWeight: 700,
          fontSize: "0.9rem",
          color: moduleColor,
          margin: "0 0 14px",
        }}
      >
        Consentimiento informado · {moduleName}
      </h3>
      <p
        style={{
          margin: "0 0 14px",
          fontSize: "0.82rem",
          color: "#6b7280",
          lineHeight: 1.6,
        }}
      >
        {consentText}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <input
          type="checkbox"
          id={`consent-${moduleName}`}
          checked={aceptado}
          onChange={(e) => setAceptado(e.target.checked)}
          style={{ accentColor: moduleColor, marginTop: 2 }}
        />
        <label
          htmlFor={`consent-${moduleName}`}
          style={{ fontSize: "0.83rem", color: "#374151", lineHeight: 1.5 }}
        >
          Declaro que he leído la información anterior, la participación es
          voluntaria y puedo abandonar el proceso en cualquier momento.
        </label>
      </div>

      {aceptado && (
        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 16 }}>
          <div
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: 10,
            }}
          >
            Mecanismo de validación
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            {([
              ["pantalla", "✍️ Firmar en pantalla"],
              ["correo", "📧 Enviar PDF al correo institucional"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setMetodo(id)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textAlign: "center",
                  border: `1.5px solid ${
                    metodo === id ? moduleColor : "#e5e7eb"
                  }`,
                  background: metodo === id ? `${moduleColor}12` : "#fff",
                  color: metodo === id ? moduleColor : "#374151",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {metodo === "pantalla" ? (
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  marginBottom: 6,
                }}
              >
                Dibuja tu firma con el mouse o el dedo (dispositivo táctil):
              </div>
              <canvas
                ref={canvasRef}
                width={480}
                height={130}
                style={{
                  width: "100%",
                  maxWidth: 480,
                  height: 130,
                  border: "1.5px dashed #d1d5db",
                  borderRadius: 10,
                  background: "#fafafa",
                  touchAction: "none",
                  cursor: "crosshair",
                }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: hasDrawn ? "#007F2F" : "#9ca3af",
                    fontWeight: 600,
                  }}
                >
                  {hasDrawn ? "✓ Firma capturada" : "Aún no se ha firmado"}
                </span>
                <button
                  onClick={clearSignature}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Borrar y volver a firmar
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#f9fafb",
                border: "1.5px solid #e5e7eb",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#374151",
                  marginBottom: 10,
                }}
              >
                Se enviará un PDF de consentimiento a{" "}
                <strong>
                  {correoInstitucional ?? "correo institucional del usuario"}
                </strong>{" "}
                para su verificación y visto bueno. Se generará constancia para
                ambas partes.
              </div>
              {!correoEnviado ? (
                <button
                  onClick={() => setCorreoEnviado(true)}
                  style={{
                    padding: "9px 18px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: moduleColor,
                    color: "#fff",
                  }}
                >
                  Enviar PDF al correo
                </button>
              ) : (
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#007F2F",
                    fontWeight: 600,
                  }}
                >
                  ✓ PDF enviado — pendiente de confirmación por parte del
                  usuario
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
