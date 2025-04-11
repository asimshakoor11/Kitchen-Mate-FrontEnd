import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, Star, ShoppingCart, ChevronRight, Truck, Shield, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

// Mock product data (would come from an API in a real application)
const productData = {
  id: 1,
  title: "Organic Fresh Orange Juice",
  description: "Experience the refreshing taste of 100% organic orange juice, squeezed from the freshest oranges. No added sugar, preservatives, or artificial flavors – just pure orange goodness in every sip. Perfect for breakfast or a healthy refreshment anytime.",
  price: "PKR 218.00",
  oldPrice: "PKR 250.00",
  rating: 4.5,
  reviewCount: 127,
  stock: 15,
  imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Juice",
  isNew: true,
  images: [
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1577606571367-a4864d1f0686?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  attributes: [
    { name: "Origin", value: "California, USA" },
    { name: "Quality", value: "Organic Certified" },
    { name: "Storage", value: "Refrigerate after opening" },
    { name: "Packaging", value: "Glass bottle" },
    { name: "Weight", value: "1 Liter" },
  ],
};

// Related products
const relatedProducts = [
  {
    id: 2,
    title: "Farm Fresh Organic Milk",
    price: "PKR 180.00",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dairy",
    isSale: true,
  },
  {
    id: 3,
    title: "Organic Green Apple Pack",
    price: "PKR 150.00",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fruits",
  },
  {
    id: 4,
    title: "Fresh Whole Grain Bread",
    price: "PKR 120.00",
    rating: 3,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Bakery",
  },
  {
    id: 5,
    title: "Organic Strawberry Basket",
    price: "PKR 250.00",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fruits",
    isNew: true,
  },
];

// FAQ data
const faqData = [
  {
    question: "Is this product organic?",
    answer: "Yes, this product is 100% certified organic with no artificial additives or preservatives."
  },
  {
    question: "How long does it last after opening?",
    answer: "Once opened, the product should be refrigerated and consumed within 5-7 days for optimal freshness and taste."
  },
  {
    question: "Is the packaging recyclable?",
    answer: "Yes, we use eco-friendly packaging that is fully recyclable. The glass bottles can be reused or recycled."
  },
  {
    question: "Where do you source your ingredients?",
    answer: "We source all our ingredients from certified organic farms that follow sustainable farming practices."
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // In a real app, you'd fetch product data based on the ID from params
  const product = productData;
  
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
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-500">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/products" className="hover:text-amber-500">Products</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{product.title}</span>
        </div>
        
        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-amber-500" : "border-transparent"
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <div className="mb-4">
                <div className="flex items-center text-sm text-amber-500 mb-2">
                  <span className="font-medium">{product.category}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-1 text-gray-600">({product.reviewCount})</span>
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
                
                <div className="flex items-center mb-4">
                  <span className="text-xl md:text-2xl font-bold text-amber-500">{product.price}</span>
                  {product.oldPrice && (
                    <span className="ml-2 text-gray-400 line-through">{product.oldPrice}</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{product.description}</p>
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
                    <span className="px-3 py-2 w-12 text-center">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                  <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button className="flex-1 bg-amber-500 hover:bg-amber-600">
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
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
                {product.attributes.map((attribute, index) => (
                  <div key={index} className="flex">
                    <span className="text-gray-500 w-32">{attribute.name}:</span>
                    <span className="text-gray-900">{attribute.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Benefits */}
              <div className="mt-auto grid grid-cols-3 gap-2 pt-6 border-t border-gray-200 mt-6">
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
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
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
                  <div className="mt-2 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
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
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
