
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const totalPrice = getTotalPrice();
  const deliveryFee = 50;
  const totalWithDelivery = totalPrice + (totalPrice > 0 ? deliveryFee : 0);
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const handlePlaceOrder = () => {
    setIsSuccessModalOpen(true);
  };
  
  const handleConfirmOrder = () => {
    clearCart();
    setIsSuccessModalOpen(false);
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="Enter ZIP code" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-3 border-b border-gray-100">
                    <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="h-full w-full object-contain" />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          {item.price} × {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          PKR {(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">PKR {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium">PKR {deliveryFee.toFixed(2)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>PKR {totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg" onClick={handlePlaceOrder}>
                Place Order
              </Button>
              
              <div className="mt-4 text-xs text-gray-500">
                <p className="mb-2">Payment method: Cash on Delivery</p>
                <p>* By placing an order, you agree to our Terms and Conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex justify-center my-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="mb-2">Thank you for your order!</p>
              <p>Your order has been placed successfully and will be processed soon.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-2">
            <Button onClick={handleConfirmOrder}>
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Checkout;
