import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import CartButton from "../../features/cart/components/CartButton";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/products" className="text-xl font-bold text-indigo-500">
              SingleClic
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50 border border-indigo-200 shadow-sm"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border border-gray-200 hover:border-indigo-300"
                }`
              }
              end
            >
              Products
            </NavLink>
            <CartButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when menu is closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-48 opacity-100 pb-4"
              : "max-h-0 opacity-0 pb-0"
          }`}
        >
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <NavLink
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50 border border-indigo-200"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border border-gray-200"
                }`
              }
              end
            >
              Products
            </NavLink>

            {/* Mobile Cart Button */}
            <div className="px-4">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <CartButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
