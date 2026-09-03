import logoUceva from "../assets/logo-uceva-icon.png"
import type { Role } from "../App"

interface SidebarProps {
  role: Role
  current: string
  onNavigate: (view: string) => void
  collapsed: boolean
  onToggle: () => void
  onLogout?: () => void
  mobileOpen?: boolean
}

const navItemsByRole: Record<Exclude<Role, "estudiante">, {
  id: string
  label: string
  icon: string
}[]> = {
  profesional: [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "salud_mental", label: "Salud Mental", icon: "🧠" },
    { id: "inclusion", label: "Inclusión Univ.", icon: "♿" },
    { id: "vbg", label: "Violencias de Género", icon: "🛡️" },
    { id: "expedientes", label: "Expedientes", icon: "📁" },
    { id: "analitica", label: "Analítica", icon: "📊" },
    { id: "repositorio", label: "Repositorio", icon: "📚" },
  ],
  almacen: [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "donaciones", label: "Ucevistas de Corazón", icon: "🧺" },
    { id: "repositorio", label: "Repositorio", icon: "📚" },
  ],
  admin: [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "dashboard", label: "Dashboard global", icon: "⊞" },
    { id: "analitica", label: "Analítica institucional", icon: "📊" },
    { id: "admin", label: "Administración", icon: "⚙️" },
    { id: "repositorio", label: "Repositorio", icon: "📚" },
  ],
}

const userByRole: Record<Exclude<Role, "estudiante">, {
  nombre: string
  cargo: string
  avatar: string
}> = {
  profesional: {
    nombre: "Dra. Carolina Restrepo",
    cargo: "Psicóloga",
    avatar: "CR",
  },
  almacen: {
    nombre: "Andrés Felipe Gómez",
    cargo: "Personal de Almacén",
    avatar: "AG",
  },
  admin: {
    nombre: "Laura Fernández",
    cargo: "Administradora del Sistema",
    avatar: "LF",
  },
}

export default function Sidebar({
  role,
  current,
  onNavigate,
  collapsed,
  onToggle,
  onLogout,
  mobileOpen,
}: SidebarProps) {
  const navItems = navItemsByRole[(role as Exclude<Role, "estudiante">)]
  const user = userByRole[(role as Exclude<Role, "estudiante">)]
  return (
    <aside
      className={`app-sidebar${mobileOpen ? " mobile-open" : ""}`}
      style={{
        width: collapsed ? 64 : 230,
        background: "#002e11",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s ease",
        flexShrink: 0,
        zIndex: 50,
        position: "relative",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "16px 0" : "16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: collapsed ? "center" : "flex-start",
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
        {!collapsed && (
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
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          top: 24,
          right: -12,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#007F2F",
          border: "2px solid #002e11",
          color: "#fff",
          fontSize: "0.6rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {collapsed ? "›" : "‹"}
      </button>

      <nav
        style={{ flex: 1, minHeight: 0, padding: "12px 0", overflowY: "auto" }}
      >
        {navItems.map((item) => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "10px 0" : "10px 16px",
                justifyContent: collapsed ? "center" : "flex-start",
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
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* User + logout */}
      <div
        style={{
          padding: collapsed ? "12px 0" : "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: collapsed ? "column" : "row",
          alignItems: "center",
          gap: 10,
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8AFF00, #108900)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.7rem",
              color: "#003a10",
              flexShrink: 0,
            }}
          >
            {user.avatar}
          </div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
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
                {user.nombre}
              </div>
              <div
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}
              >
                {user.cargo}
              </div>
            </div>
          )}
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
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
              e.currentTarget.style.color = "rgba(255,255,255,0.7)"
            }}
          >
            <svg
              width="16"
              height="16"
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
        )}
      </div>
    </aside>
  )
}
