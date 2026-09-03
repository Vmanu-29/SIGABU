import { useState, useEffect, useRef } from "react"
import TopBar from "../components/TopBar"
import {
  cases,
  sistemaUsuarios,
  inventarioDonaciones,
  solicitudesDonaciones,
  despachosDonaciones,
} from "../data/mockData"
import type { Role } from "../App"

interface HomeProps {
  onNavigate: (view: string, extra?: string) => void
  role: Exclude<Role, "estudiante">
}

const homeConfigByRole: Record<Exclude<Role, "estudiante">, {
  userName: string
  subtitle: string
  quickLinks: {
    icon: string
    label: string
    sub: string
    view: string
    extra?: string
    color: string
    bg: string
  }[]
}> = {
  profesional: {
    userName: "Dra. Carolina Restrepo",
    subtitle:
      "Sistema Inteligente de Gestión y Analítica del Bienestar Universitario",
    quickLinks: [
      {
        icon: "🧠",
        label: "Nueva consulta",
        sub: "Salud Mental",
        view: "salud_mental",
        extra: "nuevo",
        color: "#007F2F",
        bg: "#e6f4ec",
      },
      {
        icon: "♿",
        label: "Caracterización",
        sub: "Inclusión",
        view: "inclusion",
        color: "#108900",
        bg: "#f0fdf4",
      },
      {
        icon: "🛡️",
        label: "Nuevo reporte",
        sub: "Violencias de Género",
        view: "vbg",
        extra: "nuevo",
        color: "#FF005A",
        bg: "#fff0f5",
      },
      {
        icon: "📋",
        label: "Expedientes",
        sub: "Historias clínicas",
        view: "expedientes",
        color: "#FFB400",
        bg: "#fff9e6",
      },
      {
        icon: "📊",
        label: "Analítica",
        sub: "Reportes e indicadores",
        view: "analitica",
        color: "#FF005A",
        bg: "#fff0f5",
      },
      {
        icon: "📚",
        label: "Repositorio",
        sub: "Material psicoeducativo",
        view: "repositorio",
        color: "#007F2F",
        bg: "#e6f4ec",
      },
    ],
  },
  almacen: {
    userName: "Andrés Felipe Gómez",
    subtitle: "Panel de Almacén y Entregas — Ucevistas de Corazón",
    quickLinks: [
      {
        icon: "🤝",
        label: "Registrar donante",
        sub: "Donaciones",
        view: "donaciones",
        extra: "donantes",
        color: "#C2410C",
        bg: "#fff2e8",
      },
      {
        icon: "🧺",
        label: "Inventario",
        sub: "Stock en tiempo real",
        view: "donaciones",
        extra: "inventario",
        color: "#C2410C",
        bg: "#fff2e8",
      },
      {
        icon: "🎓",
        label: "Solicitudes",
        sub: "Priorización de estudiantes",
        view: "donaciones",
        extra: "solicitudes",
        color: "#2563eb",
        bg: "#eff6ff",
      },
      {
        icon: "📦",
        label: "Despachos",
        sub: "Validación en punto físico",
        view: "donaciones",
        extra: "despachos",
        color: "#007F2F",
        bg: "#e6f4ec",
      },
      {
        icon: "📚",
        label: "Repositorio",
        sub: "Guías y lineamientos",
        view: "repositorio",
        color: "#007F2F",
        bg: "#e6f4ec",
      },
    ],
  },
  admin: {
    userName: "Laura Fernández",
    subtitle: "Administración del Sistema — SIGABU",
    quickLinks: [
      {
        icon: "👥",
        label: "Usuarios y roles",
        sub: "Accesos y permisos",
        view: "admin",
        extra: "usuarios",
        color: "#FF005A",
        bg: "#fff0f5",
      },
      {
        icon: "🗂️",
        label: "Catálogos",
        sub: "Parametrización institucional",
        view: "admin",
        extra: "catalogos",
        color: "#2563eb",
        bg: "#eff6ff",
      },
      {
        icon: "⚙️",
        label: "Flujos de trabajo",
        sub: "Procesos institucionales",
        view: "admin",
        extra: "flujos",
        color: "#007F2F",
        bg: "#e6f4ec",
      },
      {
        icon: "🔍",
        label: "Auditoría",
        sub: "Trazabilidad del sistema",
        view: "admin",
        extra: "auditoria",
        color: "#2F2F30",
        bg: "#f5f5f5",
      },
      {
        icon: "📊",
        label: "Analítica institucional",
        sub: "Dashboards globales",
        view: "analitica",
        color: "#FFB400",
        bg: "#fff9e6",
      },
      {
        icon: "⊞",
        label: "Dashboard global",
        sub: "Resumen operativo",
        view: "dashboard",
        color: "#007F2F",
        bg: "#e6f4ec",
      },
    ],
  },
}

