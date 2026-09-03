import fs from "node:fs"
import path from "node:path"

const outputPath = path.resolve("pre-diseno-sigabu.pdf")
const W = 841.89
const H = 595.28
const ops = []
const color = (hex, stroke = false) => {
  const values = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
  ops.push(`${values.join(" ")} ${stroke ? "RG" : "rg"}`)
}
const rect = (x, y, w, h, fill) => {
  color(fill)
  ops.push(`${x} ${H - y - h} ${w} ${h} re f`)
}
const round = (x, y, w, h, fill, stroke = null) => {
  rect(x, y, w, h, fill)
  if (stroke) {
    color(stroke, true)
    ops.push(`${x} ${H - y - h} ${w} ${h} re S`)
  }
}
const write = (value, x, y, size, fill = "#2F2F30", bold = false) => {
  color(fill)
  const font = bold ? "F2" : "F1"
  const safe = value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
  ops.push(`BT /${font} ${size} Tf ${x} ${H - y - size} Td (${safe}) Tj ET`)
}

rect(0, 0, 390, H, "#004D1C")
rect(390, 0, W - 390, H, "#FFFFFF")
round(42, 48, 44, 44, "#8AFF00")
write("UC", 55, 61, 15, "#003A10", true)
write("UCEVA", 98, 51, 16, "#FFFFFF", true)
write("VICERRECTORIA DE BIENESTAR", 98, 74, 7, "#A7B9AD")
round(42, 132, 145, 23, "#1A6B3B")
write("o  Sistema Institucional", 52, 139, 9, "#8AFF00", true)
write("SIGABU", 42, 185, 30, "#FFFFFF", true)
write("Bienestar Universitario", 42, 221, 22, "#8AFF00", true)
write(
  "Tu portal de bienestar en la UCEVA. Solicita acompanamiento",
  42,
  272,
  10,
  "#C7D6CC",
)
write(
  "psicologico, apoyos de inclusion y recursos de salud mental.",
  42,
  287,
  10,
  "#C7D6CC",
)
;[
  ["01", "Solicita tu cita", "Psicologia y acompanamiento emocional"],
  ["02", "Apoyos de inclusion", "Caracterizacion y ajustes razonables"],
  ["03", "Recursos de bienestar", "Material psicoeducativo gratuito"],
  ["04", "Confidencial", "Tu informacion esta protegida"],
].forEach(([n, title, desc], i) => {
  const y = 350 + i * 42
  round(42, y, 305, 32, "#1A5E38")
  write(n, 55, y + 9, 8, "#8AFF00", true)
  write(title, 86, y + 6, 9, "#FFFFFF", true)
  write(desc, 86, y + 18, 7.5, "#AFC3B6")
})
write("PRE-DISENO DE INTERFAZ", 446, 52, 8, "#007F2F", true)
write("Bienvenido/a", 446, 79, 22, "#2F2F30", true)
write("Selecciona como vas a ingresar al sistema", 446, 110, 10, "#9CA3AF")
round(446, 151, 160, 92, "#F0FDF4", "#007F2F")
write("EST", 460, 166, 12, "#007F2F", true)
write("Soy estudiante", 460, 197, 10, "#007F2F", true)
write("Solicitar servicios de bienestar", 460, 215, 8, "#9CA3AF")
round(618, 151, 160, 92, "#FAFAFA", "#E5E7EB")
write("PRO", 632, 166, 12, "#2F2F30", true)
write("Soy profesional", 632, 197, 10, "#2F2F30", true)
write("Psicologia, trabajo social, admin", 632, 215, 8, "#9CA3AF")
write("Correo institucional", 446, 272, 9, "#374151", true)
round(446, 290, 332, 35, "#FFFFFF", "#E5E7EB")
write("codigo@uceva.edu.co", 459, 302, 10)
write("Contrasena", 446, 333, 9, "#374151", true)
round(446, 351, 332, 35, "#FFFFFF", "#E5E7EB")
write("Tu contrasena", 459, 363, 10, "#9CA3AF")
write("Olvidaste tu contrasena?", 636, 377, 8, "#007F2F", true)
round(446, 405, 332, 38, "#8AFF00")
write("Ingresar como estudiante", 544, 418, 10, "#003A10", true)
round(446, 470, 332, 48, "#F0FDF4", "#BBF7D0")
write("CONFIDENCIALIDAD GARANTIZADA", 460, 482, 8, "#15803D", true)
write(
  "La informacion compartida sera tratada con reserva profesional.",
  460,
  497,
  8,
  "#4B8060",
)
write("Problemas de acceso? bienestar@uceva.edu.co", 528, 548, 8, "#9CA3AF")

const stream = ops.join("\n")
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
]
let pdf = "%PDF-1.4\n"
const offsets = [0]
objects.forEach((object, index) => {
  offsets[index + 1] = Buffer.byteLength(pdf)
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
})
const xref = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
  .slice(1)
  .map((offset) => String(offset).padStart(10, "0") + " 00000 n ")
  .join(
    "\n",
  )}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
fs.writeFileSync(outputPath, pdf)
console.log(`PDF generado: ${outputPath}`)
