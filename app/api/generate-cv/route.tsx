// /pages/api/generateCV.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";
import PDFDocument from "pdfkit";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { userInfo, template = "professional" } = await req.json();

    // Llamar a Google Gemini para generar el contenido
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Genera un CV profesional y bien estructurado para una persona con la siguiente información:
    ${JSON.stringify(userInfo)}

    El CV debe seguir un formato ${template} y debe incluir:
    1. Información personal y de contacto
    2. Resumen profesional conciso y atractivo
    3. Experiencia laboral con logros cuantificables
    4. Educación y certificaciones
    5. Habilidades técnicas y blandas relevantes
    6. Idiomas

    Formatea el contenido de manera estructurada para que pueda ser convertido a PDF.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cvContent = response.text();

    // Crear el buffer para el PDF
    const pdfBuffer = await generatePDF(cvContent, template);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=curriculum.pdf",
      },
    });
  } catch (error) {
    console.error("Error en la generación del CV:", error);
    return new Response(
      JSON.stringify({ error: "Error en la generación del CV" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Función para generar el PDF a partir del contenido
async function generatePDF(content: string, template: string): Promise<Buffer> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    const doc = new PDFDocument({ margin: 50 });

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    // Aplicar estilo según la plantilla
    if (template === "professional") {
      doc.font("Helvetica");
    } else if (template === "creative") {
      doc.font("Courier");
    } else {
      doc.font("Times-Roman");
    }

    // Procesar el contenido y añadirlo al PDF
    const sections = content.split("\n\n");

    sections.forEach((section, index) => {
      if (index === 0) {
        // Título principal
        doc.fontSize(18).text(section, { align: "center" });
        doc.moveDown(2);
      } else {
        // Secciones del CV
        const lines = section.split("\n");
        if (lines[0] && !lines[0].startsWith("•")) {
          doc.fontSize(14).text(lines[0], { underline: true });
          doc.moveDown(0.5);

          for (let i = 1; i < lines.length; i++) {
            doc.fontSize(12).text(lines[i]);
          }
        } else {
          for (const line of lines) {
            doc.fontSize(12).text(line);
          }
        }
        doc.moveDown(1);
      }
    });

    doc.end();
  });
}
