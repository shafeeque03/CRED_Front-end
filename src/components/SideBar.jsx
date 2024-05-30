import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <div className="w-full md:w-72 md:min-h-screen p-4 bg-[#65821a]">
        <div className="mt-5">
          <Link to="/"><div className="w-full border p-2 mb-2 text-center shadow hover:bg-white hover:font-bold transition duration-500 hover:scale-110">
            Users
          </div>
          </Link>
          <Link to="/product"><div className="w-full border p-2 mb-2 text-center shadow hover:bg-white hover:font-bold transition duration-500 hover:scale-110">
            Products
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
