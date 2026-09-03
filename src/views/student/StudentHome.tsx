import { useState, useEffect, useRef } from "react"

interface StudentHomeProps {
  onNavigate: (view: string) => void
}

const quotes = [
  {
    text: "Pedir ayuda es un acto de valentía. Estamos aquí para acompañarte en cada paso.",
    tag: "Bienestar",
    tagColor: "#007F2F",
    img: "https://images.unsplash.com/photo-1421790500381-fc9b5996f343?w=1000&h=460&fit=crop&auto=format",
    alt: "Río tranquilo entre árboles verdes",
  },
  {
    text: "Tu salud mental importa tanto como tus notas. No tienes que cargarlo todo solo.",
    tag: "Salud Mental",
    tagColor: "#108900",
    img: "https://images.unsplash.com/photo-1519203854555-b06fc26f8888?w=1000&h=460&fit=crop&auto=format",
    alt: "Persona sentada en un muelle sobre un lago en calma",
  },
  {
    text: "Cada persona aprende diferente. La inclusión es nuestro compromiso contigo.",
    tag: "Inclusión",
    tagColor: "#FFB400",
    img: "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=1000&h=460&fit=crop&auto=format",
    alt: "Estudiantes universitarios caminando y riendo juntos",
  },
  {
    text: "Un momento de pausa puede cambiar todo. Date permiso de descansar.",
    tag: "Autocuidado",
    tagColor: "#007F2F",
    img: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1000&h=460&fit=crop&auto=format",
    alt: "Árbol en medio de la niebla matinal, sensación de calma",
  },
]

const services = [
  {
    icon: "🗓️",
    title: "Solicitar cita",
    desc: "Agenda una sesión con psicología o trabajo social. Rápido y confidencial.",
    view: "student_cita",
    color: "#007F2F",
    bg: "#e6f4ec",
    cta: "Solicitar ahora",
  },
  {
    icon: "📋",
    title: "Mis citas",
    desc: "Consulta el estado de tus solicitudes y el historial de tus sesiones.",
    view: "student_mis_citas",
    color: "#FFB400",
    bg: "#fff9e6",
    cta: "Ver mis citas",
  },
  {
    icon: "📚",
    title: "Recursos de bienestar",
    desc: "Material psicoeducativo, talleres, guías de manejo del estrés y más.",
    view: "student_recursos",
    color: "#108900",
    bg: "#f0fdf4",
    cta: "Explorar recursos",
  },
  {
    icon: "🛡️",
    title: "Reportar una situación",
    desc: "Reporta de forma confidencial una situación de violencia basada en género.",
    view: "student_reportar_vbg",
    color: "#FF005A",
    bg: "#fff0f5",
    cta: "Reportar ahora",
  },
  {
    icon: "🧺",
    title: "Apoyo alimentario",
    desc: "Solicita un mercado de Ucevistas de Corazón si te encuentras en situación de vulnerabilidad.",
    view: "student_donaciones",
    color: "#C2410C",
    bg: "#fff2e8",
    cta: "Solicitar apoyo",
  },
]

const tips = [
  {
    emoji: "🌬️",
    tip: "Respira profundo: inhala 4 segundos, retén 4, exhala 4. Repítelo 3 veces.",
  },
  {
    emoji: "🚶",
    tip: "Una caminata de 10 minutos al aire libre reduce el cortisol significativamente.",
  },
  {
    emoji: "💤",
    tip: "Dormir 7-8 horas mejora la concentración y la memoria a largo plazo.",
  },
  {
    emoji: "📵",
    tip: "Desconéctate de pantallas 30 min antes de dormir para un sueño más profundo.",
  },
  {
    emoji: "🤝",
    tip: "Hablar con alguien de confianza sobre lo que sientes alivia la carga emocional.",
  },
]

