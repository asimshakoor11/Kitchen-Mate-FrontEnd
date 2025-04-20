import { useAuth } from "@/contexts/AuthContext";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <footer className="bg-white pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Social */}
          <div>
            <h2 className="font-bold text-xl mb-4">Kitchen Mate</h2>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Utilities */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin
                </Link>
              </li>
              {isAuthenticated && user && (
                <li>
                  <Link
                    to="/orders"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Get Started</h3>
            <ul className="space-y-2 text-sm">
              {isAuthenticated ? (
                <li>
                  <p
                    className="text-gray-600 hover:text-gray-900"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/singup"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Subscribe Us</h3>
            <p className="text-sm text-gray-600 mb-3">
              Get the latest update on our organic food.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-gray-900 hover:bg-black text-white px-4 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2023 Kitchen Mate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
