"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  route: string;
  icon?: React.ReactNode;
}

export const WidgetCard = ({
  title,
  description,
  buttonText,
  route,
  icon,
}: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        {icon && <div className="mb-3">{icon}</div>}
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
      <button
        onClick={() => router.push(route)}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
      >
        {buttonText}
      </button>
    </div>
  );
};
