"use client";

import type React from "react";

import { useState } from "react";
import { PlusCircle, Trash2, Download, Loader2 } from "lucide-react";

export default function CVForm() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
    skills: [] as string[],
    experience: [
      {
        company: "",
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: [""],
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    languages: [
      {
        name: "",
        level: "Intermedio" as "Básico" | "Intermedio" | "Avanzado" | "Nativo",
      },
    ],
  });

  const [template, setTemplate] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedExperience = [...userInfo.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setUserInfo({ ...userInfo, experience: updatedExperience });
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedEducation = [...userInfo.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setUserInfo({ ...userInfo, education: updatedEducation });
  };

  const handleLanguageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedLanguages = [...userInfo.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]:
        field === "level"
          ? (value as "Básico" | "Intermedio" | "Avanzado" | "Nativo")
          : value,
    };
    setUserInfo({ ...userInfo, languages: updatedLanguages });
  };

  const addExperience = () => {
    setUserInfo({
      ...userInfo,
      experience: [
        ...userInfo.experience,
        {
          company: "",
          title: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: [""],
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...userInfo.experience];
    updatedExperience.splice(index, 1);
    setUserInfo({ ...userInfo, experience: updatedExperience });
  };

  const addEducation = () => {
    setUserInfo({
      ...userInfo,
      education: [
        ...userInfo.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...userInfo.education];
    updatedEducation.splice(index, 1);
    setUserInfo({ ...userInfo, education: updatedEducation });
  };

  const addLanguage = () => {
    setUserInfo({
      ...userInfo,
      languages: [
        ...userInfo.languages,
        {
          name: "",
          level: "Intermedio" as
            | "Básico"
            | "Intermedio"
            | "Avanzado"
            | "Nativo",
        },
      ],
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...userInfo.languages];
    updatedLanguages.splice(index, 1);
    setUserInfo({ ...userInfo, languages: updatedLanguages });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setUserInfo({
        ...userInfo,
        skills: [...userInfo.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...userInfo.skills];
    updatedSkills.splice(index, 1);
    setUserInfo({ ...userInfo, skills: updatedSkills });
  };

  const handleAchievementChange = (
    expIndex: number,
    achievementIndex: number,
    value: string
  ) => {
    const updatedExperience = [...userInfo.experience];
    const updatedAchievements = [...updatedExperience[expIndex].achievements];
    updatedAchievements[achievementIndex] = value;
    updatedExperience[expIndex].achievements = updatedAchievements;
    setUserInfo({ ...userInfo, experience: updatedExperience });
  };

  const addAchievement = (expIndex: number) => {
    const updatedExperience = [...userInfo.experience];
    updatedExperience[expIndex].achievements = [
      ...(updatedExperience[expIndex].achievements || []),
      "",
    ];
    setUserInfo({ ...userInfo, experience: updatedExperience });
  };

  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const updatedExperience = [...userInfo.experience];
    const updatedAchievements = [...updatedExperience[expIndex].achievements];
    updatedAchievements.splice(achievementIndex, 1);
    updatedExperience[expIndex].achievements = updatedAchievements;
    setUserInfo({ ...userInfo, experience: updatedExperience });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const generateCV = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo, template }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el CV");
      }

      // Crear un blob con la respuesta
      const blob = await response.blob();

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv_${userInfo.name.replace(/\s+/g, "_").toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocurrió un error al generar el CV. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Generador de CV Profesional
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between mb-6">
            <div
              className={`px-4 py-2 rounded-full ${
                currentStep === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1. Información Personal
            </div>
            <div
              className={`px-4 py-2 rounded-full ${
                currentStep === 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2. Experiencia
            </div>
            <div
              className={`px-4 py-2 rounded-full ${
                currentStep === 3
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3. Educación
            </div>
            <div
              className={`px-4 py-2 rounded-full ${
                currentStep === 4
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              4. Habilidades
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
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
                    name="name"
                    value={userInfo.name}
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
                    name="title"
                    value={userInfo.title}
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
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
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
                    name="location"
                    value={userInfo.location}
                    onChange={handleChange}
                    placeholder="Ej: Madrid, España"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Plantilla</label>
                  <select
                    name="template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="professional">Profesional</option>
                    <option value="creative">Creativa</option>
                    <option value="simple">Simple</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Resumen Profesional
                </label>
                <textarea
                  name="summary"
                  value={userInfo.summary}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Breve descripción de tu perfil profesional y objetivos..."
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Experiencia Laboral
              </h2>

              {userInfo.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      Experiencia {index + 1}
                    </h3>
                    {userInfo.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Empresa *
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Puesto *
                      </label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          handleExperienceChange(index, "title", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Ubicación
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Fecha de inicio *
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id={`current-job-${index}`}
                        checked={exp.current}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "current",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`current-job-${index}`}
                        className="text-gray-700"
                      >
                        Trabajo actual
                      </label>
                    </div>

                    {!exp.current && (
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Fecha de fin
                        </label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Logros</label>
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) =>
                            handleAchievementChange(
                              index,
                              achievementIndex,
                              e.target.value
                            )
                          }
                          placeholder="Ej: Aumenté las ventas en un 20%"
                          className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {exp.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeAchievement(index, achievementIndex)
                            }
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addAchievement(index)}
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm mt-1"
                    >
                      <PlusCircle size={16} className="mr-1" /> Añadir logro
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addExperience}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={18} className="mr-1" /> Añadir experiencia
              </button>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Educación
              </h2>

              {userInfo.education.map((edu, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      Educación {index + 1}
                    </h3>
                    {userInfo.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Institución *
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        placeholder="Ej: Licenciatura, Máster, Certificado"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Campo de estudio *
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) =>
                          handleEducationChange(index, "field", e.target.value)
                        }
                        placeholder="Ej: Informática, Administración de Empresas"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Fecha de inicio *
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id={`current-edu-${index}`}
                        checked={edu.current}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "current",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`current-edu-${index}`}
                        className="text-gray-700"
                      >
                        En curso
                      </label>
                    </div>

                    {!edu.current && (
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Fecha de fin
                        </label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Información adicional sobre tus estudios, logros académicos, etc."
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addEducation}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={18} className="mr-1" /> Añadir educación
              </button>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Idiomas
                </h3>

                {userInfo.languages.map((lang, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={lang.name}
                          onChange={(e) =>
                            handleLanguageChange(index, "name", e.target.value)
                          }
                          placeholder="Ej: Inglés, Español"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <select
                          value={lang.level}
                          onChange={(e) =>
                            handleLanguageChange(index, "level", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Básico">Básico</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                          <option value="Nativo">Nativo</option>
                        </select>
                      </div>
                    </div>
                    {userInfo.languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLanguage}
                  className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                >
                  <PlusCircle size={18} className="mr-1" /> Añadir idioma
                </button>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Habilidades
              </h2>

              <div>
                <label className="block text-gray-700 mb-2">
                  Añadir habilidades
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Ej: JavaScript, Gestión de proyectos, Photoshop"
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md"
                  >
                    Añadir
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Habilidades añadidas
                </label>
                <div className="flex flex-wrap gap-2">
                  {userInfo.skills.length === 0 ? (
                    <p className="text-gray-500 italic">
                      No has añadido ninguna habilidad todavía
                    </p>
                  ) : (
                    userInfo.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded-full px-3 py-1 flex items-center"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={generateCV}
                  disabled={isGenerating}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Download size={18} className="mr-2" />
                      Generar CV
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
