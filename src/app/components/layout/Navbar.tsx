import React from "react";

// interface NavbarProps {
//   toggleSidebar: () => void;
// }

const Navbar = () => {
  return (
    <nav className="font-roboto bg-blue-200 p-4 w-full flex items-center">
      {/* <button
        onClick={toggleSidebar}
        className="text-white mr-4 focus:outline-none"
      >
        ☰
      </button> */}
      <h1 className="text-black-900 text-2xl font-bold text-center flex-grow">
        Astrial - Gestion de Ventas
      </h1>
    </nav>
  );
};

export default Navbar;
