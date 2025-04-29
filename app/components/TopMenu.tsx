import { cookies } from "next/headers";
import Link from "next/link";
import { CiMenuBurger, CiSearch, CiBellOn, CiUser } from "react-icons/ci";

export const TopMenu = () => {
  const cookieStore = cookies();

  return (
    <header className="sticky z-10 top-0 w-full bg-white border-b shadow-sm h-16 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        {/* Left section: menu button + page title */}
        <div className="flex items-center space-x-4">
          <button className="lg:hidden text-gray-600 hover:text-blue-600">
            <CiMenuBurger size={28} />
          </button>
        </div>

        {/* Center (optional search) */}
        <div className="hidden md:flex flex-1 mx-6 max-w-md">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CiSearch />
            </span>
            <input
              type="search"
              placeholder="Buscar recursos, tips, herramientas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Right section: icons */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm text-gray-600">Tu progreso:</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div className="w-[30%] h-2 bg-blue-500 rounded-full"></div>
          </div>
          <span className="text-sm text-blue-500 font-semibold">30%</span>
        </div>
      </div>
    </header>
  );
};
