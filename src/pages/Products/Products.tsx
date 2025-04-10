
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample product data
const productData = [
  {
    id: 1,
    title: "Organic Fresh Orange Juice",
    price: "PKR 218.00",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Juice",
    isNew: true,
  },
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
  {
    id: 6,
    title: "Fresh Organic Eggs Pack",
    price: "PKR 190.00",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dairy",
  },
  {
    id: 7,
    title: "Fresh Cucumber Pack",
    price: "PKR 90.00",
    rating: 3,
    imageUrl: "https://images.unsplash.com/photo-1566702455105-f1d0dd778288?q=80&w=2847&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Vegetables",
  },
  {
    id: 8,
    title: "Organic Honey Jar",
    price: "PKR 350.00",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Groceries",
    isSale: true,
  },
  {
    id: 9,
    title: "Fresh Organic Avocado",
    price: "PKR 200.00",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fruits",
  },
  {
    id: 10,
    title: "Premium Organic Coffee Beans",
    price: "PKR 280.00",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Groceries",
    isNew: true,
  },
];

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Juice", "Groceries"];

const Products = () => {
  const [products, setProducts] = useState(productData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  useEffect(() => {
    let filteredProducts = [...productData];
    
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "priceAsc":
        filteredProducts.sort((a, b) => 
          parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - 
          parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "priceDesc":
        filteredProducts.sort((a, b) => 
          parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - 
          parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (by id)
        filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, sortBy]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Filter Button (Mobile) */}
            <Button 
              variant="outline" 
              className="md:hidden flex items-center justify-between w-full"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filter & Sort
              </span>
              <ChevronDown size={16} className={`transform transition-transform ${filterMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">
              {/* Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Category: {selectedCategory} <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category} 
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-amber-100" : ""}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort By <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("default")}>
                    Default
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("priceAsc")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("priceDesc")}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Rating
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Panel */}
        {filterMenuOpen && (
          <div className="md:hidden mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-sm rounded-full ${
                        selectedCategory === category
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { id: "default", label: "Default" },
                    { id: "priceAsc", label: "Price: Low to High" },
                    { id: "priceDesc", label: "Price: High to Low" },
                    { id: "rating", label: "Rating" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`block w-full text-left px-3 py-1.5 text-sm rounded ${
                        sortBy === option.id
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <ProductCard
                  imageUrl={product.imageUrl}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  isNew={product.isNew}
                  isSale={product.isSale}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("default");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
