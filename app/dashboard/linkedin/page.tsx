"use client";

import type React from "react";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LinkedInStrategyPage() {
  const [formData, setFormData] = useState({
    userInfo: {
      name: "",
      title: "",
      industry: "",
      experience: "",
      skills: "",
    },
    careerGoals: "",
  });

  const [strategy, setStrategy] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const generateStrategy = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/linkedin-strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al generar la estrategia");
      }

      const data = await response.json();
      setStrategy(data.strategy);

      // Desplazarse a la sección de resultados
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocurrió un error al generar la estrategia. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Estrategia para LinkedIn
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Tu Perfil Profesional
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Nombre *</label>
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
                  <label className="block text-gray-700 mb-1">
                    Industria *
                  </label>
                  <select
                    name="userInfo.industry"
                    value={formData.userInfo.industry}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecciona una industria</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Salud">Salud</option>
                    <option value="Educación">Educación</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Consultoría">Consultoría</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Resumen de Experiencia *
              </label>
              <textarea
                name="userInfo.experience"
                value={formData.userInfo.experience}
                onChange={handleChange}
                rows={3}
                placeholder="Describe brevemente tu experiencia profesional..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Principales Habilidades *
              </label>
              <textarea
                name="userInfo.skills"
                value={formData.userInfo.skills}
                onChange={handleChange}
                rows={2}
                placeholder="Lista tus principales habilidades separadas por comas..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Objetivos Profesionales *
              </label>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                rows={4}
                placeholder="Describe tus objetivos profesionales a corto y largo plazo, el tipo de puesto que buscas, etc..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={generateStrategy}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Generando...
                  </>
                ) : (
                  "Generar Estrategia para LinkedIn"
                )}
              </button>
            </div>
          </div>
        </div>

        {strategy && (
          <div id="results" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Tu Estrategia para LinkedIn
            </h2>
            <div className="prose max-w-none">
              {strategy.split("\n\n").map((paragraph, index) => (
                <div key={index} className="mb-4">
                  {paragraph.startsWith("#") ? (
                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                      {paragraph.replace(/^#+ /, "")}
                    </h3>
                  ) : paragraph.startsWith("- ") ||
                    paragraph.startsWith("* ") ? (
                    <ul className="list-disc pl-5 mb-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i} className="mb-1">
                          {item.replace(/^[- *] /, "")}
                        </li>
                      ))}
                    </ul>
                  ) : paragraph.startsWith("1.") ? (
                    <ol className="list-decimal pl-5 mb-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i} className="mb-1">
                          {item.replace(/^\d+\. /, "")}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-gray-700">{paragraph}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => window.print()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md"
              >
                Imprimir Estrategia
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
