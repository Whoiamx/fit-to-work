import Image from "next/image";

import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "../../ui/LogoutButton";

import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
} from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Home",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Mi CV",
    path: "/dashboard/cv",
  },
  {
    icon: <IoListOutline />,
    title: "Mi Linkedin",
    path: "/dashboard/mi-linkedin",
  },
  {
    icon: <FaRegAddressCard  />,
    title: "Mi carta de presentacion",
    path: "/dashboard/carta",
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Guía de Búsqueda de Empleo",
    path: "/dashboard/roadmap",
  },
  {
    icon: <IoBasketOutline />,
    title: "Simulador de Entrevistas",
    path: "/dashboard/products",
  },
];

export const Sidebar = async () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
            Fit<span className="text-blue-600">2</span>Work
          </h1>
        </div>
        <div className="mt-8 text-center">
          <Image
            src={"/profile.jpeg"}
            width={150}
            height={150}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Bienvenido, Gaston!
          </h5>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
