"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  initialExpanded: boolean;
}

interface Option {
  id: number;
  name: string;
  path: string;
  subMenu?: { id: number; name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ initialExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [expandedSubmenu, setExpandedSubmenu] = useState<number | null>(null);

  const options: Option[] = [
    { id: 1, name: "Opción 1", path: "/opcion1" },
    {
      id: 2,
      name: "Utilidades",
      path: "/utilidades/",
      subMenu: [
        {
          id: 21,
          name: "actualizar precios",
          path: "/utilidades/actualizar-precios",
        },
        {
          id: 22,
          name: "desde planilla",
          path: "/utilidades/cargar-desde-planilla",
        },
      ],
    },
    {
      id: 3,
      name: "Reportes",
      path: "/reportes",
      subMenu: [
        { id: 31, name: "Reportes de Ventas", path: "/reportes/ventas" },
        { id: 32, name: "Reportes de Productos", path: "/reportes/productos" },
      ],
    },
    {
      id: 4,
      name: "Ventas",
      path: "/ventas",
      subMenu: [
        { id: 41, name: "Factura", path: "/ventas/factura" },
        { id: 42, name: "Informe", path: "/ventas/informe" },
        { id: 43, name: "Venta a cuenta", path: "/ventas/venta_a_cuenta" },
      ],
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSubmenu = (id: number) => {
    setExpandedSubmenu(expandedSubmenu === id ? null : id);
  };

  return (
    <aside
      className={`font-roboto bg-blue-200 text-black-900 min-h-screen p-4 transition-all duration-300 ease-in-out`}
    >
      <nav>
        <button onClick={toggleSidebar}>☰</button>
        <ul>
          {options.map((option) => (
            <li key={option.id} className="mb-2">
              {option.subMenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(option.id)}
                    className="font-roboto hover:bg-blue-600 block py-2 w-full text-left"
                  >
                    {option.name}
                  </button>
                  {expandedSubmenu === option.id && (
                    <ul className="pl-4">
                      {option.subMenu.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            href={subItem.path}
                            className="font-roboto hover:bg-blue-600 block py-2"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={option.path}
                  className="hover:text-blue-300 block py-2"
                >
                  {option.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
