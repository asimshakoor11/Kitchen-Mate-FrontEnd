import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = 50;
  const totalWithDelivery = totalPrice + (totalPrice > 0 ? deliveryFee : 0);

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode ||
      !formData.phone
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all shipping information fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        id: storedUser.id,
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          price: parseFloat(item.price),
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        shippingInfo: formData,
        totalAmount: totalWithDelivery,
        deliveryFee,
        paymentMethod: "cash",
      };

      await createOrder(orderData);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center py-3 border-b border-gray-100"
                  >
                    <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          {item.price} × {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          Rs:{" "}
                          {(
                            parseFloat(item.price.replace(/[^0-9.]/g, "")) *
                            item.quantity
                          ).toFixed(2)}
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
                  <span className="font-medium">
                    Rs: {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium">
                    Rs: {deliveryFee.toFixed(2)}
                  </span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs: {totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>

              <div className="mt-4 text-xs text-gray-500">
                <p className="mb-2">Payment method: Cash on Delivery</p>
                <p>
                  * By placing an order, you agree to our Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex justify-center my-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="mb-2">Thank you for your order!</p>
              <p>
                Your order has been placed successfully and will be processed
                soon.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-2">
            <Button onClick={handleConfirmOrder}>Continue Shopping</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;