export default function StudentHome({ onNavigate }: StudentHomeProps) {
  const [slide, setSlide] = useState(0)
  const [fading, setFading] = useState(false)
  const [tipIdx, setTipIdx] = useState(0)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Encadena el fundido: cancela cualquier transición pendiente antes de iniciar otra.
  const fadeTo = (next: (p: number) => number, delay: number) => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    setFading(true)
    fadeTimer.current = setTimeout(() => {
      setSlide(next)
      setFading(false)
    }, delay)
  }

  useEffect(() => {
    const t = setInterval(
      () => fadeTo((p) => (p + 1) % quotes.length, 350),
      5500,
    )
    return () => {
      clearInterval(t)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTipIdx((p) => (p + 1) % tips.length), 4000)
    return () => clearInterval(t)
  }, [])

  const q = quotes[slide]
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
        background: "#F7F9F8",
      }}
    >
      {/* Header interno */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#007F2F",
            }}
          >
            {greeting}, Juan 👋
          </h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#9ca3af" }}>
            Ingeniería de Sistemas · Semestre 6
          </p>
        </div>
        <button
          onClick={() => onNavigate("student_cita")}
          className="btn-cta"
          style={{
            padding: "9px 20px",
            fontSize: "0.82rem",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          🗓️ Solicitar cita
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 28px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Carrusel motivacional */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            height: 340,
            background: "#1a2e1a",
            boxShadow: "0 6px 28px rgba(0,127,47,0.18)",
          }}
        >
          <img
            src={q.img}
            alt={q.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: fading ? 0 : 0.55,
              transition: "opacity 0.35s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(0,80,20,0.88) 0%, rgba(0,127,47,0.55) 55%, rgba(0,0,0,0.25) 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "28px 36px",
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "fit-content",
                background: q.tagColor,
                color: "#fff",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "3px 10px",
                borderRadius: 20,
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              {q.tag}
            </span>
            <blockquote
              style={{
                margin: 0,
                color: "#fff",
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                fontWeight: 600,
                lineHeight: 1.5,
                maxWidth: 620,
                textShadow: "0 2px 10px rgba(0,0,0,0.4)",
              }}
            >
              "{q.text}"
            </blockquote>
            <p
              style={{
                margin: "10px 0 0",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.78rem",
              }}
            >
              — Bienestar Universitario UCEVA
            </p>
          </div>

          {/* Dots */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              right: 24,
              zIndex: 3,
              display: "flex",
              gap: 6,
            }}
          >
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== slide) fadeTo(() => i, 300)
                }}
                style={{
                  width: i === slide ? 20 : 7,
                  height: 7,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background: i === slide ? "#8AFF00" : "rgba(255,255,255,0.4)",
                  transition: "width 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Prev/Next */}
          {["‹", "›"].map((ch, i) => (
            <button
              key={ch}
              onClick={() =>
                fadeTo(
                  (p) =>
                    i === 0
                      ? (p - 1 + quotes.length) % quotes.length
                      : (p + 1) % quotes.length,
                  300,
                )
              }
              style={{
                position: "absolute",
                [i === 0 ? "left" : "right"]: 14,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 3,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                borderRadius: 9,
                width: 34,
                height: 34,
                cursor: "pointer",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Servicios */}
        <div>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#2F2F30",
            }}
          >
            ¿Qué necesitas hoy?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {services.map((s) => (
              <div
                key={s.title}
                style={{
                  background: "#fff",
                  border: `1.5px solid ${s.color}1a`,
                  borderRadius: 16,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: s.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "#2F2F30",
                      marginBottom: 4,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#6b7280",
                      lineHeight: 1.55,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(s.view)}
                  style={{
                    marginTop: "auto",
                    padding: "9px 0",
                    border: `1.5px solid ${s.color}`,
                    borderRadius: 9,
                    background: "transparent",
                    color: s.color,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.color
                    e.currentTarget.style.color = "#fff"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.color = s.color
                  }}
                >
                  {s.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tip del día + Línea de atención */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {/* Tip rotativo */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: 16,
              padding: "22px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#007F2F",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              💡 Consejo de bienestar
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                minHeight: 60,
              }}
            >
              <span
                style={{ fontSize: "1.8rem", lineHeight: 1, flexShrink: 0 }}
              >
                {tips[tipIdx].emoji}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#374151",
                  lineHeight: 1.6,
                  transition: "opacity 0.3s",
                }}
              >
                {tips[tipIdx].tip}
              </p>
            </div>
            <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
              {tips.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    flex: 1,
                    borderRadius: 2,
                    background: i === tipIdx ? "#007F2F" : "#e5e7eb",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Línea de apoyo */}
          <div
            style={{
              background: "linear-gradient(135deg, #007F2F, #004d1c)",
              borderRadius: 16,
              padding: "22px",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#8AFF00",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                🆘 ¿Necesitas ayuda urgente?
              </div>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  lineHeight: 1.45,
                }}
              >
                Si estás en una situación de crisis emocional, no estás solo.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.5,
                }}
              >
                Línea 106 — atención gratuita las 24 horas, los 7 días de la
                semana.
              </p>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <div
                style={{
                  background: "rgba(138,255,0,0.15)",
                  border: "1px solid rgba(138,255,0,0.3)",
                  borderRadius: 8,
                  padding: "8px 14px",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#8AFF00",
                  }}
                >
                  106
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Crisis emocional
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  padding: "8px 14px",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <div
                  style={{ fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}
                >
                  Bienestar UCEVA
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Lun–Vie 8am–5pm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
