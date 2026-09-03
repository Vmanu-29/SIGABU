export type CaseStatus = "activo" | "seguimiento" | "cerrado" | "pendiente"
export type CaseModule = "salud_mental" | "inclusion" | "vbg"
export type RiskLevel = "alto" | "medio" | "bajo"

export interface Case {
  id: string
  codigo: string
  nombre: string
  documento: string
  programa: string
  semestre: number
  modulo: CaseModule
  estado: CaseStatus
  riesgo: RiskLevel
  fechaApertura: string
  ultimaActuacion: string
  profesional: string
  motivo: string
  sesiones: number
  proximaCita?: string
  tipoViolencia?: string
  desistido?: boolean
}

export const tiposViolencia = [
  "Física",
  "Psicológica",
  "Sexual",
  "Económica",
  "Patrimonial",
  "Digital",
  "Acoso laboral",
  "Acoso sexual",
]

export const rutasAtencionVBG = [
  {
    id: "r1",
    nombre: "Ruta de atención en crisis y primeros auxilios psicológicos",
    activadaPor: "Riesgo alto o situación de urgencia",
  },
  {
    id: "r2",
    nombre: "Ruta de acompañamiento psicosocial y jurídico",
    activadaPor: "Violencia física, sexual o patrimonial",
  },
  {
    id: "r3",
    nombre: "Ruta de proceso disciplinario institucional",
    activadaPor: "Presunto responsable vinculado a la comunidad UCEVA",
  },
  {
    id: "r4",
    nombre: "Ruta de remisión a entidades externas (Comisaría, Fiscalía, ICBF)",
    activadaPor: "Hechos que requieren denuncia ante autoridad competente",
  },
]

