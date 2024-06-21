/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React, { useState, useEffect } from "react";
import logo from "./logo.png";

/////////////////////////////////////
// COMPONENT: NAVBAR
/////////////////////////////////////

const Navbar = ({ scroll }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1140);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (selector, fallbackHref) => {
    const element = document.querySelector(selector);
    if (element) {
      scroll.scrollTo(element);
    } else if (fallbackHref) {
      window.location.href = fallbackHref;
    }
  };

  return (
    <nav className="text-white w-full">
      <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/boids-algorithm/">
          <div className="flex items-center space-x-3 justify-center flex-row">
            <img src={logo} width="80" height="80" alt="Pendulum Logo" />
            <div className="sm:text-2xl text-xl md:text-4xl font-bold">
              Boids Algorithm
            </div>
          </div>
        </a>

        {isMobile ? (
          <button
            aria-label="Toggle Menu"
            className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {showMenu ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        ) : (
          <div className="md:flex flex-col md:flex-row md:space-x-8">
            <a
              href="/boids-algorithm/"
              className="cursor-pointer py-2 px-3 rounded"
            >
              Home
            </a>
            <a
              onClick={() =>
                handleNavigation("#introduction", "/boids-algorithm")
              }
              className="cursor-pointer py-2 px-3 rounded"
            >
              Introduction
            </a>
            <a
              onClick={() =>
                handleNavigation("#psuedo-code", "/boids-algorithm")
              }
              className="cursor-pointer py-2 px-3 rounded"
            >
              Psuedo-Code
            </a>
            <a
              onClick={() =>
                handleNavigation("#visualizer", "/boids-algorithm")
              }
              className="cursor-pointer py-2 px-3 rounded"
            >
              Visualizer
            </a>
          </div>
        )}
      </div>

      {isMobile && showMenu && (
        <div className="w-full" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-black">
            <a
              href="/boids-algorithm/"
              className="cursor-pointer py-2 px-3 rounded"
            >
              Home
            </a>
            <a
              onClick={() =>
                handleNavigation("#introduction", "/boids-algorithm")
              }
              className="cursor-pointer py-2 px-3 rounded"
            >
              Introduction
            </a>
            <a
              onClick={() =>
                handleNavigation("#psuedo-code", "/boids-algorithm")
              }
              className="cursor-pointer py-2 px-3 rounded"
            >
              Psuedo-code
            </a>
            <a
              onClick={() =>
                handleNavigation("#visualizer", "/boids-algorithm")
              }
              className="cursor-pointer py-2 px-3 rounded"
            >
              Visualizer
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

/////////////////////////////////////
// EXPORTING NAVBAR
/////////////////////////////////////

export default Navbar;
