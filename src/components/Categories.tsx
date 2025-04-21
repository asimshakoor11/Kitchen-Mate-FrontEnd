import { Apple, Carrot, Croissant, Milk, GlassWater, ShoppingBag } from "lucide-react";
import { ProductCategory } from "@/types/product";
import { Link } from "react-router-dom";

const categories: { name: ProductCategory; icon: JSX.Element }[] = [
  { 
    name: "Fruits", 
    icon: <Apple className="text-red-500" /> 
  },
  { 
    name: "Vegetables", 
    icon: <Carrot className="text-orange-500" /> 
  },
  { 
    name: "Bakery", 
    icon: <Croissant className="text-amber-600" /> 
  },
  { 
    name: "Dairy", 
    icon: <Milk className="text-blue-400" /> 
  },
  { 
    name: "Juice", 
    icon: <GlassWater className="text-green-500" /> 
  },
  { 
    name: "Groceries", 
    icon: <ShoppingBag className="text-purple-500" /> 
  },
];

const Categories = () => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <Link to="/products" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          View All Categories →
        </Link>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              {category.icon}
            </div>
            <span className="text-xs text-center font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
