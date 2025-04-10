
import { useState } from "react";
import { Package, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for user orders
const mockOrders = [
  {
    id: "#ORD-12345",
    date: "2025-04-01",
    items: [
      { id: 1, name: "Premium Coffee Maker", quantity: 1, price: 149.99 },
      { id: 2, name: "Coffee Grinder", quantity: 1, price: 59.99 },
    ],
    total: 209.98,
    status: "delivered",
    deliveryDate: "2025-04-08",
    trackingNumber: "TRK123456789",
  },
  {
    id: "#ORD-12346",
    date: "2025-04-05",
    items: [
      { id: 3, name: "Electric Kettle", quantity: 1, price: 79.99 },
    ],
    total: 79.99,
    status: "shipped",
    deliveryDate: "2025-04-12",
    trackingNumber: "TRK987654321",
  },
  {
    id: "#ORD-12347",
    date: "2025-04-08",
    items: [
      { id: 4, name: "Stand Mixer", quantity: 1, price: 249.99 },
      { id: 5, name: "Mixing Bowls Set", quantity: 1, price: 39.99 },
    ],
    total: 289.98,
    status: "processing",
    deliveryDate: "Estimated 2025-04-15",
    trackingNumber: "Pending",
  },
  {
    id: "#ORD-12348",
    date: "2025-04-10",
    items: [
      { id: 6, name: "Food Processor", quantity: 1, price: 129.99 },
    ],
    total: 129.99,
    status: "packed",
    deliveryDate: "Estimated 2025-04-17",
    trackingNumber: "TRK456789123",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processing":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case "packed":
      return <Package className="h-4 w-4 text-blue-500" />;
    case "shipped":
      return <Truck className="h-4 w-4 text-purple-500" />;
    case "delivered":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "processing":
      return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Processing</Badge>;
    case "packed":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Packed</Badge>;
    case "shipped":
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Shipped</Badge>;
    case "delivered":
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Delivered</Badge>;
    default:
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Unknown</Badge>;
  }
};

const UserOrders = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredOrders = mockOrders.filter(order => {
    // Filter by status
    if (filter !== "all" && order.status !== filter) {
      return false;
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesOrderId = order.id.toLowerCase().includes(query);
      const matchesItem = order.items.some(item => item.name.toLowerCase().includes(query));
      if (!matchesOrderId && !matchesItem) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">View and track your order history</p>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search orders..."
              className="w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all-orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all-orders">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-orders">
            {filteredOrders.length > 0 ? (
              <div className="bg-white shadow rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm truncate">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            {getStatusBadge(order.status)}
                          </div>
                        </TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="w-full">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-4">
                  <Package className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No orders found</h3>
                  <p className="text-gray-500 text-center mt-1">
                    {searchQuery || filter !== "all" 
                      ? "Try changing your search or filter" 
                      : "You haven't placed any orders yet"}
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/products">Shop Now</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="processing">
            <OrdersTab orders={mockOrders.filter(o => o.status === "processing")} />
          </TabsContent>
          
          <TabsContent value="active">
            <OrdersTab orders={mockOrders.filter(o => ["packed", "shipped"].includes(o.status))} />
          </TabsContent>
          
          <TabsContent value="delivered">
            <OrdersTab orders={mockOrders.filter(o => o.status === "delivered")} />
          </TabsContent>
        </Tabs>
        
        {filteredOrders.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking Information</CardTitle>
                <CardDescription>Track the status of your recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{order.id}</div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Ordered on {order.date} · Expected delivery: {order.deliveryDate}
                      </div>
                      
                      {/* Order progress tracker */}
                      <div className="relative mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs">Order Placed</span>
                          <span className="text-xs">Processing</span>
                          <span className="text-xs">Packed</span>
                          <span className="text-xs">Shipped</span>
                          <span className="text-xs">Delivered</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500`}
                            style={{ 
                              width: order.status === "processing" ? "25%" :
                                    order.status === "packed" ? "50%" :
                                    order.status === "shipped" ? "75%" :
                                    order.status === "delivered" ? "100%" : "0%" 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tracking Number:</span>
                          <span className="text-sm font-medium">{order.trackingNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Items:</span>
                          <span className="text-sm font-medium">{order.items.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">View Order Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const OrdersTab = ({ orders }: { orders: any[] }) => {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center pt-6 pb-4">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No orders in this category</h3>
          <p className="text-gray-500 text-center mt-1">
            You don't have any orders with this status
          </p>
          <Button className="mt-4" asChild>
            <a href="/products">Shop Now</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <div className="max-w-[200px]">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="text-sm truncate">
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  {getStatusBadge(order.status)}
                </div>
              </TableCell>
              <TableCell>{order.deliveryDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="w-full">
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserOrders;
