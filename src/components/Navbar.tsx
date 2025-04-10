
import { useState } from "react";
import { Search, User, Heart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl">
            <span>Kitchen Mate</span>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for your favorite products..."
                className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 focus:outline-none"
              />
              <div className="absolute right-3 top-2.5">
                <Search size={18} className="text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* Contact and Icons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-500">For Delivery</p>
              <p className="text-sm font-semibold">+880-1686608</p>
            </div>
            <User size={20} className="text-gray-700" />
            <Heart size={20} className="text-gray-700" />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? 
                <X size={24} className="text-gray-700" /> : 
                <Menu size={24} className="text-gray-700" />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for your favorite products..."
              className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 focus:outline-none"
            />
            <div className="absolute right-3 top-2.5">
              <Search size={18} className="text-gray-500" />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
