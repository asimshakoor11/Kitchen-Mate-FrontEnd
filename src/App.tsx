
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { supabase } from "./lib/supabase";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminOrders from "./pages/Admin/AdminOrders";
import UserOrders from "./pages/User/UserOrders";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";
import { CartProvider } from "./contexts/CartContext";

// Create Auth Context
export const AuthContext = createContext<{
  session: any;
  user: any;
  signOut: () => Promise<void>;
}>({
  session: null,
  user: null,
  signOut: async () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ session, user, signOut }}>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/add" element={<AdminAddProduct />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