const quotes = [
  {
    text: "Cuidar la salud mental no es un lujo, es una necesidad. Tu bienestar importa.",
    author: "Bienestar Universitario UCEVA",
    img: "https://images.unsplash.com/photo-1421790500381-fc9b5996f343?w=900&h=500&fit=crop&auto=format",
    alt: "Río tranquilo rodeado de árboles verdes",
    tag: "Salud Mental",
    tagColor: "#007F2F",
  },
  {
    text: "Cada paso que das hacia el bienestar, aunque sea pequeño, cuenta. No estás solo.",
    author: "Equipo de Psicología Clínica",
    img: "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=900&h=500&fit=crop&auto=format",
    alt: "Grupo de estudiantes universitarios caminando y riendo juntos",
    tag: "Comunidad",
    tagColor: "#108900",
  },
  {
    text: "La inclusión no es adaptarse al mundo, es que el mundo se adapte a ti. Aquí te acompañamos.",
    author: "Programa de Inclusión Universitaria",
    img: "https://images.unsplash.com/photo-1619988076396-fd459750d033?w=900&h=500&fit=crop&auto=format",
    alt: "Detalle textil entrelazado simbolizando conexión e inclusión",
    tag: "Inclusión",
    tagColor: "#FFB400",
  },
  {
    text: "Pedir ayuda es el acto más valiente. Estamos aquí para acompañarte en cada momento.",
    author: "SIGABU — UCEVA",
    img: "https://images.unsplash.com/flagged/photo-1569744068983-6dfc2f27deb8?w=900&h=500&fit=crop&auto=format",
    alt: "Persona sentada en un muelle contemplando el agua al atardecer",
    tag: "Apoyo",
    tagColor: "#007F2F",
  },
  {
    text: "La diversidad de experiencias hace más rica a nuestra comunidad universitaria.",
    author: "Dirección de Bienestar",
    img: "https://images.unsplash.com/photo-1663162550938-60f70fab5d31?w=900&h=500&fit=crop&auto=format",
    alt: "Estudiantes caminando por el campus universitario",
    tag: "Diversidad",
    tagColor: "#FF005A",
  },
  {
    text: "Ninguna forma de violencia basada en género tiene cabida en nuestra comunidad. Aquí te escuchamos y te acompañamos con confidencialidad.",
    author: "Programa de Violencias de Género — SIGABU",
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&h=500&fit=crop&auto=format",
    alt: "Manos entrelazadas en señal de apoyo",
    tag: "Violencias de Género",
    tagColor: "#FF005A",
  },
  {
    text: "El equilibrio entre mente y cuerpo es el fundamento de una vida académica plena.",
    author: "Equipo de Bienestar UCEVA",
    img: "https://images.unsplash.com/photo-1519203854555-b06fc26f8888?w=900&h=500&fit=crop&auto=format",
    alt: "Persona sentada en un muelle sobre el agua en calma",
    tag: "Equilibrio",
    tagColor: "#108900",
  },
]

function statsByRole(role: Exclude<Role, "estudiante">) {
  if (role === "profesional") {
    return [
      {
        value: String(cases.filter((c) => c.estado === "activo").length),
        label: "Casos activos",
        color: "#007F2F",
      },
      {
        value: String(cases.filter((c) => c.riesgo === "alto").length),
        label: "Riesgo alto",
        color: "#FF005A",
      },
      {
        value: String(cases.filter((c) => c.estado === "seguimiento").length),
        label: "En seguimiento",
        color: "#FFB400",
      },
      {
        value: String(cases.filter((c) => c.estado === "cerrado").length),
        label: "Cerrados este mes",
        color: "#108900",
      },
    ]
  }
  if (role === "almacen") {
    return [
      {
        value: String(
          inventarioDonaciones.reduce((acc, i) => acc + i.cantidad, 0),
        ),
        label: "Mercados en stock",
        color: "#C2410C",
      },
      {
        value: String(
          solicitudesDonaciones.filter((s) => s.estado === "pendiente").length,
        ),
        label: "Solicitudes pendientes",
        color: "#2563eb",
      },
      {
        value: String(
          inventarioDonaciones.filter((i) => i.cantidad < 10).length,
        ),
        label: "Stock bajo",
        color: "#FF005A",
      },
      {
        value: String(
          despachosDonaciones.filter((d) => d.estado === "Entregado").length,
        ),
        label: "Entregas realizadas",
        color: "#007F2F",
      },
    ]
  }
  return [
    {
      value: String(sistemaUsuarios.length),
      label: "Usuarios del sistema",
      color: "#FF005A",
    },
    { value: String(cases.length), label: "Casos totales", color: "#007F2F" },
    { value: "4", label: "Módulos activos", color: "#2563eb" },
    { value: "4", label: "Registros de auditoría hoy", color: "#FFB400" },
  ]
}

