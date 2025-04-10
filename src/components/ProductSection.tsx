
import { useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  viewAllLink: string;
  filterOptions: string[];
}

// Mock product data
const products = [
  {
    id: 1,
    title: "Summer Fresh Melon Juice Drink",
    price: "PKR 218.00",
    rating: 4,
    imageUrl: "https://i.imgur.com/JyVIB5o.png",
  },
  {
    id: 2,
    title: "Summer Fresh Mango Juice Drink",
    price: "PKR 218.00",
    rating: 5,
    imageUrl: "https://i.imgur.com/ulXVfEU.png",
    isSale: true,
  },
  {
    id: 3,
    title: "Summer Fresh Cucumber Juice Drink",
    price: "PKR 218.00",
    rating: 4,
    imageUrl: "https://i.imgur.com/42vSMQU.png",
  },
  {
    id: 4,
    title: "Summer Fresh Milk Juice Drink",
    price: "PKR 218.00",
    rating: 3,
    imageUrl: "https://i.imgur.com/PVkQZtl.jpg",
  },
  {
    id: 5,
    title: "Summer Fresh Banana Juice Drink",
    price: "PKR 218.00",
    rating: 5,
    imageUrl: "https://i.imgur.com/JyVIB5o.png",
    isNew: true,
  },
];

const ProductSection = ({ title, viewAllLink, filterOptions }: ProductSectionProps) => {
  const [activeFilter, setActiveFilter] = useState(filterOptions[0] || "");
  
  return (
    <div className="my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        
        <div className="flex items-center justify-between w-full sm:w-auto">
          {filterOptions.length > 0 && (
            <div className="flex space-x-4 text-sm overflow-x-auto scrollbar-none">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`whitespace-nowrap ${
                    activeFilter === option 
                    ? "text-gray-900 font-medium" 
                    : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          <a href={viewAllLink} className="text-sm text-gray-600 hover:text-gray-900 flex items-center whitespace-nowrap">
            View All Categories →
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            rating={product.rating}
            isNew={product.isNew}
            isSale={product.isSale}
          />
        ))}
      </div>
      
      {/* Second Row of Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id + 100}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            rating={product.rating}
            isNew={product.isNew}
            isSale={product.isSale}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
