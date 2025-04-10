
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
        <button className="bg-gray-900 hover:bg-black text-white text-xs font-medium py-2 px-4 rounded">
          SHOP NOW
        </button>
      </div>
      
      <div className={`absolute ${imageSide === "left" ? "left-0" : "right-0"} bottom-0 w-1/2 h-full`}>
        <img 
          src={imageUrl || "https://i.imgur.com/42vSMQU.png"} 
          alt={title} 
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

export default OfferBanner;
