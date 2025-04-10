
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
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
            <h3 className="font-semibold text-sm mb-4">Utilities</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Login</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Register</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Payment Methods</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Online Support</a></li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Subscribe Us</h3>
            <p className="text-sm text-gray-600 mb-3">Get the latest update on our organic food.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                className="bg-gray-900 hover:bg-black text-white px-4 rounded-r-md"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2023 Kitchen Mate. All rights reserved.</p>
          <p className="mt-1">Made in 🔥 Template by <span className="font-medium">lovable.dev</span> | Distributed by <span className="font-medium">lovable.dev</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
