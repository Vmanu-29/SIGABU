import { useState } from "react"
import logoUceva from "../assets/logo-uceva.png"
import logoSibeMark from "../assets/logo-sibe-mark.png"

export type LoginRole = "estudiante" | "profesional" | "almacen" | "admin"

interface LoginProps {
  onLogin: (role: LoginRole) => void
}

const roleOptions: {
  id: LoginRole
  icon: string
  label: string
  desc: string
  email: string
}[] = [
  {
    id: "estudiante",
    icon: "🎓",
    label: "Estudiante",
    desc: "Solicitar servicios de bienestar",
    email: "juan.perez@uceva.edu.co",
  },
  {
    id: "profesional",
    icon: "🩺",
    label: "Profesional de Bienestar",
    desc: "Psicología, trabajo social e inclusión",
    email: "carolina.restrepo@uceva.edu.co",
  },
  {
    id: "almacen",
    icon: "🧺",
    label: "Personal de Almacén",
    desc: "Ucevistas de Corazón — donaciones",
    email: "andres.gomez@uceva.edu.co",
  },
  {
    id: "admin",
    icon: "⚙️",
    label: "Administrador del Sistema",
    desc: "Usuarios, parametrización y auditoría",
    email: "laura.fernandez@uceva.edu.co",
  },
]

export default function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<LoginRole | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const selected = roleOptions.find((r) => r.id === role)

  const handleSelectRole = (r: LoginRole) => {
    setRole(r)
    setEmail(roleOptions.find((o) => o.id === r)?.email ?? "")
    setPassword("••••••••")
  }

  const handleSubmit = () => {
    if (role) onLogin(role)
  }

  return (
    <div
      className="login-shell"
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#F7F9F8",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Panel izquierdo */}
      <div
        className="login-info"
        style={{
          flex: 1,
          background:
            "linear-gradient(160deg, #007F2F 0%, #004d1c 50%, #002e11 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(138,255,0,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: "20%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(255,180,0,0.04)",
          }}
        />

        <div style={{ marginBottom: 52 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "6px 20px 20px 6px",
              padding: "10px 20px 10px 12px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <img
              src={logoUceva}
              alt="UCEVA - Unidad Central del Valle del Cauca"
              style={{ height: 44, width: "auto", display: "block" }}
            />
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: 10,
            }}
          >
            Vicerrectoría de Bienestar
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(138,255,0,0.1)",
            border: "1px solid rgba(138,255,0,0.2)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: 20,
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#8AFF00",
            }}
          />
          <span
            style={{ color: "#8AFF00", fontSize: "0.75rem", fontWeight: 600 }}
          >
            Sistema Institucional
          </span>
        </div>

        <h2
          style={{
            color: "#ffffff",
            fontSize: "2.2rem",
            fontWeight: 800,
            lineHeight: 1.15,
            margin: "0 0 18px",
            letterSpacing: "-0.5px",
          }}
        >
          SIGABU
          <br />
          <span style={{ color: "#8AFF00" }}>Bienestar Universitario</span>
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "0.95rem",
            lineHeight: 1.65,
            marginBottom: 40,
            maxWidth: 380,
          }}
        >
          Tu portal de bienestar en la UCEVA. Solicita acompañamiento
          psicológico, apoyos de inclusión y accede a recursos de salud mental.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              icon: "🗓️",
              label: "Solicita tu cita",
              desc: "Psicología y acompañamiento emocional",
            },
            {
              icon: "♿",
              label: "Apoyos de inclusión",
              desc: "Caracterización y ajustes razonables",
            },
            {
              icon: "📚",
              label: "Recursos de bienestar",
              desc: "Material psicoeducativo gratuito",
            },
            {
              icon: "🔒",
              label: "Confidencial",
              desc: "Tu información está protegida",
            },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 16px",
              }}
            >
              <div style={{ fontSize: "1.4rem", flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.73rem",
                  }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho */}
      <div
        className="login-form-panel"
        style={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 52px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
            paddingBottom: 22,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <img
            src={logoSibeMark}
            alt="SIBE"
            style={{ height: 52, width: "auto", display: "block" }}
          />
          <div
            style={{
              width: 1,
              height: 38,
              background: "#e5e7eb",
              flexShrink: 0,
            }}
          />
          <div style={{ lineHeight: 1.3 }}>
            <div
              style={{
                fontWeight: 800,
                fontSize: "0.82rem",
                color: "#0d1550",
                letterSpacing: "0.03em",
              }}
            >
              SISTEMA DE
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "0.82rem",
                color: "#0d1550",
                letterSpacing: "0.03em",
              }}
            >
              BIENESTAR
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "0.82rem",
                color: "#0d1550",
                letterSpacing: "0.03em",
              }}
            >
              UNIVERSITARIO
            </div>
          </div>
        </div>
        <h3
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#2F2F30",
            margin: "0 0 6px",
            letterSpacing: "-0.3px",
          }}
        >
          Bienvenido/a
        </h3>
        <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: 28 }}>
          Selecciona cómo vas a ingresar al sistema
        </p>

        {/* Selector de rol */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {roleOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => handleSelectRole(o.id)}
              style={{
                padding: "14px 10px",
                borderRadius: 12,
                border: `2px solid ${role === o.id ? "#007F2F" : "#e5e7eb"}`,
                background: role === o.id ? "#f0fdf4" : "#fafafa",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.18s",
                fontFamily: "inherit",
              }}
            >
              <div style={{ fontSize: "1.7rem", marginBottom: 5 }}>
                {o.icon}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: role === o.id ? "#007F2F" : "#2F2F30",
                  lineHeight: 1.25,
                }}
              >
                {o.label}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#9ca3af",
                  marginTop: 3,
                  lineHeight: 1.3,
                }}
              >
                {o.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Formulario */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: 6,
              }}
            >
              Correo institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                role === "estudiante"
                  ? "codigo@uceva.edu.co"
                  : "nombre@uceva.edu.co"
              }
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                fontSize: "0.9rem",
                color: "#2F2F30",
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007F2F"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb"
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: 6,
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                fontSize: "0.9rem",
                color: "#2F2F30",
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007F2F"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb"
              }}
            />
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <a
                href="#"
                style={{
                  fontSize: "0.78rem",
                  color: "#007F2F",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!role}
            className="btn-cta"
            style={{
              width: "100%",
              padding: "13px",
              fontSize: "0.95rem",
              border: "none",
              cursor: role ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              opacity: role ? 1 : 0.45,
            }}
          >
            {selected
              ? `${selected.icon} Ingresar como ${selected.label}`
              : "Selecciona tu perfil para continuar"}
          </button>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: "14px",
            background: "#f0fdf4",
            borderRadius: 10,
            border: "1px solid #bbf7d0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.77rem",
              color: "#15803d",
              lineHeight: 1.5,
            }}
          >
            <strong>Confidencialidad garantizada.</strong> La información que
            compartas será tratada con reserva profesional conforme a las
            políticas institucionales de la UCEVA.
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          ¿Problemas de acceso?{" "}
          <a
            href="mailto:bienestar@uceva.edu.co"
            style={{ color: "#007F2F", textDecoration: "none" }}
          >
            bienestar@uceva.edu.co
          </a>
        </p>
      </div>
    </div>
  )
}
