import { IoIosOptions } from "react-icons/io";
import { WidgetCard } from "./WidgetCard";
import {
  FaFileAlt,
  FaEnvelopeOpenText,
  FaLinkedin,
  FaRobot,
  FaMapSigns,
  FaHistory,
} from "react-icons/fa";

const cardsData = [
  {
    title: "Generador de CV",
    description: "Creá tu CV desde cero o cargá uno ya hecho.",
    buttonText: "Crear / Editar CV",
    route: "/cv",
    icon: <FaFileAlt className="text-2xl text-blue-600" />,
  },
  {
    title: "Carta de presentación",
    description: "Generá cartas adaptadas con IA.",
    buttonText: "Generar nueva",
    route: "/carta",
    icon: <FaEnvelopeOpenText className="text-2xl text-blue-600" />,
  },
  {
    title: "Perfil de Linkedin",
    description: "Mejorá tu perfil profesional.",
    buttonText: "Ver sugerencias",
    route: "/linkedin",
    icon: <FaLinkedin className="text-2xl text-blue-600" />,
  },
  {
    title: "Simulador de entrevistas",
    description: "Practicá con una IA que te entrevista.",
    buttonText: "Iniciar simulación",
    route: "/entrevista",
    icon: <FaRobot className="text-2xl text-blue-600" />,
  },
  {
    title: "Guía de búsqueda",
    description: "Plan paso a paso adaptado a vos.",
    buttonText: "Ver roadmap",
    route: "/guia",
    icon: <FaMapSigns className="text-2xl text-blue-600" />,
  },
  {
    title: "Historial de aplicaciones",
    description: "Revisá los trabajos a los que aplicaste.",
    buttonText: "Ver historial",
    route: "/historial",
    icon: <FaHistory className="text-2xl text-blue-600" />,
  },
  {
    title: "Optimizacion de CV",
    description: "Optimiza tu CV para buscar tu trabajo ideal",
    buttonText: "Optimizar el CV con IA",
    route: "/optimizar",
    icon: <IoIosOptions className="text-2xl text-blue-600" />,
  },
];

export const WidgetItem = () => {
  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <WidgetCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