export const moduleMeta: Record<CaseModule, {
  label: string
  icon: string
  color: string
  bg: string
}> = {
  salud_mental: {
    label: "Salud Mental",
    icon: "🧠",
    color: "#007F2F",
    bg: "#e6f4ec",
  },
  inclusion: {
    label: "Inclusión",
    icon: "♿",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  vbg: {
    label: "Violencias de Género",
    icon: "🛡️",
    color: "#FF005A",
    bg: "#fff0f5",
  },
}

export const marcoNormativoVBG = [
  "Ley 1257 de 2008 — Sensibilización, prevención y sanción de formas de violencia contra la mujer",
  "Ley 1719 de 2014 — Acceso a la justicia de víctimas de violencia sexual",
  "Ley 2087 de 2021 — Prevención y atención del acoso sexual en el ámbito educativo",
  "Protocolo institucional de prevención y atención de violencias basadas en género — UCEVA",
]

export interface Professional {
  id: string
  nombre: string
  cargo: string
  area: string
  casos: number
  avatar: string
}

export const professionals: Professional[] = [
  {
    id: "p1",
    nombre: "Dra. Carolina Restrepo",
    cargo: "Psicóloga",
    area: "Salud Mental",
    casos: 24,
    avatar: "CR",
  },
  {
    id: "p2",
    nombre: "Dr. Felipe Ángel",
    cargo: "Psicólogo",
    area: "Salud Mental",
    casos: 18,
    avatar: "FA",
  },
  {
    id: "p3",
    nombre: "Lic. Marcela Torres",
    cargo: "Trabajadora Social",
    area: "Inclusión",
    casos: 31,
    avatar: "MT",
  },
  {
    id: "p4",
    nombre: "Dr. Andrés Castaño",
    cargo: "Orientador",
    area: "Inclusión",
    casos: 15,
    avatar: "AC",
  },
  {
    id: "p5",
    nombre: "Dra. Isabela Cárdenas",
    cargo: "Coordinadora VBG",
    area: "Violencias de Género",
    casos: 14,
    avatar: "IC",
  },
  {
    id: "p6",
    nombre: "Lic. Paula Escobar",
    cargo: "Abogada · Trabajadora Social",
    area: "Violencias de Género",
    casos: 9,
    avatar: "PE",
  },
]

// ── Roles del sistema (usuarios.pdf) ──
// 1. Estudiante / Usuario de la comunidad educativa → portal aparte (StudentSidebar)
// 2. Profesional de Bienestar · 3. Personal de Almacén · 4. Administrador del Sistema
export type SystemRole = "profesional" | "almacen" | "admin"

export interface SistemaUsuario {
  id: string
  nombre: string
  cargo: string
  area: string
  rol: SystemRole
  correo: string
  tareas: number
  avatar: string
}

export const rolLabel: Record<SystemRole, string> = {
  profesional: "Profesional de Bienestar",
  almacen: "Personal de Almacén",
  admin: "Administrador del Sistema",
}

export const rolColor: Record<SystemRole, string> = {
  profesional: "#007F2F",
  almacen: "#C2410C",
  admin: "#FF005A",
}

export const sistemaUsuarios: SistemaUsuario[] = [
  {
    id: "u1",
    nombre: "Dra. Carolina Restrepo",
    cargo: "Psicóloga",
    area: "Salud Mental",
    rol: "profesional",
    correo: "carolina.restrepo@uceva.edu.co",
    tareas: 24,
    avatar: "CR",
  },
  {
    id: "u2",
    nombre: "Dr. Felipe Ángel",
    cargo: "Psicólogo",
    area: "Salud Mental",
    rol: "profesional",
    correo: "felipe.angel@uceva.edu.co",
    tareas: 18,
    avatar: "FA",
  },
  {
    id: "u3",
    nombre: "Lic. Marcela Torres",
    cargo: "Trabajadora Social",
    area: "Inclusión",
    rol: "profesional",
    correo: "marcela.torres@uceva.edu.co",
    tareas: 31,
    avatar: "MT",
  },
  {
    id: "u4",
    nombre: "Dr. Andrés Castaño",
    cargo: "Orientador",
    area: "Inclusión",
    rol: "profesional",
    correo: "andres.castano@uceva.edu.co",
    tareas: 15,
    avatar: "AC",
  },
  {
    id: "u5",
    nombre: "Dra. Isabela Cárdenas",
    cargo: "Coordinadora VBG",
    area: "Violencias de Género",
    rol: "profesional",
    correo: "isabela.cardenas@uceva.edu.co",
    tareas: 14,
    avatar: "IC",
  },
  {
    id: "u6",
    nombre: "Lic. Paula Escobar",
    cargo: "Abogada · Trabajadora Social",
    area: "Violencias de Género",
    rol: "profesional",
    correo: "paula.escobar@uceva.edu.co",
    tareas: 9,
    avatar: "PE",
  },
  {
    id: "u7",
    nombre: "Andrés Felipe Gómez",
    cargo: "Auxiliar de Almacén",
    area: "Ucevistas de Corazón",
    rol: "almacen",
    correo: "andres.gomez@uceva.edu.co",
    tareas: 12,
    avatar: "AG",
  },
  {
    id: "u8",
    nombre: "Camila Rojas",
    cargo: "Coordinadora de Bodega y Entregas",
    area: "Ucevistas de Corazón",
    rol: "almacen",
    correo: "camila.rojas@uceva.edu.co",
    tareas: 8,
    avatar: "CR2",
  },
  {
    id: "u9",
    nombre: "Laura Fernández",
    cargo: "Administradora del Sistema",
    area: "Vicerrectoría de Bienestar",
    rol: "admin",
    correo: "laura.fernandez@uceva.edu.co",
    tareas: 0,
    avatar: "LF",
  },
]

export const cases: Case[] = [
  {
    id: "c001",
    codigo: "SM-2026-001",
    nombre: "Juan Esteban Morales",
    documento: "1098765432",
    programa: "Ingeniería de Sistemas",
    semestre: 5,
    modulo: "salud_mental",
    estado: "activo",
    riesgo: "alto",
    fechaApertura: "2026-06-12",
    ultimaActuacion: "2026-08-01",
    profesional: "Dra. Carolina Restrepo",
    motivo: "Ansiedad severa y crisis académica",
    sesiones: 8,
  },
  {
    id: "c002",
    codigo: "SM-2026-002",
    nombre: "Valentina Ospina",
    documento: "1007654321",
    programa: "Administración de Empresas",
    semestre: 3,
    modulo: "salud_mental",
    estado: "seguimiento",
    riesgo: "medio",
    fechaApertura: "2026-05-20",
    ultimaActuacion: "2026-07-28",
    profesional: "Dr. Felipe Ángel",
    motivo: "Duelo y adaptación universitaria",
    sesiones: 12,
  },
  {
    id: "c003",
    codigo: "IU-2026-001",
    nombre: "Sebastián Castro",
    documento: "1006543210",
    programa: "Licenciatura en Matemáticas",
    semestre: 4,
    modulo: "inclusion",
    estado: "activo",
    riesgo: "bajo",
    fechaApertura: "2026-07-01",
    ultimaActuacion: "2026-08-03",
    profesional: "Lic. Marcela Torres",
    motivo: "Discapacidad visual — apoyos académicos",
    sesiones: 5,
  },
  {
    id: "c004",
    codigo: "SM-2026-003",
    nombre: "Daniela Herrera",
    documento: "1098234567",
    programa: "Enfermería",
    semestre: 6,
    modulo: "salud_mental",
    estado: "activo",
    riesgo: "alto",
    fechaApertura: "2026-07-14",
    ultimaActuacion: "2026-08-04",
    profesional: "Dra. Carolina Restrepo",
    motivo: "Ideación suicida — protocolo de atención",
    sesiones: 4,
  },
  {
    id: "c005",
    codigo: "IU-2026-002",
    nombre: "Miguel Ángel Ríos",
    documento: "1005432109",
    programa: "Derecho",
    semestre: 2,
    modulo: "inclusion",
    estado: "seguimiento",
    riesgo: "bajo",
    fechaApertura: "2026-04-10",
    ultimaActuacion: "2026-07-20",
    profesional: "Dr. Andrés Castaño",
    motivo: "Discapacidad motriz — adaptaciones de infraestructura",
    sesiones: 9,
  },
  {
    id: "c006",
    codigo: "SM-2026-004",
    nombre: "Laura Jimena Prado",
    documento: "1097123456",
    programa: "Psicología",
    semestre: 7,
    modulo: "salud_mental",
    estado: "cerrado",
    riesgo: "bajo",
    fechaApertura: "2026-02-01",
    ultimaActuacion: "2026-06-30",
    profesional: "Dr. Felipe Ángel",
    motivo: "Depresión leve — seguimiento académico",
    sesiones: 16,
  },
  {
    id: "c007",
    codigo: "IU-2026-003",
    nombre: "Ana Lucía Bermúdez",
    documento: "1006789012",
    programa: "Contaduría Pública",
    semestre: 1,
    modulo: "inclusion",
    estado: "pendiente",
    riesgo: "medio",
    fechaApertura: "2026-08-01",
    ultimaActuacion: "2026-08-01",
    profesional: "Lic. Marcela Torres",
    motivo: "Discapacidad auditiva — caracterización inicial",
    sesiones: 1,
  },
  {
    id: "c008",
    codigo: "SM-2026-005",
    nombre: "Carlos Iván Zuluaga",
    documento: "1098901234",
    programa: "Ingeniería Industrial",
    semestre: 8,
    modulo: "salud_mental",
    estado: "activo",
    riesgo: "medio",
    fechaApertura: "2026-06-28",
    ultimaActuacion: "2026-07-30",
    profesional: "Dra. Carolina Restrepo",
    motivo: "Estrés crónico y agotamiento académico",
    sesiones: 6,
  },
  {
    id: "c009",
    codigo: "VBG-2026-001",
    nombre: "María Camila Vargas",
    documento: "1099876543",
    programa: "Psicología",
    semestre: 5,
    modulo: "vbg",
    estado: "activo",
    riesgo: "alto",
    fechaApertura: "2026-07-20",
    ultimaActuacion: "2026-08-04",
    profesional: "Dra. Isabela Cárdenas",
    motivo: "Acoso sexual reiterado por parte de un compañero de programa",
    sesiones: 3,
    tipoViolencia: "Acoso sexual",
  },
  {
    id: "c010",
    codigo: "VBG-2026-002",
    nombre: "Registro confidencial — Reporte anónimo",
    documento: "No registrado",
    programa: "Administración de Empresas",
    semestre: 2,
    modulo: "vbg",
    estado: "pendiente",
    riesgo: "medio",
    fechaApertura: "2026-08-02",
    ultimaActuacion: "2026-08-02",
    profesional: "Lic. Paula Escobar",
    motivo:
      "Reporte de violencia psicológica en el entorno de residencia estudiantil",
    sesiones: 0,
    tipoViolencia: "Psicológica",
  },
  {
    id: "c011",
    codigo: "VBG-2026-003",
    nombre: "Daniela Fernanda Ruiz",
    documento: "1007891234",
    programa: "Derecho",
    semestre: 7,
    modulo: "vbg",
    estado: "seguimiento",
    riesgo: "medio",
    fechaApertura: "2026-05-15",
    ultimaActuacion: "2026-07-25",
    profesional: "Dra. Isabela Cárdenas",
    motivo: "Violencia económica y patrimonial ejercida por expareja",
    sesiones: 7,
    tipoViolencia: "Económica",
  },
  {
    id: "c012",
    codigo: "VBG-2026-004",
    nombre: "Juliana Andrea Ospina",
    documento: "1098345612",
    programa: "Ingeniería Industrial",
    semestre: 3,
    modulo: "vbg",
    estado: "cerrado",
    riesgo: "bajo",
    fechaApertura: "2026-03-10",
    ultimaActuacion: "2026-06-05",
    profesional: "Lic. Paula Escobar",
    motivo:
      "Solicitud de orientación por acoso digital — caso desistido por la estudiante",
    sesiones: 2,
    tipoViolencia: "Digital",
    desistido: true,
  },
]

// ── Sub-proyecto 4: Ucevistas de Corazón (Donaciones Alimentarias) ──
// Nota: este módulo se trabaja únicamente a nivel visual/maqueta.
export type DonorType = "interno" | "externo"
export type PrioridadSolicitud = "alta" | "media" | "baja"
export type EstadoSolicitud = "pendiente" | "aprobada" | "entregada" | "rechazada"

export interface Donante {
  id: string
  nombre: string
  tipo: DonorType
  categoria: string
  anonimo: boolean
  totalDonado: number
  ultimaDonacion: string
}

export const donantes: Donante[] = [
  {
    id: "d1",
    nombre: "Fundación Manos Solidarias",
    tipo: "externo",
    categoria: "Fundación",
    anonimo: false,
    totalDonado: 42,
    ultimaDonacion: "2026-07-28",
  },
  {
    id: "d2",
    nombre: "Donante anónimo",
    tipo: "interno",
    categoria: "Docente",
    anonimo: true,
    totalDonado: 6,
    ultimaDonacion: "2026-08-01",
  },
  {
    id: "d3",
    nombre: "Supermercados El Ahorro",
    tipo: "externo",
    categoria: "Empresa",
    anonimo: false,
    totalDonado: 65,
    ultimaDonacion: "2026-08-03",
  },
  {
    id: "d4",
    nombre: "Asociación de Egresados UCEVA",
    tipo: "externo",
    categoria: "Egresados",
    anonimo: false,
    totalDonado: 30,
    ultimaDonacion: "2026-06-15",
  },
  {
    id: "d5",
    nombre: "Vicerrectoría Administrativa",
    tipo: "interno",
    categoria: "Administrativo",
    anonimo: false,
    totalDonado: 18,
    ultimaDonacion: "2026-07-10",
  },
]

export interface InventarioItem {
  id: string
  producto: string
  tipo: "Mercado Tipo A" | "Mercado Tipo B" | "Elemento suelto"
  lote: string
  cantidad: number
  unidad: string
  fechaIngreso: string
  fechaVencimiento: string
  donanteId: string
}

export const inventarioDonaciones: InventarioItem[] = [
  {
    id: "i1",
    producto: "Mercado completo (arroz, aceite, panela, granos)",
    tipo: "Mercado Tipo A",
    lote: "L-2026-014",
    cantidad: 22,
    unidad: "unidades",
    fechaIngreso: "2026-07-28",
    fechaVencimiento: "2026-12-01",
    donanteId: "d1",
  },
  {
    id: "i2",
    producto: "Mercado básico (arroz, aceite, pasta)",
    tipo: "Mercado Tipo B",
    lote: "L-2026-015",
    cantidad: 8,
    unidad: "unidades",
    fechaIngreso: "2026-08-01",
    fechaVencimiento: "2026-08-20",
    donanteId: "d2",
  },
  {
    id: "i3",
    producto: "Leche en polvo",
    tipo: "Elemento suelto",
    lote: "L-2026-016",
    cantidad: 40,
    unidad: "kg",
    fechaIngreso: "2026-08-03",
    fechaVencimiento: "2026-10-15",
    donanteId: "d3",
  },
  {
    id: "i4",
    producto: "Enlatados variados",
    tipo: "Elemento suelto",
    lote: "L-2026-011",
    cantidad: 5,
    unidad: "cajas",
    fechaIngreso: "2026-06-15",
    fechaVencimiento: "2026-08-10",
    donanteId: "d4",
  },
  {
    id: "i5",
    producto: "Mercado completo (arroz, aceite, panela, granos)",
    tipo: "Mercado Tipo A",
    lote: "L-2026-017",
    cantidad: 15,
    unidad: "unidades",
    fechaIngreso: "2026-07-10",
    fechaVencimiento: "2026-11-30",
    donanteId: "d5",
  },
]

export interface SolicitudDonacion {
  id: string
  estudiante: string
  documento: string
  programa: string
  semestre: number
  estrato: number
  situacion: string
  prioridad: PrioridadSolicitud
  estado: EstadoSolicitud
  fechaSolicitud: string
  vecesRecibido: number
}

export const solicitudesDonaciones: SolicitudDonacion[] = [
  {
    id: "s1",
    estudiante: "Registro confidencial — E-114",
    documento: "Reservado",
    programa: "Enfermería",
    semestre: 4,
    estrato: 1,
    situacion: "Cabeza de familia, situación de emergencia económica",
    prioridad: "alta",
    estado: "pendiente",
    fechaSolicitud: "2026-08-03",
    vecesRecibido: 1,
  },
  {
    id: "s2",
    estudiante: "Registro confidencial — E-098",
    documento: "Reservado",
    programa: "Ingeniería Industrial",
    semestre: 6,
    estrato: 2,
    situacion: "Ingresos familiares reducidos por desempleo",
    prioridad: "media",
    estado: "aprobada",
    fechaSolicitud: "2026-07-30",
    vecesRecibido: 2,
  },
  {
    id: "s3",
    estudiante: "Registro confidencial — E-076",
    documento: "Reservado",
    programa: "Licenciatura en Matemáticas",
    semestre: 2,
    estrato: 1,
    situacion: "Estrato 1, sin apoyo económico familiar",
    prioridad: "alta",
    estado: "entregada",
    fechaSolicitud: "2026-07-15",
    vecesRecibido: 3,
  },
  {
    id: "s4",
    estudiante: "Registro confidencial — E-052",
    documento: "Reservado",
    programa: "Contaduría Pública",
    semestre: 1,
    estrato: 2,
    situacion: "Estudiante nuevo, caracterización inicial",
    prioridad: "baja",
    estado: "pendiente",
    fechaSolicitud: "2026-08-04",
    vecesRecibido: 0,
  },
  {
    id: "s5",
    estudiante: "Registro confidencial — E-041",
    documento: "Reservado",
    programa: "Derecho",
    semestre: 8,
    estrato: 1,
    situacion: "Situación de vulnerabilidad prolongada",
    prioridad: "media",
    estado: "entregada",
    fechaSolicitud: "2026-06-20",
    vecesRecibido: 4,
  },
]

export interface DespachoDonacion {
  id: string
  solicitudId: string
  fecha: string
  tipoMercado: string
  metodoValidacion: "Código QR" | "Carné estudiantil" | "Firma digital"
  estado: "Entregado" | "Programado"
}

export const despachosDonaciones: DespachoDonacion[] = [
  {
    id: "e1",
    solicitudId: "s3",
    fecha: "2026-07-16",
    tipoMercado: "Mercado Tipo A",
    metodoValidacion: "Código QR",
    estado: "Entregado",
  },
  {
    id: "e2",
    solicitudId: "s5",
    fecha: "2026-06-21",
    tipoMercado: "Mercado Tipo B",
    metodoValidacion: "Carné estudiantil",
    estado: "Entregado",
  },
  {
    id: "e3",
    solicitudId: "s2",
    fecha: "2026-08-06",
    tipoMercado: "Mercado Tipo A",
    metodoValidacion: "Código QR",
    estado: "Programado",
  },
]

export const analyticsData = {
  casosPorMes: [
    { mes: "Feb", saludMental: 8, inclusion: 3, vbg: 2 },
    { mes: "Mar", saludMental: 12, inclusion: 5, vbg: 3 },
    { mes: "Abr", saludMental: 15, inclusion: 7, vbg: 4 },
    { mes: "May", saludMental: 11, inclusion: 6, vbg: 3 },
    { mes: "Jun", saludMental: 18, inclusion: 9, vbg: 5 },
    { mes: "Jul", saludMental: 22, inclusion: 11, vbg: 6 },
    { mes: "Ago", saludMental: 14, inclusion: 8, vbg: 4 },
  ],
  distribucionRiesgo: [
    { name: "Alto", value: 12, color: "#FF005A" },
    { name: "Medio", value: 28, color: "#FFB400" },
    { name: "Bajo", value: 45, color: "#007F2F" },
  ],
  distribucionPrograma: [
    { programa: "Ing. Sistemas", casos: 18 },
    { programa: "Administración", casos: 14 },
    { programa: "Enfermería", casos: 12 },
    { programa: "Derecho", casos: 10 },
    { programa: "Psicología", casos: 9 },
    { programa: "Otros", casos: 22 },
  ],
  estadoSemanal: [
    { semana: "S1", abiertos: 5, cerrados: 2, seguimiento: 8 },
    { semana: "S2", abiertos: 7, cerrados: 3, seguimiento: 9 },
    { semana: "S3", abiertos: 4, cerrados: 5, seguimiento: 11 },
    { semana: "S4", abiertos: 9, cerrados: 4, seguimiento: 10 },
  ],
}
