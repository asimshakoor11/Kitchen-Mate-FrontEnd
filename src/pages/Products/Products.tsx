import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/services/productService";

const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Juice",
  "Groceries",
];

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "priceAsc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "priceDesc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (by id)
        filtered.sort((a, b) => a._id.localeCompare(b._id));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, allProducts]);

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
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
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
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  filterMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">
              {/* Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Category: {selectedCategory}{" "}
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category ? "bg-amber-100" : ""
                      }
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No products found matching your criteria.
            </p>
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
