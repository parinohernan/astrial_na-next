import React from "react";

// interface NavbarProps {
//   toggleSidebar: () => void;
// }

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 w-full flex items-center">
      {/* <button
        onClick={toggleSidebar}
        className="text-white mr-4 focus:outline-none"
      >
        ☰
      </button> */}
      <h1 className="text-white text-2xl font-bold text-center flex-grow">
        Proyecto Astrial Web
      </h1>
    </nav>
  );
};

export default Navbar;
