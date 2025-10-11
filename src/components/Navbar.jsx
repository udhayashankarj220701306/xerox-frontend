import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  // const user = false;aaa
  // const user = true;
  // const isAdmin = user?.role === "admin";
  const [isOpen, setIsOpen] = useState(false);

  console.log("user in navbar:", user);
  const handleLinkClick = () => {
    // Closes the mobile menu when a link is clicked
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex"
            onClick={handleLinkClick}
          >
            Xe-rox
          </Link>

          {/* Hamburger Menu Button (visible on small screens only) */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-emerald-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links (visible on desktop, toggled on mobile) */}
          <nav
            className={`sm:flex flex sm:flex-row flex-col   sm:items-center divide-y-2 sm:divide-none border-b-2 border-emerald-500 sm:border-none divide-emerald-500 sm:gap-4 gap-4 w-full sm:w-fit mt-4 sm:mt-0 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition"
              onClick={handleLinkClick}
            >
              Home
            </Link>

            {/* Conditional Links based on user authentication */}
            {user ? (
              // Logged in user links
              <>
                {user.role === "student" && (
                  <Link
                    to={"/xerox"}
                    className="text-gray-300 hover:text-emerald-400 transition"
                    onClick={handleLinkClick}
                  >
                    Xerox
                  </Link>
                )}
                <Link
                  to={"/request"}
                  className="text-gray-300 hover:text-emerald-400 transition"
                  onClick={handleLinkClick}
                >
                  Request
                </Link>
                <Link
                  to={"/profile"}
                  className="text-gray-300 hover:text-emerald-400 transition"
                  onClick={handleLinkClick}
                >
                  Profile
                </Link>
                {/* {isAdmin && (
                  <Link
                    to={"/admin/dashboard"}
                    className="text-gray-300 hover:text-emerald-400 transition"
                    onClick={handleLinkClick}
                  >
                    Admin
                  </Link>
                )} */}
                <button
                  className="text-gray-300 hover:text-emerald-400 flex items-center transition"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span className="ml-2">Log Out</span>
                </button>
              </>
            ) : (
              // Not logged in user links
              <>
                <Link
                  to={"/signup"}
                  className="text-gray-300 hover:text-emerald-400 flex items-center transition"
                  onClick={handleLinkClick}
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-gray-300 hover:text-emerald-400 flex items-center transition"
                  onClick={handleLinkClick}
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
