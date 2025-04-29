"use client";

import { CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  return (
    <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
      <CiLogout />
      <span className="group-hover:text-gray-700">Cerrar Sesion</span>
    </button>
  );
};
