import { useState } from "react"
import {
  donantes,
  inventarioDonaciones,
  solicitudesDonaciones,
  despachosDonaciones,
} from "../data/mockData"
import TopBar from "../components/TopBar"

interface DonacionesProps {
  onNavigate: (view: string) => void
  initialTab?: string
}

const validTabs = [
  "donantes",
  "inventario",
  "solicitudes",
  "despachos",
] as const
type DonacionesTab = typeof validTabs[number]

const ACCENT = "#C2410C"
const ACCENT_BG = "#fff2e8"

const prioridadColor: Record<string, string> = {
  alta: "#FF005A",
  media: "#FFB400",
  baja: "#007F2F",
}
const estadoColor: Record<string, string> = {
  pendiente: "#FFB400",
  aprobada: "#2563eb",
  entregada: "#007F2F",
  rechazada: "#9ca3af",
}

const REF_DATE = "2026-08-05"

export default function Donaciones({
  onNavigate,
  initialTab,
}: DonacionesProps) {
  const [tab, setTab] = useState<DonacionesTab>(
    validTabs.includes(initialTab as DonacionesTab)
      ? initialTab as DonacionesTab
      : "donantes",
  )
  const [showDonorForm, setShowDonorForm] = useState(false)
  const [asignando, setAsignando] = useState<string | null>(null)
  const [validando, setValidando] = useState<string | null>(null)
  const [validados, setValidados] = useState<Record<string, boolean>>({})

  const totalMercados = inventarioDonaciones.reduce(
    (acc, i) => acc + i.cantidad,
    0,
  )
  const stockBajoCount = inventarioDonaciones.filter(
    (i) => i.cantidad < 10,
  ).length
  const vencePronto = (fecha: string) => fecha <= "2026-08-25"
  const vencePronoCount = inventarioDonaciones.filter((i) =>
    vencePronto(i.fechaVencimiento),
  ).length
  const solicitudesPendientes = solicitudesDonaciones.filter(
    (s) => s.estado === "pendiente",
  ).length
  const entregadosMes = despachosDonaciones.filter(
    (d) => d.estado === "Entregado",
  ).length

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
        title="Ucevistas de Corazón · Donaciones Alimentarias"
        subtitle="Gestión y control de donaciones — Vicerrectoría de Bienestar Universitario"
        onClose={() => onNavigate("home")}
        actions={
          <button
            className="btn-cta"
            style={{
              padding: "8px 16px",
              fontSize: "0.82rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            📄 Informe de transparencia
          </button>
        }
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Panel segmentado del módulo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {[
            {
              label: "Mercados en stock",
              count: totalMercados,
              icon: "🧺",
              color: ACCENT,
            },
            {
              label: "Solicitudes pendientes",
              count: solicitudesPendientes,
              icon: "📋",
              color: "#2563eb",
            },
            {
              label: "Próximos a vencer",
              count: vencePronoCount,
              icon: "⏳",
              color: "#FF005A",
            },
            {
              label: "Entregas realizadas",
              count: entregadosMes,
              icon: "✅",
              color: "#007F2F",
            },
          ].map((t) => (
            <div
              key={t.label}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "16px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: t.color + "15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                {t.icon}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "#2F2F30",
                    lineHeight: 1,
                  }}
                >
                  {t.count}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                  {t.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: ACCENT_BG,
            border: `1px solid ${ACCENT}30`,
            borderRadius: 10,
            padding: "10px 16px",
            fontSize: "0.78rem",
            color: "#9a3412",
          }}
        >
          ℹ️ El inventario general de donaciones es visible para administración.
          La identidad de los estudiantes beneficiarios permanece restringida al
          personal autorizado de Bienestar (Habeas Data).
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            background: "#fff",
            borderRadius: 10,
            padding: 4,
            width: "fit-content",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          {([
            ["donantes", "🤝 Donantes y entradas"],
            ["inventario", "🧺 Inventario"],
            ["solicitudes", "🎓 Solicitudes"],
            ["despachos", "📦 Despachos"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "8px 18px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "all 0.15s",
                background: tab === id ? ACCENT : "transparent",
                color: tab === id ? "#fff" : "#6b7280",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Donantes */}
        {tab === "donantes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowDonorForm((v) => !v)}
                className="btn-cta"
                style={{
                  padding: "8px 16px",
                  fontSize: "0.82rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {showDonorForm ? "Cerrar formulario" : "+ Registrar donante"}
              </button>
            </div>

            {showDonorForm && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "18px 20px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: `1.5px solid ${ACCENT}`,
                }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    color: ACCENT,
                    margin: "0 0 14px",
                    fontSize: "0.9rem",
                  }}
                >
                  Nuevo donante
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                    marginBottom: 14,
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
                      Nombre o razón social
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del donante"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1.5px solid #e5e7eb",
                        borderRadius: 8,
                        fontSize: "0.875rem",
                        fontFamily: "inherit",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
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
                      Tipo de donante
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
                      <option>Interno — Docente</option>
                      <option>Interno — Administrativo</option>
                      <option>Interno — Estudiante</option>
                      <option>Externo — Empresa</option>
                      <option>Externo — Fundación</option>
                      <option>Externo — Egresado</option>
                    </select>
                  </div>
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.8rem",
                    color: "#374151",
                    marginBottom: 14,
                  }}
                >
                  <input type="checkbox" style={{ accentColor: ACCENT }} />{" "}
                  Donación anónima (no visibilizar institucionalmente)
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className="btn-cta"
                    style={{
                      padding: "9px 18px",
                      fontSize: "0.85rem",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                    onClick={() => setShowDonorForm(false)}
                  >
                    Registrar donante
                  </button>
                  <button
                    style={{
                      padding: "9px 16px",
                      fontSize: "0.85rem",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      background: "#fff",
                      color: "#374151",
                    }}
                    onClick={() => setShowDonorForm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    {[
                      "Donante",
                      "Tipo",
                      "Categoría",
                      "Total donado",
                      "Última donación",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "11px 16px",
                          textAlign: "left",
                          fontSize: "0.72rem",
                          color: "#6b7280",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {donantes.map((d, i) => (
                    <tr
                      key={d.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        background: i % 2 === 0 ? "#fff" : "#fafafa",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          color: "#2F2F30",
                        }}
                      >
                        {d.anonimo ? "🕶️ Donante anónimo" : d.nombre}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background:
                              d.tipo === "interno" ? "#eff6ff" : ACCENT_BG,
                            color: d.tipo === "interno" ? "#2563eb" : ACCENT,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                            textTransform: "capitalize",
                          }}
                        >
                          {d.tipo}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.8rem",
                          color: "#6b7280",
                        }}
                      >
                        {d.categoria}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#2F2F30",
                        }}
                      >
                        {d.totalDonado} mercados
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.8rem",
                          color: "#6b7280",
                        }}
                      >
                        {d.ultimaDonacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inventario */}
        {tab === "inventario" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {[
                    "Producto",
                    "Tipo",
                    "Lote",
                    "Cantidad",
                    "Ingreso",
                    "Vencimiento",
                    "Alertas",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 16px",
                        textAlign: "left",
                        fontSize: "0.72rem",
                        color: "#6b7280",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventarioDonaciones.map((it, i) => {
                  const bajo = it.cantidad < 10
                  const vence = vencePronto(it.fechaVencimiento)
                  return (
                    <tr
                      key={it.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        background: i % 2 === 0 ? "#fff" : "#fafafa",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          fontSize: "0.83rem",
                          color: "#2F2F30",
                          maxWidth: 220,
                        }}
                      >
                        {it.producto}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: ACCENT_BG,
                            color: ACCENT,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          {it.tipo}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.78rem",
                          color: "#6b7280",
                          fontFamily: "monospace",
                        }}
                      >
                        {it.lote}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: bajo ? "#FF005A" : "#2F2F30",
                        }}
                      >
                        {it.cantidad} {it.unidad}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.78rem",
                          color: "#6b7280",
                        }}
                      >
                        {it.fechaIngreso}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.78rem",
                          color: vence ? "#FF005A" : "#6b7280",
                          fontWeight: vence ? 700 : 400,
                        }}
                      >
                        {it.fechaVencimiento}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                        >
                          {bajo && (
                            <span
                              style={{
                                background: "#fff0f5",
                                color: "#FF005A",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                padding: "2px 7px",
                                borderRadius: 20,
                              }}
                            >
                              ⚠️ Stock bajo
                            </span>
                          )}
                          {vence && (
                            <span
                              style={{
                                background: "#fffbeb",
                                color: "#92400e",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                padding: "2px 7px",
                                borderRadius: 20,
                              }}
                            >
                              ⏳ Por vencer
                            </span>
                          )}
                          {!bajo && !vence && (
                            <span
                              style={{
                                background: "#f0fdf4",
                                color: "#15803d",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                padding: "2px 7px",
                                borderRadius: 20,
                              }}
                            >
                              ✓ Normal
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Solicitudes */}
        {tab === "solicitudes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {solicitudesDonaciones.map((s) => (
              <div
                key={s.id}
                className="module-card"
                style={{ padding: "16px 20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: "#2F2F30",
                        }}
                      >
                        {s.estudiante}
                      </span>
                      <span
                        style={{
                          background: prioridadColor[s.prioridad] + "18",
                          color: prioridadColor[s.prioridad],
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 20,
                          textTransform: "capitalize",
                        }}
                      >
                        Prioridad {s.prioridad}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      {s.programa} · Semestre {s.semestre} · Estrato {s.estrato}
                    </div>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: "0.8rem",
                        color: "#6b7280",
                        lineHeight: 1.5,
                        borderLeft: "2px solid #e5e7eb",
                        paddingLeft: 8,
                      }}
                    >
                      {s.situacion}
                    </p>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "#9ca3af",
                        marginTop: 8,
                      }}
                    >
                      📊 Ha recibido apoyo {s.vecesRecibido}{" "}
                      {s.vecesRecibido === 1 ? "vez" : "veces"} este periodo ·
                      Solicitado el {s.fechaSolicitud}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        background: estadoColor[s.estado] + "18",
                        color: estadoColor[s.estado],
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                        textTransform: "capitalize",
                      }}
                    >
                      {s.estado}
                    </span>
                    {s.estado === "pendiente" && (
                      <button
                        onClick={() =>
                          setAsignando(asignando === s.id ? null : s.id)
                        }
                        style={{
                          background: ACCENT,
                          color: "#fff",
                          border: "none",
                          padding: "7px 14px",
                          borderRadius: 8,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        {asignando === s.id ? "Cerrar" : "Asignar mercado"}
                      </button>
                    )}
                  </div>
                </div>
                {asignando === s.id && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px solid #f3f4f6",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <label
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#374151",
                          display: "block",
                          marginBottom: 5,
                        }}
                      >
                        Tipo de mercado a asignar
                      </label>
                      <select
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          border: "1.5px solid #e5e7eb",
                          borderRadius: 8,
                          fontSize: "0.82rem",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#fff",
                        }}
                      >
                        <option>Mercado Tipo A</option>
                        <option>Mercado Tipo B</option>
                        <option>Elemento suelto</option>
                      </select>
                    </div>
                    <button
                      className="btn-cta"
                      style={{
                        padding: "9px 18px",
                        fontSize: "0.8rem",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                      onClick={() => setAsignando(null)}
                    >
                      Confirmar asignación
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Despachos */}
        {tab === "despachos" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {[
                    "Solicitud",
                    "Fecha",
                    "Mercado",
                    "Método de validación",
                    "Estado",
                    "Acción",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 16px",
                        textAlign: "left",
                        fontSize: "0.72rem",
                        color: "#6b7280",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {despachosDonaciones.map((d, i) => {
                  const solicitud = solicitudesDonaciones.find(
                    (s) => s.id === d.solicitudId,
                  )
                  const yaValidado = d.estado === "Entregado" || validados[d.id]
                  return (
                    <tr
                      key={d.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        background: i % 2 === 0 ? "#fff" : "#fafafa",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          fontSize: "0.83rem",
                          color: "#2F2F30",
                        }}
                      >
                        {solicitud?.estudiante ?? d.solicitudId}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.78rem",
                          color: "#6b7280",
                        }}
                      >
                        {d.fecha}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: ACCENT_BG,
                            color: ACCENT,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          {d.tipoMercado}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "0.78rem",
                          color: "#6b7280",
                        }}
                      >
                        {d.metodoValidacion === "Código QR"
                          ? "📷"
                          : d.metodoValidacion === "Carné estudiantil"
                            ? "🪪"
                            : "✍️"}{" "}
                        {d.metodoValidacion}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: yaValidado ? "#f0fdf4" : "#fffbeb",
                            color: yaValidado ? "#15803d" : "#92400e",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {yaValidado ? "✓ Entregado" : "🕐 Programado"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {!yaValidado && (
                          <button
                            onClick={() => {
                              setValidando(d.id)
                              setTimeout(() => {
                                setValidados((v) => ({ ...v, [d.id]: true }))
                                setValidando(null)
                              }, 700)
                            }}
                            disabled={validando === d.id}
                            style={{
                              background: "#f3f4f6",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: 7,
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              cursor: validando === d.id ? "wait" : "pointer",
                              fontFamily: "inherit",
                              color: "#374151",
                            }}
                          >
                            {validando === d.id
                              ? "📷 Validando…"
                              : "Validar en punto"}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
