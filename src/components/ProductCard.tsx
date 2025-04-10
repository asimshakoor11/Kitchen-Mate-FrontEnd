
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  id?: number;
}

const ProductCard = ({ imageUrl, title, price, rating, isNew, isSale, id = 1 }: ProductCardProps) => {
  const [isWishlist, setIsWishlist] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative group">
      {/* Badge */}
      {isNew && (
        <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-sm">
          NEW
        </div>
      )}
      {isSale && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-sm">
          SALE
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlist(!isWishlist);
          }}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={16} className={isWishlist ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Add to cart:", title);
          }}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart size={16} className="text-gray-500" />
        </button>
      </div>
      
      {/* Product Image */}
      <Link to={`/products/${id}`} className="block">
        <div className="h-36 p-4 flex items-center justify-center bg-gray-50 transition-transform group-hover:scale-105">
          <img src={imageUrl} alt={title} className="h-full object-contain" />
        </div>
      
        {/* Product Details */}
        <div className="p-4">
          {/* Star Rating */}
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < rating ? "text-amber-400" : "text-gray-300"}`}>
                ★
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3 className="text-sm font-medium mb-1 truncate">{title}</h3>
          
          {/* Price and Buy Button */}
          <div className="flex justify-between items-center mt-2">
            <div className="font-bold text-gray-900">{price}</div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Buy now:", title);
              }}
              className="text-xs text-amber-500 hover:text-amber-700 font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
