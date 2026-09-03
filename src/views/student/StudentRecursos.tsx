import { useState } from "react"

interface StudentRecursosProps {
  onNavigate: (view: string) => void
}

const categorias = [
  "Todos",
  "Ansiedad",
  "Estrés académico",
  "Autoestima",
  "Sueño",
  "Relaciones",
  "Inclusión",
]

const recursos = [
  {
    id: 1,
    titulo: "Manejo de la ansiedad en época de exámenes",
    tipo: "Guía PDF",
    icono: "📄",
    categoria: "Ansiedad",
    duracion: "15 min de lectura",
    desc: "Técnicas prácticas de respiración, reestructuración cognitiva y organización del tiempo para reducir la ansiedad antes de los exámenes.",
    color: "#007F2F",
    bg: "#e6f4ec",
  },
  {
    id: 2,
    titulo: "Taller: Regulación emocional para universitarios",
    tipo: "Video",
    icono: "🎬",
    categoria: "Estrés académico",
    duracion: "28 min",
    desc: "Aprende a identificar y gestionar tus emociones en momentos de alta demanda académica con ejercicios prácticos.",
    color: "#FF005A",
    bg: "#fff0f5",
  },
  {
    id: 3,
    titulo: "Guía de hábitos de sueño saludable",
    tipo: "Infografía",
    icono: "🖼️",
    categoria: "Sueño",
    duracion: "5 min de lectura",
    desc: "Cómo mejorar la calidad del sueño: rutinas, higiene del sueño y qué evitar antes de dormir.",
    color: "#108900",
    bg: "#f0fdf4",
  },
  {
    id: 4,
    titulo: "Construyendo relaciones saludables en la universidad",
    tipo: "Guía PDF",
    icono: "📄",
    categoria: "Relaciones",
    duracion: "20 min de lectura",
    desc: "Comunicación asertiva, límites personales y cómo manejar conflictos en entornos universitarios.",
    color: "#FFB400",
    bg: "#fff9e6",
  },
  {
    id: 5,
    titulo: "Meditación guiada para la concentración",
    tipo: "Audio",
    icono: "🎧",
    categoria: "Estrés académico",
    duracion: "12 min",
    desc: "Sesión de mindfulness diseñada para estudiantes universitarios que necesitan mejorar la concentración.",
    color: "#007F2F",
    bg: "#e6f4ec",
  },
  {
    id: 6,
    titulo: "Fortaleciendo tu autoestima: guía para estudiantes",
    tipo: "Guía PDF",
    icono: "📄",
    categoria: "Autoestima",
    duracion: "18 min de lectura",
    desc: "Ejercicios de autocompasión, reconocimiento de fortalezas y manejo del síndrome del impostor en el ámbito académico.",
    color: "#FF005A",
    bg: "#fff0f5",
  },
  {
    id: 7,
    titulo: "Derechos y apoyos para estudiantes con discapacidad",
    tipo: "Guía PDF",
    icono: "📄",
    categoria: "Inclusión",
    duracion: "10 min de lectura",
    desc: "Conoce tus derechos, los ajustes razonables disponibles en la UCEVA y cómo solicitarlos.",
    color: "#108900",
    bg: "#f0fdf4",
  },
  {
    id: 8,
    titulo: "Técnicas de estudio efectivas: método Pomodoro y más",
    tipo: "Video",
    icono: "🎬",
    categoria: "Estrés académico",
    duracion: "22 min",
    desc: "Aprende estrategias de estudio basadas en evidencia para mejorar tu rendimiento académico.",
    color: "#FFB400",
    bg: "#fff9e6",
  },
]

export default function StudentRecursos({ onNavigate }: StudentRecursosProps) {
  const [catActiva, setCatActiva] = useState("Todos")
  const [busqueda, setBusqueda] = useState("")

  const filtrados = recursos.filter((r) => {
    const matchCat = catActiva === "Todos" || r.categoria === catActiva
    const matchBusq =
      busqueda === "" ||
      r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.desc.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchBusq
  })

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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#2F2F30",
              }}
            >
              Recursos de bienestar
            </h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
              Material psicoeducativo gratuito para tu salud mental
            </p>
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
            }}
          >
            ×
          </button>
        </div>

        {/* Búsqueda */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              fontSize: "0.9rem",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar recursos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px 9px 34px",
              border: "1.5px solid #e5e7eb",
              borderRadius: 9,
              fontSize: "0.85rem",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
              color: "#2F2F30",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007F2F"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb"
            }}
          />
        </div>

        {/* Categorías */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatActiva(cat)}
              style={{
                padding: "5px 14px",
                borderRadius: 20,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.78rem",
                fontWeight: catActiva === cat ? 700 : 500,
                border: `1.5px solid ${
                  catActiva === cat ? "#007F2F" : "#e5e7eb"
                }`,
                background: catActiva === cat ? "#007F2F" : "#fff",
                color: catActiva === cat ? "#fff" : "#374151",
                transition: "all 0.12s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 40px" }}>
        {filtrados.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>📭</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              No se encontraron recursos
            </div>
            <div style={{ fontSize: "0.8rem", marginTop: 4 }}>
              Prueba con otra búsqueda o categoría
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {filtrados.map((r) => (
              <div
                key={r.id}
                style={{
                  background: "#fff",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                {/* Banner */}
                <div
                  style={{
                    height: 80,
                    background: `linear-gradient(135deg, ${r.color}22, ${r.color}0a)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 16px",
                    borderBottom: `2px solid ${r.color}18`,
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{r.icono}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        background: r.bg,
                        color: r.color,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 20,
                      }}
                    >
                      {r.tipo}
                    </span>
                    <span style={{ fontSize: "0.67rem", color: "#9ca3af" }}>
                      {r.duracion}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div
                  style={{
                    padding: "16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: r.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {r.categoria}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#2F2F30",
                      lineHeight: 1.4,
                    }}
                  >
                    {r.titulo}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.78rem",
                      color: "#6b7280",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {r.desc}
                  </p>
                  <button
                    style={{
                      marginTop: 8,
                      padding: "9px 0",
                      border: `1.5px solid ${r.color}`,
                      borderRadius: 9,
                      background: "transparent",
                      color: r.color,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = r.color
                      e.currentTarget.style.color = "#fff"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                      e.currentTarget.style.color = r.color
                    }}
                  >
                    {r.tipo === "Video" || r.tipo === "Audio"
                      ? "▶ Ver recurso"
                      : "↓ Descargar recurso"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banner ayuda profesional */}
        <div
          style={{
            marginTop: 28,
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            border: "1.5px solid #bbf7d0",
            borderRadius: 16,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>💬</div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.92rem",
                color: "#007F2F",
                marginBottom: 4,
              }}
            >
              ¿Quieres hablar con un profesional?
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#374151", lineHeight: 1.55 }}
            >
              Los recursos son un buen comienzo, pero si sientes que necesitas
              más apoyo, solicita una cita. Estamos para acompañarte.
            </div>
          </div>
          <button
            onClick={() => onNavigate("student_cita")}
            className="btn-cta"
            style={{
              padding: "10px 20px",
              fontSize: "0.82rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            Solicitar cita
          </button>
        </div>
      </div>
    </div>
  )
}
