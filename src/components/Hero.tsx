
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {/* Main Hero Banner */}
      <div className="md:col-span-2 bg-[#F0F7FB] rounded-lg p-8 relative overflow-hidden">
        <div className="max-w-[250px] md:max-w-xs relative z-20">
          <div className="text-amber-500 font-medium mb-2">100% Natural</div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Fresh Groceries & Summer Juice</h1>
          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis elementum.
          </p>
          <Link to={'/products'}>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded-md shadow-sm">
            SHOP NOW
          </button>
          </Link>
        </div>
        
        <div className="absolute right-0 z-10 bottom-0 w-36 md:w-48 h-full  items-center justify-center">
          <img 
            src="/images/product-thumb-1.png" 
            alt="Juice bottle" 
            className="h-full object-contain"
          />
        </div>
        
      </div>
      
      {/* Side Banners */}
      <div className="flex flex-col space-y-4">
        {/* First Offer Banner */}
        <div className="bg-[#F2FCE2] rounded-lg flex items-center h-1/2">
          <div className="flex-1 p-4  pr-2">
            <div className="text-2xl font-bold text-gray-800 mb-1">20% Off</div>
            <div className="text-gray-700 mb-1">Fruits & Vegetables</div>
          </div>
          <div className="w-1/2">
            <img 
              src="/images/ad-image-1.png" 
              alt="Fresh vegetables" 
              className="h-40 object-contain ml-auto"
            />
          </div>
        </div>
        
        {/* Second Offer Banner */}
        <div className="bg-[#FBF2F0] rounded-lg flex items-center h-1/2">
          <div className="flex-1 pr-2 p-4 ">
            <div className="text-2xl font-bold text-gray-800 mb-1">15% Off</div>
            <div className="text-gray-700 mb-1">Baked Products</div>
          </div>
          <div className="w-1/2">
            <img 
              src="/images/ad-image-2.png" 
              alt="Baked goods" 
              className="h-40 object-contain ml-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
