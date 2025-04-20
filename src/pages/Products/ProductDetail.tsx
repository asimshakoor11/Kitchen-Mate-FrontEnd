import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  Star,
  ShoppingCart,
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getProduct, getProducts } from "@/services/productService";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

// FAQ data
const faqData = [
  {
    question: "Is this product organic?",
    answer:
      "Yes, this product is 100% certified organic with no artificial additives or preservatives.",
  },
  {
    question: "How long does it last after opening?",
    answer:
      "Once opened, the product should be refrigerated and consumed within 5-7 days for optimal freshness and taste.",
  },
  {
    question: "Is the packaging recyclable?",
    answer:
      "Yes, we use eco-friendly packaging that is fully recyclable. The glass bottles can be reused or recycled.",
  },
  {
    question: "Where do you source your ingredients?",
    answer:
      "We source all our ingredients from certified organic farms that follow sustainable farming practices.",
  },
];

const isNewProduct = (createdAt: string | Date): boolean => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - createdDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7; // "new" if added within the last 7 days
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // In a real app, you'd fetch product data based on the ID from params
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const allProducts = response.data;

        const filtered = allProducts.filter(
          (prod) => prod.category === product?.category
        );

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [product]);

  const isNew = isNewProduct(product?.createdAt);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const imageUrl = product.imageUrls[0];
    const price = product.price;
    const title = product.title;
    const stock = product.stock;
    addToCart({ id, imageUrl, price, title, stock });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-500">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/products" className="hover:text-amber-500">
            Products
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{product?.title}</span>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={product?.imageUrls[selectedImage]}
                  alt={product?.title}
                  className="w-full h-full object-cover"
                />
                {isNew && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-2">
                {product?.imageUrls.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-amber-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <div className="mb-4">
                <div className="flex items-center text-sm text-amber-500 mb-2">
                  <span className="font-medium">{product?.category}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(10)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="ml-1 text-gray-600">10</span>
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {product?.title}
                </h1>

                <div className="flex items-center mb-4">
                  <span className="text-xl md:text-2xl font-bold text-amber-500">
                    Rs: {product?.price}
                  </span>
                  {product?.price && (
                    <span className="ml-2 text-gray-400 line-through">
                      {product?.price - 100}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{product?.description}</p>
              </div>

              {/* Actions */}
              <div className="space-y-4 mb-6">
                {/* Quantity */}
                <div className="flex items-center">
                  <span className="text-gray-700 w-24">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <ChevronDown size={16} />
                    </button>
                    <span className="px-3 py-2 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      disabled={quantity >= product?.stock}
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                  <span className="ml-4 text-sm text-gray-500">
                    {product?.stock} available
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  {product?.stock > 0 ? (
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-600"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <p className="flex-1 text-amber-500 hover:text-amber-600">Out of Stock</p>
                  )}
                  <Button variant="outline" className="px-4">
                    <Heart size={18} />
                  </Button>
                  <Button variant="outline" className="px-4">
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>

              {/* Product Attributes */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex">
                  <span className="text-gray-500 w-32">Origin:</span>
                  <span className="text-gray-900">{product?.origin}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Quality:</span>
                  <span className="text-gray-900">{product?.quality}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Storage:</span>
                  <span className="text-gray-900">{product?.storage}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Packaging:</span>
                  <span className="text-gray-900">{product?.packaging}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Weight:</span>
                  <span className="text-gray-900">{product?.weight}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-200 mt-6">
                <div className="flex flex-col items-center text-center">
                  <Truck size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs">Quality Guarantee</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RefreshCw size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left font-medium py-2"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      expandedFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 text-gray-600 text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts?.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <ProductCard
                  id={product._id}
                  imageUrl={product.imageUrls[0]}
                  title={product.title}
                  price={product.price}
                  createdAt={product.createdAt}
                  stock={product.stock}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
