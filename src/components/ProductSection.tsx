import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/services/productService";
import { Link } from "react-router-dom";

interface ProductSectionProps {
  title: string;
  viewAllLink: string;
}

const ProductSection = ({ title, viewAllLink }: ProductSectionProps) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        (response);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">{title}</h2>

        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link
            to={viewAllLink}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center whitespace-nowrap"
          >
            View All Categories →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allProducts.map((product) => (
          <ProductCard
            id={product._id}
            imageUrl={product.imageUrls[0]}
            title={product.title}
            price={product.price}
            createdAt={product.createdAt}
            stock={product.stock}
          />
        ))}
      </div>

    </div>
  );
};

export default ProductSection;
