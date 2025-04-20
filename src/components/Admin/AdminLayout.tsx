
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut, 
  Menu, 
  X, 
  Plus,
  User,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast({
      title: "Logout successful",
      description: "You have been logged out of the admin panel"
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/admin/dashboard" className="font-bold text-lg">Kitchen Mate Admin</Link>
        </div>
        <button onClick={handleLogout} className="p-2 rounded-md hover:bg-gray-100">
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex ">
        {/* Sidebar */}
        <aside 
          className={`min-h-screen fixed top-0 bottom-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 ease-in-out lg:translate-x-0`}
        >
          <div className="p-4 border-b hidden lg:flex items-center justify-between">
            <Link to="/admin/dashboard" className="font-bold text-lg">Kitchen Mate Admin</Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            <Link
              to="/admin/dashboard"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                isActive("/admin/dashboard") 
                  ? "bg-amber-100 text-amber-800" 
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/products"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                isActive("/admin/products") 
                  ? "bg-amber-100 text-amber-800" 
                  : "hover:bg-gray-100"
              }`}
            >
              <Package size={20} />
              <span>Products</span>
            </Link>
            <Link
              to="/admin/products/add"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                isActive("/admin/products/add") 
                  ? "bg-amber-100 text-amber-800" 
                  : "hover:bg-gray-100"
              }`}
            >
              <Plus size={20} />
              <span>Add Product</span>
            </Link>
            <Link
              to="/admin/orders"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                isActive("/admin/orders") 
                  ? "bg-amber-100 text-amber-800" 
                  : "hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={20} />
              <span>Orders</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              target="_blank"
            >
              <Store size={20} />
              <span>View Store</span>
            </Link>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@kitchenmate.com</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 max-h-screen overflow-y-scroll">
          {/* Mobile sidebar backdrop */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
