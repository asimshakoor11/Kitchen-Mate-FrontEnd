
import { useEffect, useState } from "react";

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
        <div className="max-w-xs">
          <div className="text-amber-500 font-medium mb-2">100% Natural</div>
          <h1 className="text-3xl font-bold mb-2">Fresh Smoothie & Summer Juice</h1>
          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis elementum.
          </p>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded-md shadow-sm">
            SHOP NOW
          </button>
        </div>
        
        <div className="absolute right-0 bottom-0 w-48 h-full flex items-center justify-center">
          <img 
            src="https://i.imgur.com/42vSMQU.png" 
            alt="Juice bottle" 
            className="h-full object-contain"
          />
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-amber-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Side Banners */}
      <div className="flex flex-col space-y-4">
        {/* First Offer Banner */}
        <div className="bg-[#F2FCE2] rounded-lg p-4 flex items-center h-1/2">
          <div className="flex-1 pr-2">
            <div className="text-xl font-bold text-gray-800 mb-1">20% Off</div>
            <div className="text-gray-700 mb-1">Fruits & Vegetables</div>
            <div className="text-xs text-gray-500">Shop Collection →</div>
          </div>
          <div className="w-1/2">
            <img 
              src="https://i.imgur.com/PVkQZtl.jpg" 
              alt="Fresh vegetables" 
              className="h-20 object-contain ml-auto"
            />
          </div>
        </div>
        
        {/* Second Offer Banner */}
        <div className="bg-[#FBF2F0] rounded-lg p-4 flex items-center h-1/2">
          <div className="flex-1 pr-2">
            <div className="text-xl font-bold text-gray-800 mb-1">15% Off</div>
            <div className="text-gray-700 mb-1">Baked Products</div>
            <div className="text-xs text-gray-500">Shop Collection →</div>
          </div>
          <div className="w-1/2">
            <img 
              src="https://i.imgur.com/8rPjSjo.jpg" 
              alt="Baked goods" 
              className="h-20 object-contain ml-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
