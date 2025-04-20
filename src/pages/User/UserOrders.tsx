import { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyOrders } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processing":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case "pending":
      return <Package className="h-4 w-4 text-blue-500" />;
    case "shipped":
      return <Truck className="h-4 w-4 text-purple-500" />;
    case "delivered":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "cancelled":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "processing":
      return (
        <Badge
          variant="outline"
          className="bg-orange-100 text-orange-800 border-orange-300"
        >
          Processing
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 border-blue-300"
        >
          Pending
        </Badge>
      );
    case "shipped":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-800 border-purple-300"
        >
          Shipped
        </Badge>
      );
    case "delivered":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Delivered
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-300"
        >
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-800 border-gray-300"
        >
          Unknown
        </Badge>
      );
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-orange-100 text-orange-800";
    case "pending":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders({ id: storedUser.id });
        setOrders(response.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error",
          description: "Failed to fetch your orders",
          variant: "destructive",
        });
      }
    };

    fetchOrders();
  }, [toast]);

  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filter !== "all" && order.status !== filter) {
      return false;
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesOrderId = order._id.toLowerCase().includes(query);
      const matchesItem = order.items.some((item) =>
        item.title.toLowerCase().includes(query)
      );
      if (!matchesOrderId && !matchesItem) {
        return false;
      }
    }

    return true;
  });

  const viewOrderDetails = (order: (typeof orders)[0]) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">
              View and track your order history
            </p>
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">
                          #{order._id.slice(-6)}
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm truncate">
                                {item.quantity}x {item.title}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          Rs:{" "}
                          {(order.totalAmount + order.deliveryFee).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            {getStatusBadge(order.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.status === "delivered"
                            ? "Delivered"
                            : order.status === "shipped"
                            ? "In Transit"
                            : "Processing"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => viewOrderDetails(order)}
                          >
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
            <OrdersTab
              orders={orders.filter((o) => o.status === "processing")}
              onViewDetails={viewOrderDetails}
            />
          </TabsContent>

          <TabsContent value="active">
            <OrdersTab
              orders={orders.filter((o) =>
                ["pending", "shipped"].includes(o.status)
              )}
              onViewDetails={viewOrderDetails}
            />
          </TabsContent>

          <TabsContent value="delivered">
            <OrdersTab
              orders={orders.filter((o) => o.status === "delivered")}
              onViewDetails={viewOrderDetails}
            />
          </TabsContent>
        </Tabs>

        {filteredOrders.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking Information</CardTitle>
                <CardDescription>
                  Track the status of your recent orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">
                          #{order._id.slice(-6)}
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Ordered on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>

                      {/* Order progress tracker */}
                      <div className="relative mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs">Order Placed</span>
                          <span className="text-xs">Processing</span>
                          <span className="text-xs">Shipped</span>
                          <span className="text-xs">Delivered</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500`}
                            style={{
                              width:
                                order.status === "processing"
                                  ? "25%"
                                  : order.status === "shipped"
                                  ? "75%"
                                  : order.status === "delivered"
                                  ? "100%"
                                  : "0%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Items:</span>
                          <span className="text-sm font-medium">
                            {order.items.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="text-sm font-medium">
                            Rs:{" "}
                            {(order.totalAmount + order.deliveryFee).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full mt-4" variant="outline"
                            onClick={() => viewOrderDetails(order)}
                            >
                        View Order Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?._id.slice(-6)}</DialogTitle>
            <DialogDescription>
              Order placed on {new Date(selectedOrder?.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6">

              <div>
                <h3 className="text-sm font-semibold mb-2">Order Status</h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Order Items</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Rs: {item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Rs: {(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-sm font-medium text-right">Total:</td>
                      <td className="px-6 py-4 text-sm font-bold">Rs: {selectedOrder.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface OrdersTabProps {
  orders: any[];
  onViewDetails: (order: any) => void;
}

const OrdersTab = ({ orders, onViewDetails }: OrdersTabProps) => {
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
            <TableRow key={order._id}>
              <TableCell className="font-medium">#{order._id.slice(-6)}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="max-w-[200px]">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="text-sm truncate">
                      {item.quantity}x {item.title}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>Rs: {(order.totalAmount + order.deliveryFee).toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  {getStatusBadge(order.status)}
                </div>
              </TableCell>
              <TableCell>
                {order.status === "delivered"
                  ? "Delivered"
                  : order.status === "shipped"
                  ? "In Transit"
                  : "Processing"}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onViewDetails(order)}
                >
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
