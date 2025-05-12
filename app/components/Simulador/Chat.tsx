"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatPage() {
  //   const { messages, input, handleInputChange, handleSubmit, isLoading } =
  //     useChat({
  //       api: "/api/chat",
  //     });

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Simulador de entrevistas con IA
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-100 ml-auto max-w-[80%]"
                    : "bg-white border border-gray-200 max-w-[80%]"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="bg-white border border-gray-200 p-4 rounded-lg max-w-[80%]">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )} */}
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <form onSubmit={() => {}} className="max-w-3xl mx-auto flex">
          <input
            type="text"
            // value={input}
            onChange={() => {}}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            // disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-4 py-2 flex items-center justify-center disabled:bg-blue-400"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        ¡Bienvenido al Asistente de Búsqueda de Empleo!
      </h2>
      <p className="text-gray-600 mb-4">
        Estoy aquí para ayudarte a encontrar trabajo y mejorar tu perfil
        profesional. Puedes preguntarme sobre:
      </p>
      <ul className="space-y-2 mb-4">
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>Estrategias para encontrar trabajo en tu sector</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>Cómo mejorar tu CV y carta de presentación</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>Consejos para destacar en LinkedIn</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>Preparación para entrevistas de trabajo</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>Cómo crear un plan de búsqueda de empleo efectivo</span>
        </li>
      </ul>
      <p className="text-gray-600 italic">¿En qué puedo ayudarte hoy?</p>
    </div>
  );
}
