import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, X } from "lucide-react";
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
import { ProductFormData, ProductCategory } from "@/types/product";
import { createProduct, getProduct, updateProduct } from "@/services/productService";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    category: "Fruits",
    price: "",
    stock: 0,
    description: "",
    origin: "",
    quality: "",
    storage: "",
    packaging: "",
    weight: "",
    imageUrls: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUpdateMode = !!id;

  useEffect(() => {
    if (isUpdateMode) {
      const fetchProduct = async () => {
        try {
          const response = await getProduct(id);
          const product = response.data;
          setFormData({
            title: product.title,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            origin: product.origin,
            quality: product.quality,
            storage: product.storage,
            packaging: product.packaging,
            weight: product.weight,
            imageUrls: product.imageUrls,
          });
          setImagePreviews(product.imageUrls);
        } catch (error) {
          console.error('Error fetching product:', error);
          toast({
            title: "Error",
            description: "Failed to fetch product details",
            variant: "destructive",
          });
          navigate("/admin/products");
        }
      };
      fetchProduct();
    }
  }, [id, isUpdateMode, navigate, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: ProductCategory) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setImages(prev => [...prev, ...newFiles]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (
      !formData.title ||
      !formData.category ||
      !formData.price ||
      !formData.stock ||
      !formData.description ||
      (!isUpdateMode && images.length === 0)
    ) {
      toast({
        title: "Validation error",
        description: "Please fill in all the required fields" + (!isUpdateMode ? " and upload at least one image" : ""),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock.toString());
      formDataToSend.append('description', formData.description);
      formDataToSend.append('origin', formData.origin);
      formDataToSend.append('quality', formData.quality);
      formDataToSend.append('storage', formData.storage);
      formDataToSend.append('packaging', formData.packaging);
      formDataToSend.append('weight', formData.weight);

      // Append images only if there are new ones
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      if (isUpdateMode) {
        await updateProduct(id, formDataToSend);
        toast({
          title: "Product updated successfully",
          description: `${formData.title} has been updated`,
        });
      } else {
        await createProduct(formDataToSend);
        toast({
          title: "Product added successfully",
          description: `${formData.title} has been added to your inventory`,
        });
      }

      navigate("/admin/products");
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to ${isUpdateMode ? 'update' : 'add'} product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isUpdateMode ? "Update Product" : "Add New Product"}
          </h1>
          <p className="text-muted-foreground">
            {isUpdateMode 
              ? "Update the product details below" 
              : "Create a new product in your inventory"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Name</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
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
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Bakery">Bakery</SelectItem>
                      <SelectItem value="Dairy">Dairy</SelectItem>
                      <SelectItem value="Juice">Juice</SelectItem>
                      <SelectItem value="Groceries">Groceries</SelectItem>
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
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="Enter product origin"
                  />
                </div>

                <div>
                  <Label htmlFor="quality">Quality</Label>
                  <Input
                    id="quality"
                    name="quality"
                    value={formData.quality}
                    onChange={handleInputChange}
                    placeholder="Enter product quality"
                  />
                </div>

                <div>
                  <Label htmlFor="storage">Storage</Label>
                  <Input
                    id="storage"
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    placeholder="Enter storage instructions"
                  />
                </div>

                <div>
                  <Label htmlFor="packaging">Packaging</Label>
                  <Input
                    id="packaging"
                    name="packaging"
                    value={formData.packaging}
                    onChange={handleInputChange}
                    placeholder="Enter packaging details"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter product weight"
                  />
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
                  <Label htmlFor="image">Product Images</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Drag and drop your images here, or{" "}
                        <label
                          htmlFor="image-upload"
                          className="text-amber-500 cursor-pointer hover:text-amber-600"
                        >
                          browse
                        </label>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 5MB each
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      multiple
                    />
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? 'Saving...' 
                    : isUpdateMode 
                      ? 'Update Product' 
                      : 'Add Product'}
                </Button>
              </div>
            </form>
          </div>

          <div className="order-first md:order-last">
            <div className="sticky top-6">
              <h3 className="text-lg font-medium mb-4">Product Preview</h3>
              <div className="border rounded-md p-6 space-y-4">
                {formData.imageUrls.length > 0 ? (
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={formData.imageUrls[0]}
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
                    {formData.title || "Product name"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formData.category || "Category"}
                  </p>
                  <p className="font-bold">
                    {formData.price ? `$${formData.price}` : "$0.00"}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Origin:</span>{" "}
                      {formData.origin || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Quality:</span>{" "}
                      {formData.quality || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Storage:</span>{" "}
                      {formData.storage || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Packaging:</span>{" "}
                      {formData.packaging || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span>{" "}
                      {formData.weight || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Stock:</span>{" "}
                      {formData.stock || "0"}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {formData.description ||
                      "Product description will appear here..."}
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
