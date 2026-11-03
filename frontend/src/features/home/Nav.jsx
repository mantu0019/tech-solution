 

 
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
 

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-[#319fa1] bg-[#e5f5f4]"
        : "text-gray-600 hover:text-[#319fa1] hover:bg-[#f0f9f8]"
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative min-h-screen w-full bg-[#eaf7f7]">

      {/* Global Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-20 left-10 w-72 h-72 bg-[#55b9b5]/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#369fa3]/15 rounded-full blur-3xl" />

      </div>

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full px-4 sm:px-8 pt-4 z-50">

        <div className="max-w-7xl mx-auto">

          <div className="min-h-[75px] px-5 sm:px-8 py-4 md:py-3 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-xl rounded-3xl md:rounded-full border border-white shadow-[0_8px_30px_rgba(50,120,120,0.12)]">

            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl  font-extrabold tracking-tight text-gray-900 whitespace-nowrap"
            >
              Riya<span className="text-[#55b9b5]">Cyber Cafe</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#e5f5f4] text-[#319fa1] hover:bg-[#d5eeee] transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2">

              <NavLink end to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>

              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>

            </div>

            {/* Desktop Login */}
            <Link
              to="/login"
              className="hidden md:block px-7 py-3 rounded-full bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white text-sm font-semibold shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
              Login
            </Link>

            {/* Mobile Navigation */}
            <div
              className={`w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "max-h-80 opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              }`}
            >

              <div className="flex flex-col gap-2 pt-3 pb-2 border-t border-gray-100">

                <NavLink
                  end
                  to="/"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  About
                </NavLink>

                <NavLink
                  to="/services"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  Services
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  Contact
                </NavLink>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="mt-2 px-5 py-3 text-center rounded-full bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white text-sm font-semibold shadow-md"
                >
                  Login
                </Link>

              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="relative z-10 pt-28">
        <Outlet />
        
      </main>

    </div>
  );
};

export default Nav;
 
 