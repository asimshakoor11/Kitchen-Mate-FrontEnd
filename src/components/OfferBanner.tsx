
import { Link } from "react-router-dom";

interface OfferBannerProps {
  title: string;
  description: string;
  bgColor: string;
  imageUrl: string;
  imageSide: "left" | "right";
  badgeText: string;
}

const OfferBanner = ({ 
  title,
  description,
  bgColor,
  imageUrl,
  imageSide,
  badgeText 
}: OfferBannerProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 relative overflow-hidden`}>
      <div className={`relative z-10 max-w-xs ${imageSide === "right" ? "ml-0" : "ml-auto"}`}>
        <div className="text-amber-500 font-medium text-sm mb-2">{badgeText}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-xs mb-4">
          {description}
        </p>
        <Link to="/products" className="bg-gray-900 hover:bg-black text-white text-xs font-medium py-2 px-4 rounded inline-block">
          SHOP NOW
        </Link>
      </div>
      
      <div className={`absolute ${imageSide === "left" ? "left-0" : "right-0"} bottom-0 w-1/2 h-full`}>
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
          alt={title} 
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

export default OfferBanner;
