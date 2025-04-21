import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  createdAt: string; // or Date if you convert it right away
  id: string;
  stock: number;
}

const isNewProduct = (createdAt: string | Date): boolean => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - createdDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7; // "new" if added within the last 7 days
};

const ProductCard = ({
  imageUrl,
  title,
  price,
  createdAt,
  id,
  stock,
}: ProductCardProps) => {
  const isNew = isNewProduct(createdAt);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart({ id, imageUrl, title, price, stock });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative group">
      {/* Badge */}
      {isNew && (
        <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-sm">
          NEW
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/products/${id}`} className="block">
        <div className="h-36 flex items-center justify-center bg-gray-50 transition-transform group-hover:scale-105">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 bg-white">
          {/* Title */}
          <h3 className="text-sm font-medium mb-1 truncate">{title}</h3>

          {/* Price and Buy Button */}
          <div className="flex justify-between items-center mt-2">
            <div className="font-bold text-gray-900">Rs: {price}</div>
            {stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="text-base text-amber-500 hover:text-amber-700 font-medium"
              >
                Buy Now
              </button>
            ) : (
              <p className="text-amber-500 hover:text-amber-600">
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
