"use client";

export default function CVForm() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Genera tu CV</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Nombre completo" className="input" />
          <input placeholder="Ubicación" className="input" />
          <input placeholder="Email" type="email" className="input" />
          <input placeholder="Teléfono" className="input" />
          <input placeholder="LinkedIn" className="input" />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Experiencia Laboral
          </label>
          <textarea
            placeholder="Ej: Analista QA – UPEX..."
            className="input h-40"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Habilidades Técnicas
          </label>
          <textarea
            placeholder="Ej: Javascript, React JS, Cypress..."
            className="input h-32"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Educación Complementaria
          </label>
          <textarea
            placeholder="Ej: Testing QA – Educación IT..."
            className="input h-28"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Idiomas</label>
          <input
            placeholder="Ej: Español nativo, Inglés B2, Italiano A2"
            className="input"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Generar CV
          </button>

          <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded">
            Ver Ejemplo
          </button>
        </div>
      </form>
    </div>
  );
}
