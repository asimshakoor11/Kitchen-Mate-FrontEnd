
import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/Admin/AdminLayout";

// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: "Air Fryer XL",
    image: "https://images.unsplash.com/photo-1619218005459-c8356f68c3c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpciUyMGZyeWVyfGVufDB8fDB8fHww",
    category: "Kitchen Appliances",
    price: 129.99,
    stock: 24,
    status: "In Stock"
  },
  {
    id: 2,
    name: "Non-Stick Pan Set",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2tpbmclMjBwYW58ZW58MHx8MHx8fDA%3D",
    category: "Cookware",
    price: 89.99,
    stock: 18,
    status: "In Stock"
  },
  {
    id: 3,
    name: "Professional Blender",
    image: "https://images.unsplash.com/photo-1583665356686-b5e85d2fd13e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Kitchen Appliances",
    price: 199.99,
    stock: 12,
    status: "In Stock"
  },
  {
    id: 4,
    name: "Cutlery Set (24 Pieces)",
    image: "https://images.unsplash.com/photo-1546549095-5d8bf25bb68b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3V0bGVyeXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Utensils",
    price: 59.99,
    stock: 30,
    status: "In Stock"
  },
  {
    id: 5,
    name: "Espresso Coffee Maker",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D",
    category: "Kitchen Appliances",
    price: 249.99,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: 6,
    name: "Food Processor",
    image: "https://images.unsplash.com/photo-1593784578367-c212b5d8a809?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMHByb2Nlc3NvcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Kitchen Appliances",
    price: 149.99,
    stock: 7,
    status: "Low Stock"
  },
  {
    id: 7,
    name: "Ceramic Dining Set",
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRpbmluZyUyMHNldHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Tableware",
    price: 119.99,
    stock: 15,
    status: "In Stock"
  },
  {
    id: 8,
    name: "Stand Mixer",
    image: "https://images.unsplash.com/photo-1588613254810-eded84d2be9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhbmQlMjBtaXhlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Kitchen Appliances",
    price: 329.99,
    stock: 3,
    status: "Low Stock"
  }
];

const AdminProducts = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed successfully"
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Link to="/admin/products/add">
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setProducts(dummyProducts)}>
                All Products
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setProducts(dummyProducts.filter(p => p.status === "In Stock"))}>
                In Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setProducts(dummyProducts.filter(p => p.status === "Low Stock"))}>
                Low Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setProducts(dummyProducts.filter(p => p.status === "Out of Stock"))}>
                Out of Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-white rounded-md border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === "In Stock" 
                            ? "bg-green-100 text-green-800" 
                            : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
