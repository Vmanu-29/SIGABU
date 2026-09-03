import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import StudentSidebar from "./components/StudentSidebar"
import Login from "./views/Login"
import Dashboard from "./views/Dashboard"
import SaludMental from "./views/SaludMental"
import Inclusion from "./views/Inclusion"
import VBG from "./views/VBG"
import Expediente from "./views/Expediente"
import Analitica from "./views/Analitica"
import Repositorio from "./views/Repositorio"
import Admin from "./views/Admin"
import Home from "./views/Home"
import Donaciones from "./views/Donaciones"
import StudentHome from "./views/student/StudentHome"
import StudentCita from "./views/student/StudentCita"
import StudentMisCitas from "./views/student/StudentMisCitas"
import StudentRecursos from "./views/student/StudentRecursos"
import StudentReportarVBG from "./views/student/StudentReportarVBG"
import StudentDonaciones from "./views/student/StudentDonaciones"

export type Role = "estudiante" | "profesional" | "almacen" | "admin"

const ROLES: Role[] = ["estudiante", "profesional", "almacen", "admin"]

const defaultViewByRole: Record<Role, string> = {
  estudiante: "student_home",
  profesional: "home",
  almacen: "donaciones",
  admin: "admin",
}

const MOBILE_QUERY = "(max-width: 900px)"

const SESSION_KEY = "sigabu_session"

interface StoredSession {
  role: Role
  currentView: string
  viewExtra?: string
  sidebarCollapsed: boolean
}

function loadSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && ROLES.includes(parsed.role)) {
      return parsed as StoredSession
    }
    return null
  } catch {
    return null
  }
}

export default function App() {
  const initialSession = loadSession()

  const [role, setRole] = useState<Role | null>(initialSession?.role ?? null)
  const [currentView, setCurrentView] = useState(
    initialSession?.currentView ?? "home",
  )
  const [viewExtra, setViewExtra] = useState<string | undefined>(
    initialSession?.viewExtra,
  )
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    initialSession?.sidebarCollapsed ?? false,
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  )

  useEffect(() => {
    if (!role) {
      sessionStorage.removeItem(SESSION_KEY)
      return
    }
    const toStore: StoredSession = {
      role,
      currentView,
      viewExtra,
      sidebarCollapsed,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(toStore))
  }, [role, currentView, viewExtra, sidebarCollapsed])

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      if (!e.matches) setMobileMenuOpen(false)
    }
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [])

  const navigate = (view: string, extra?: string) => {
    setCurrentView(view)
    setViewExtra(extra)
    setMobileMenuOpen(false)
  }

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole)
    setCurrentView(defaultViewByRole[selectedRole])
    setViewExtra(undefined)
  }

  const handleLogout = () => {
    setRole(null)
    setCurrentView("login")
  }

  if (!role) {
    return <Login onLogin={handleLogin} />
  }

  // Portal estudiantil
  if (role === "estudiante") {
    const renderStudentView = () => {
      switch (currentView) {
        case "student_home":
          return <StudentHome onNavigate={navigate} />
        case "student_cita":
          return <StudentCita onNavigate={navigate} />
        case "student_mis_citas":
          return <StudentMisCitas onNavigate={navigate} />
        case "student_recursos":
          return <StudentRecursos onNavigate={navigate} />
        case "student_reportar_vbg":
          return <StudentReportarVBG onNavigate={navigate} />
        case "student_donaciones":
          return <StudentDonaciones onNavigate={navigate} />
        default:
          return <StudentHome onNavigate={navigate} />
      }
    }
    return (
      <div
        className="app-shell"
        style={{
          display: "flex",
          height: "100dvh",
          minHeight: "100dvh",
          overflow: "hidden",
          fontFamily: "'Inter', system-ui, sans-serif",
          background: "#F7F9F8",
        }}
      >
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          title="Menú"
        >
          {mobileMenuOpen ? "×" : "☰"}
        </button>
        {mobileMenuOpen && (
          <div
            className="mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <StudentSidebar
          current={currentView}
          onNavigate={navigate}
          onLogout={handleLogout}
          mobileOpen={mobileMenuOpen}
        />
        <div
          className="app-main"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {renderStudentView()}
        </div>
      </div>
    )
  }

  // Portales institucionales: Profesional de Bienestar · Personal de Almacén · Administrador
  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home onNavigate={navigate} role={role} />
      case "dashboard":
        return <Dashboard onNavigate={navigate} />
      case "salud_mental":
        return <SaludMental onNavigate={navigate} initialMode={viewExtra} />
      case "inclusion":
        return <Inclusion onNavigate={navigate} />
      case "vbg":
        return <VBG onNavigate={navigate} initialMode={viewExtra} />
      case "donaciones":
        return <Donaciones onNavigate={navigate} initialTab={viewExtra} />
      case "expedientes":
        return <Expediente caseId={viewExtra} onNavigate={navigate} />
      case "analitica":
        return <Analitica onNavigate={navigate} />
      case "repositorio":
        return <Repositorio onNavigate={navigate} />
      case "admin":
        return <Admin onNavigate={navigate} initialTab={viewExtra} />
      default:
        return <Home onNavigate={navigate} role={role} />
    }
  }

  return (
    <div
      className="app-shell"
      style={{
        display: "flex",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        background: "#F7F9F8",
      }}
    >
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Abrir menú"
        title="Menú"
      >
        {mobileMenuOpen ? "×" : "☰"}
      </button>
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <Sidebar
        role={role}
        current={currentView}
        onNavigate={(view) => navigate(view)}
        collapsed={isMobile ? false : sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        onLogout={handleLogout}
        mobileOpen={mobileMenuOpen}
      />
      <div
        className="app-main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {renderView()}
      </div>
    </div>
  )
}
