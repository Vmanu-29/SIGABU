interface TopBarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  onClose?: () => void
}

export default function TopBar({
  title,
  subtitle,
  actions,
  onClose,
}: TopBarProps) {
  return (
    <div
      className="topbar"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 28px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      <div className="topbar-copy">
        <h1
          style={{
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "#007F2F",
            margin: 0,
            letterSpacing: "-0.2px",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "#9ca3af", fontSize: "0.78rem", margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
      <div
        className="topbar-actions"
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        {/* Notifications */}
        <button
          style={{
            position: "relative",
            background: "#f3f4f6",
            border: "none",
            borderRadius: 8,
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#FF005A",
              border: "1.5px solid #fff",
            }}
          />
        </button>
        {actions}
        {onClose && (
          <button
            onClick={onClose}
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
        )}
      </div>
    </div>
  )
}
