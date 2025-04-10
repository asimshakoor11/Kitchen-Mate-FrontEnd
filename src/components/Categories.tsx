
import { Leaf, Croissant, Apple, Cherry, Coffee, Salad } from "lucide-react";

const categories = [
  { name: "Fruits & Veges", icon: <Leaf className="text-green-600" /> },
  { name: "Breads & Sweets", icon: <Croissant className="text-amber-600" /> },
  { name: "Fruits & Veges", icon: <Apple className="text-yellow-600" /> },
  { name: "Fruits & Veges", icon: <Cherry className="text-red-600" /> },
  { name: "Fruits & Veges", icon: <Coffee className="text-amber-800" /> },
  { name: "Fruits & Veges", icon: <Salad className="text-green-500" /> },
];

const Categories = () => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Category</h2>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          View All Categories →
        </a>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              {category.icon}
            </div>
            <span className="text-xs text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
