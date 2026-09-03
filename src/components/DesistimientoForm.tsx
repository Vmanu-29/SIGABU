interface DesistimientoOption {
  id: string
  label: string
}

interface DesistimientoFormProps {
  moduleColor: string
  opciones: DesistimientoOption[]
  onCancel: () => void
  onSubmit: () => void
}

export default function DesistimientoForm({
  moduleColor,
  opciones,
  onCancel,
  onSubmit,
}: DesistimientoFormProps) {
  return (
    <div
      style={{
        maxWidth: 640,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          background: "#fff9e6",
          border: "1.5px solid #FFB400",
          borderRadius: 12,
          padding: "16px",
          fontSize: "0.82rem",
          color: "#92400e",
          lineHeight: 1.6,
        }}
      >
        <strong>⚠️ Importante:</strong> El desistimiento no cierra el expediente
        digital ni elimina la información registrada. El caso queda documentado
        con trazabilidad completa y podrá reactivarse si la persona lo solicita.
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "20px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
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
            Expediente
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
            {opciones.map((o) => (
              <option key={o.id}>{o.label}</option>
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
            Motivo del desistimiento
          </label>
          <textarea
            rows={3}
            placeholder="Describa brevemente las razones expresadas por la persona…"
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <input
            type="checkbox"
            id="des-consent"
            style={{ accentColor: moduleColor, marginTop: 2 }}
          />
          <label
            htmlFor="des-consent"
            style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.5 }}
          >
            Confirmo que la persona fue informada de que puede reactivar el
            proceso en cualquier momento y que su decisión fue tomada de manera
            libre y voluntaria.
          </label>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="btn-cta"
            style={{
              padding: "11px 24px",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onClick={onSubmit}
          >
            Registrar desistimiento
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
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
