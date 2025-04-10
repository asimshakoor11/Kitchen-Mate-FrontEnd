
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/Admin/AdminLayout";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.description || !image) {
      toast({
        title: "Validation error",
        description: "Please fill in all the fields and upload an image",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to add the product
    // For now, we'll just show a success message
    toast({
      title: "Product added successfully",
      description: `${formData.name} has been added to your inventory`,
    });
    
    // Redirect to products page
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product in your inventory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kitchen Appliances">Kitchen Appliances</SelectItem>
                      <SelectItem value="Cookware">Cookware</SelectItem>
                      <SelectItem value="Utensils">Utensils</SelectItem>
                      <SelectItem value="Tableware">Tableware</SelectItem>
                      <SelectItem value="Bakeware">Bakeware</SelectItem>
                      <SelectItem value="Food Storage">Food Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      min="0" 
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input 
                      id="stock" 
                      name="stock" 
                      type="number" 
                      min="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description" 
                    rows={5}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Product Image</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Drag and drop your image here, or{" "}
                        <label htmlFor="image-upload" className="text-amber-500 cursor-pointer hover:text-amber-600">
                          browse
                        </label>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <input 
                      id="image-upload" 
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/admin/products")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                  Add Product
                </Button>
              </div>
            </form>
          </div>
          
          <div className="order-first md:order-last">
            <div className="sticky top-6">
              <h3 className="text-lg font-medium mb-4">Product Preview</h3>
              <div className="border rounded-md p-6 space-y-4">
                {imagePreview ? (
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">No image uploaded</p>
                  </div>
                )}
                <div className="space-y-2">
                  <h4 className="font-medium">
                    {formData.name || "Product name"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formData.category || "Category"}
                  </p>
                  <p className="font-bold">
                    {formData.price ? `$${formData.price}` : "$0.00"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {formData.description || "Product description will appear here..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