export default function Home({ onNavigate, role }: HomeProps) {
  const config = homeConfigByRole[role]
  const stats = statsByRole(role)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Encadena el fundido: cancela cualquier transición pendiente antes de iniciar otra.
  const fadeTo = (next: (prev: number) => number, delay: number) => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    setIsTransitioning(true)
    fadeTimer.current = setTimeout(() => {
      setActiveSlide(next)
      setIsTransitioning(false)
    }, delay)
  }

  useEffect(() => {
    const timer = setInterval(
      () => fadeTo((prev) => (prev + 1) % quotes.length, 400),
      5500,
    )
    return () => {
      clearInterval(timer)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [])

  const goTo = (idx: number) => {
    if (idx === activeSlide) return
    fadeTo(() => idx, 300)
  }

  const q = quotes[activeSlide]

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches"

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
        title="Inicio · SIGABU"
        subtitle="Portal de Bienestar Universitario — UCEVA"
        actions={
          <button
            onClick={() =>
              onNavigate(config.quickLinks[0].view, config.quickLinks[0].extra)
            }
            className="btn-cta"
            style={{
              padding: "8px 18px",
              fontSize: "0.82rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ＋ {config.quickLinks[0].label}
          </button>
        }
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 32px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Saludo y stats rápidos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#007F2F",
              }}
            >
              {greeting}, {config.userName} 👋
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                color: "#6b7280",
                fontSize: "0.9rem",
              }}
            >
              {config.subtitle}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: "10px 18px",
                  textAlign: "center",
                  minWidth: 90,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#6b7280",
                    marginTop: 3,
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero carrusel motivacional */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            height: 380,
            background: "#1a1a1a",
            boxShadow: "0 8px 32px rgba(0,127,47,0.15)",
          }}
        >
          {/* Imagen de fondo */}
          <img
            src={q.img}
            alt={q.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isTransitioning ? 0 : 0.62,
              transition: "opacity 0.4s ease",
            }}
          />
          {/* Overlay gradiente */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(0,127,47,0.82) 0%, rgba(16,137,0,0.55) 50%, rgba(0,0,0,0.3) 100%)",
            }}
          />

          {/* Contenido */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "32px 40px",
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {/* Tag */}
            <span
              style={{
                display: "inline-block",
                width: "fit-content",
                background: q.tagColor,
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "3px 10px",
                borderRadius: 20,
                marginBottom: 14,
                textTransform: "uppercase",
              }}
            >
              {q.tag}
            </span>

            {/* Frase */}
            <blockquote
              style={{
                margin: 0,
                color: "#fff",
                fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
                fontWeight: 600,
                lineHeight: 1.45,
                maxWidth: 680,
                textShadow: "0 2px 12px rgba(0,0,0,0.35)",
              }}
            >
              "{q.text}"
            </blockquote>
            <p
              style={{
                margin: "12px 0 0",
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.82rem",
              }}
            >
              — {q.author}
            </p>
          </div>

          {/* Dots navegación */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 28,
              zIndex: 3,
              display: "flex",
              gap: 7,
            }}
          >
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeSlide ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background:
                    i === activeSlide ? "#8AFF00" : "rgba(255,255,255,0.45)",
                  transition: "width 0.3s ease, background 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Flechas prev/next */}
          <button
            onClick={() =>
              goTo((activeSlide - 1 + quotes.length) % quotes.length)
            }
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              borderRadius: 10,
              width: 36,
              height: 36,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            ‹
          </button>
          <button
            onClick={() => goTo((activeSlide + 1) % quotes.length)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              borderRadius: 10,
              width: 36,
              height: 36,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            ›
          </button>
        </div>

        {/* Accesos rápidos */}
        <div>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#2F2F30",
              letterSpacing: "0.01em",
            }}
          >
            Accesos rápidos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {config.quickLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view, link.extra)}
                style={{
                  background: "#fff",
                  border: `1.5px solid ${link.color}22`,
                  borderRadius: 14,
                  padding: "18px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition:
                    "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                  e.currentTarget.style.boxShadow = `0 8px 24px ${link.color}22`
                  e.currentTarget.style.borderColor = link.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"
                  e.currentTarget.style.borderColor = `${link.color}22`
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: link.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: "#2F2F30",
                    }}
                  >
                    {link.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginTop: 2,
                    }}
                  >
                    {link.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frase del día adicional + acceso al dashboard */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {/* Card inspiracional pequeña */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              minHeight: 200,
              background: "#1a3a1a",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=600&h=300&fit=crop&auto=format"
              alt="Árbol verde envuelto en niebla matinal"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,127,47,0.75), rgba(16,137,0,0.45))",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "28px 28px 24px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#8AFF00",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Reflexión del día
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  lineHeight: 1.55,
                }}
              >
                "No tienes que resolver todo hoy. Un paso a la vez es suficiente
                para avanzar."
              </p>
            </div>
          </div>

          {/* Card ir al dashboard */}
          <div
            style={{
              borderRadius: 16,
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              padding: "28px 28px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>📊</div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#2F2F30",
                }}
              >
                Panel de control
              </h3>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "0.82rem",
                  color: "#6b7280",
                  lineHeight: 1.5,
                }}
              >
                Consulta indicadores en tiempo real, alertas de riesgo y el
                resumen de actividad del sistema.
              </p>
            </div>
            <button
              onClick={() => onNavigate("dashboard")}
              className="btn-cta"
              style={{
                marginTop: 18,
                alignSelf: "flex-start",
                padding: "9px 20px",
                fontSize: "0.82rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Ir al Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
