import logoUceva from "../assets/logo-uceva-icon.png"

interface StudentSidebarProps {
  current: string
  onNavigate: (view: string) => void
  onLogout: () => void
  mobileOpen?: boolean
}

const navItems = [
  { id: "student_home", label: "Inicio", icon: "🏠" },
  { id: "student_cita", label: "Solicitar cita", icon: "🗓️" },
  { id: "student_mis_citas", label: "Mis citas", icon: "📋" },
  { id: "student_reportar_vbg", label: "Reportar situación", icon: "🛡️" },
  { id: "student_donaciones", label: "Apoyo alimentario", icon: "🧺" },
  { id: "student_recursos", label: "Recursos", icon: "📚" },
]

export default function StudentSidebar({
  current,
  onNavigate,
  onLogout,
  mobileOpen,
}: StudentSidebarProps) {
  return (
    <aside
      className={`app-sidebar student-app-sidebar${
        mobileOpen ? " mobile-open" : ""
      }`}
      style={{
        width: 230,
        background: "#002e11",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          minHeight: 72,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            width: 36,
            height: 36,
            padding: 4,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={logoUceva}
            alt="UCEVA"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.9rem",
              lineHeight: 1.1,
            }}
          >
            SIGABU
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.6rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Bienestar · UCEVA
          </div>
        </div>
      </div>

      {/* Badge estudiante */}
      <div
        style={{
          margin: "14px 16px 4px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(138,255,0,0.08)",
          border: "1px solid rgba(138,255,0,0.18)",
          borderRadius: 8,
          padding: "7px 10px",
        }}
      >
        <span style={{ fontSize: "1rem" }}>🎓</span>
        <span
          style={{ color: "#8AFF00", fontSize: "0.72rem", fontWeight: 600 }}
        >
          Portal Estudiantil
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{ flex: 1, minHeight: 0, padding: "8px 0", overflowY: "auto" }}
      >
        {navItems.map((item) => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 16px",
                background: active ? "rgba(138,255,0,0.12)" : "transparent",
                border: "none",
                borderLeft: active
                  ? "3px solid #8AFF00"
                  : "3px solid transparent",
                cursor: "pointer",
                color: active ? "#8AFF00" : "rgba(255,255,255,0.6)",
                fontSize: "0.875rem",
                fontWeight: active ? 600 : 400,
                fontFamily: "inherit",
                transition: "all 0.15s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = "#ffffff"
              }}
              onMouseLeave={(e) => {
                if (!active)
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)"
              }}
            >
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Línea de crisis */}
      <div
        style={{
          margin: "0 12px 12px",
          background: "rgba(255,0,90,0.1)",
          border: "1px solid rgba(255,0,90,0.25)",
          borderRadius: 10,
          padding: "12px",
        }}
      >
        <div
          style={{
            color: "#FF005A",
            fontWeight: 700,
            fontSize: "0.72rem",
            marginBottom: 4,
          }}
        >
          🆘 Línea de crisis
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.7rem",
            lineHeight: 1.4,
          }}
        >
          Si estás en una situación de emergencia emocional, llama al
          <br />
          <strong style={{ color: "#fff" }}>106</strong> — Línea 106 (gratis,
          24h)
        </div>
      </div>

      {/* Usuario */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFB400, #FF7A00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.7rem",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          JP
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "0.78rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Juan Pérez
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>
            Estudiante · Ing. Sistemas
          </div>
        </div>
        <button
          onClick={onLogout}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.35)",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FF005A"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.35)"
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
