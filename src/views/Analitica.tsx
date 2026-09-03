import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { analyticsData } from "../data/mockData"
import TopBar from "../components/TopBar"

interface AnaliticaProps {
  onNavigate: (view: string) => void
}

export default function Analitica({ onNavigate }: AnaliticaProps) {
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
        title="Analítica Institucional"
        subtitle="Indicadores de gestión · Vicerrectoría de Bienestar Universitario"
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
            📄 Exportar reporte
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
          gap: 20,
        }}
      >
        {/* KPI row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
          }}
        >
          {[
            {
              label: "Total casos 2026",
              value: "85",
              icon: "📋",
              delta: "+18%",
              color: "#007F2F",
            },
            {
              label: "Casos VBG activos",
              value: "27",
              icon: "🛡️",
              delta: "+6% vs mes anterior",
              color: "#FF005A",
            },
            {
              label: "Promedio sesiones/caso",
              value: "9.4",
              icon: "🗓️",
              delta: "+1.2",
              color: "#2563eb",
            },
            {
              label: "Tasa de adherencia",
              value: "87%",
              icon: "✅",
              delta: "+4%",
              color: "#007F2F",
            },
            {
              label: "Alertas IA generadas",
              value: "32",
              icon: "🤖",
              delta: "Este semestre",
              color: "#FFB400",
            },
            {
              label: "Casos cerrados",
              value: "51",
              icon: "🏁",
              delta: "60% del total",
              color: "#9ca3af",
            },
          ].map((k) => (
            <div
              key={k.label}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "16px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                {k.icon}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  color: "#2F2F30",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                {k.value}
              </div>
              <div
                style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 3 }}
              >
                {k.label}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: k.color,
                  fontWeight: 600,
                  marginTop: 5,
                }}
              >
                {k.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {/* Cases by month */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#2F2F30",
                margin: "0 0 16px",
              }}
            >
              Casos registrados por mes
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={analyticsData.casosPorMes}>
                <defs>
                  <linearGradient id="smGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007F2F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007F2F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="iuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="vbgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF005A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#FF005A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontSize: "0.8rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Area
                  type="monotone"
                  dataKey="saludMental"
                  name="Salud Mental"
                  stroke="#007F2F"
                  strokeWidth={2.5}
                  fill="url(#smGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="inclusion"
                  name="Inclusión"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#iuGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="vbg"
                  name="Violencias de Género"
                  stroke="#FF005A"
                  strokeWidth={2.5}
                  fill="url(#vbgGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Risk distribution */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#2F2F30",
                margin: "0 0 16px",
              }}
            >
              Distribución por nivel de riesgo
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <ResponsiveContainer width={180} height={220}>
                <PieChart>
                  <Pie
                    data={analyticsData.distribucionRiesgo}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {analyticsData.distribucionRiesgo.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "none",
                      fontSize: "0.8rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {analyticsData.distribucionRiesgo.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: item.color,
                        }}
                      />
                      <span style={{ fontSize: "0.82rem", color: "#374151" }}>
                        {item.name}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 80,
                          height: 6,
                          borderRadius: 3,
                          background: "#f3f4f6",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            background: item.color,
                            width: `${(item.value / 85) * 100}%`,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2F2F30",
                          width: 24,
                          textAlign: "right",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {/* Cases by program */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#2F2F30",
                margin: "0 0 16px",
              }}
            >
              Casos por programa académico
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={analyticsData.distribucionPrograma}
                layout="vertical"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="programa"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    fontSize: "0.8rem",
                  }}
                />
                <Bar
                  dataKey="casos"
                  name="Casos"
                  fill="#007F2F"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly state */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#2F2F30",
                margin: "0 0 16px",
              }}
            >
              Estado de casos por semana
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={analyticsData.estadoSemanal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="semana"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    fontSize: "0.8rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Bar
                  dataKey="abiertos"
                  name="Nuevos"
                  fill="#007F2F"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="seguimiento"
                  name="Seguimiento"
                  fill="#FFB400"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="cerrados"
                  name="Cerrados"
                  fill="#9ca3af"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IA insights */}
        <div
          style={{
            background: "linear-gradient(135deg, #002e11, #004d1c)",
            borderRadius: 12,
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>🤖</span>
            <h3
              style={{
                color: "#8AFF00",
                fontWeight: 700,
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              Insights de Inteligencia Institucional
            </h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {[
              {
                title: "Tendencia emergente",
                text: "Incremento del 38% en casos de ansiedad en estudiantes de semestres 4-6. Mayor concentración en programas de salud y ciencias.",
                icon: "📈",
              },
              {
                title: "Población prioritaria",
                text: "Estudiantes de primer semestre presentan mayor riesgo de deserción asociado a factores psicosociales. Recomendación: intervención preventiva temprana.",
                icon: "🎯",
              },
              {
                title: "Eficiencia del servicio",
                text: "El tiempo promedio entre apertura de caso y primera sesión se redujo de 5 a 2.3 días en el último mes. La tasa de adherencia supera el estándar nacional.",
                icon: "⚡",
              },
              {
                title: "Violencias de Género",
                text: "El acoso sexual y la violencia psicológica concentran el 65% de los reportes VBG. La IA sugiere reforzar campañas de prevención en programas con mayor incidencia.",
                icon: "🛡️",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "rgba(138,255,0,0.06)",
                  border: "1px solid rgba(138,255,0,0.15)",
                  borderRadius: 10,
                  padding: "16px",
                }}
              >
                <div style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                  {item.icon}
                </div>
                <div
                  style={{
                    color: "#8AFF00",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.78rem",
                    lineHeight: 1.55,
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
