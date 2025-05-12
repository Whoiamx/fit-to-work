"use client";

import type React from "react";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

export default function CoverLetterPage() {
  const [formData, setFormData] = useState({
    userInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      experience: "",
    },
    jobDescription: "",
    companyName: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as Record<
            string,
            string
          >),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const generateCoverLetter = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al generar la carta de presentación");
      }

      // Crear un blob con la respuesta
      const blob = await response.blob();

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `carta_presentacion_${formData.userInfo.name
        .replace(/\s+/g, "_")
        .toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocurrió un error al generar la carta de presentación. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Generador de Carta de Presentación
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Información Personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="userInfo.name"
                    value={formData.userInfo.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Título Profesional *
                  </label>
                  <input
                    type="text"
                    name="userInfo.title"
                    value={formData.userInfo.title}
                    onChange={handleChange}
                    placeholder="Ej: Desarrollador Full Stack"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="userInfo.email"
                    value={formData.userInfo.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="userInfo.phone"
                    value={formData.userInfo.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="userInfo.location"
                    value={formData.userInfo.location}
                    onChange={handleChange}
                    placeholder="Ej: Madrid, España"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Resumen de Experiencia Relevante *
              </label>
              <textarea
                name="userInfo.experience"
                value={formData.userInfo.experience}
                onChange={handleChange}
                rows={4}
                placeholder="Describe brevemente tu experiencia relevante para el puesto..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Información del Puesto
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Descripción del Puesto *
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Copia y pega la descripción del puesto al que estás aplicando..."
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Download size={18} className="mr-2" />
                    Generar Carta de Presentación
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
