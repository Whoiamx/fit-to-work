"use client";

import { useRouter } from "next/navigation";
import {
  FaFileAlt,
  FaEnvelopeOpenText,
  FaLinkedin,
  FaRobot,
  FaMapSigns,
  FaHistory,
} from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";

const steps = [
  {
    title: "Generador de CV",
    route: "/cv",
    icon: <FaFileAlt className="text-blue-600 text-3xl" />,
  },
  {
    title: "Optimizacion de CV",
    route: "/optimizar",
    icon: <IoIosOptions className="text-blue-600 text-3xl" />,
  },
  {
    title: "Carta de presentación",
    route: "/carta",
    icon: <FaEnvelopeOpenText className="text-blue-600 text-3xl" />,
  },
  {
    title: "Perfil de Linkedin",
    route: "/linkedin",
    icon: <FaLinkedin className="text-blue-600 text-3xl" />,
  },
  {
    title: "Simulador de entrevistas",
    route: "/entrevista",
    icon: <FaRobot className="text-blue-600 text-3xl" />,
  },
  {
    title: "Historial de aplicaciones",
    route: "/historial",
    icon: <FaHistory className="text-blue-600 text-3xl" />,
  },
];

export default function CareerRoadmap() {
  const router = useRouter();

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <div className="flex flex-col items-center gap-10 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {index !== steps.length - 1 && (
              <div className="w-1 h-16 bg-gray-300 absolute top-10 left-1/2 transform -translate-x-1/2 z-0" />
            )}

            <div
              onClick={() => router.push(step.route)}
              className="cursor-pointer bg-white shadow-md border border-gray-200 rounded-xl px-6 py-4 text-center z-10 hover:bg-blue-50 transition"
            >
              <div className="mb-2">{step.icon}</div>
              <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">
                {step.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
