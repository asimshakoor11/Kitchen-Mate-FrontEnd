import { useState } from "react";
import { User, Heart, Menu, X, ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl">
            <Link to="/">Kitchen Mate</Link>
          </div>

          {/* Nav Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Products
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Admin
            </Link>
            {isAuthenticated && user && (
              <Link
                to="/orders"
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                <Package size={18} />
                Orders
              </Link>
            )}
          </div>

          {/* Contact and Icons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-500">For Delivery</p>
              <p className="text-sm font-semibold">+880-1686608</p>
            </div>
            {isAuthenticated && user && (
              <Link to="/orders" className="flex items-center gap-2">
                <User size={20} className="text-gray-700" />
                <span className="text-sm">{user?.name}</span>
              </Link>
            )}
            {isAuthenticated && user && (
              <Link to="/cart" className="relative">
                <ShoppingCart size={20} className="text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 hover:bg-black text-white font-medium py-2 px-4 rounded"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart size={20} className="text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="py-2 text-gray-700 font-medium">
                Home
              </Link>
              <Link to="/products" className="py-2 text-gray-700 font-medium">
                Products
              </Link>
              <Link to="/admin" className="py-2 text-gray-700 font-medium">
                Admin
              </Link>
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="py-2 text-gray-700 font-medium flex items-center gap-1"
                >
                  <Package size={18} />
                  Orders
                </Link>
              )}
              <div className="flex justify-between py-2 border-t border-gray-200">
                <p className="text-sm text-gray-500">For Delivery</p>
                <p className="text-sm font-semibold">+880-1686608</p>
              </div>
              <div className="flex justify-around py-2 border-t border-gray-200">
                <button className="flex items-center space-x-1">
                  <User size={18} />
                  <span>Account</span>
                </button>
                <button className="flex items-center space-x-1">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </button>
              </div>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-gray-900 text-white font-medium py-2 px-4 rounded text-center"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
