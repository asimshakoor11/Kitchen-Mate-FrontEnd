
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts, Product } from "@/lib/supabase";

interface ProductSectionProps {
  title: string;
  viewAllLink: string;
  filterOptions: string[];
}

const ProductSection = ({ title, viewAllLink, filterOptions }: ProductSectionProps) => {
  const [activeFilter, setActiveFilter] = useState(filterOptions[0] || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(activeFilter !== "All Products" ? activeFilter : undefined, 10);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [activeFilter]);
  
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
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.slice(0, 5).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={`PKR ${product.price.toFixed(2)}`}
                rating={product.rating}
                isNew={product.isNew}
                isSale={product.isSale}
              />
            ))}
          </div>
          
          {/* Second Row of Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {products.slice(5, 10).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={`PKR ${product.price.toFixed(2)}`}
                rating={product.rating}
                isNew={product.isNew}
                isSale={product.isSale}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSection;
