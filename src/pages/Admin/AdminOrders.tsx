import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Filter,
  Eye,
  TruckIcon,
  PackageCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getAllOrders, updateOrderStatus } from "@/services/orderService";
import AdminLayout from "@/components/Admin/AdminLayout";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error",
          description: "Failed to fetch orders",
          variant: "destructive",
        });
      }
    };

    fetchOrders();
  }, [toast]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order._id === orderId ? response.order : order
      ));
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    "All",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const viewOrderDetails = (order: (typeof orders)[0]) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by order ID, customer name, or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={selectedStatus === status ? "bg-amber-100" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-white rounded-md border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        #{order._id.slice(-6)}
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.user?.name}</div>
                          <div className="text-sm text-gray-500">
                            {order.user?.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm truncate">
                              {item.quantity}x {item.title}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        Rs: {(order.totalAmount + order.deliveryFee).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {order.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Update Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(order._id, "processing")}
                                disabled={order.status === "processing" || order.status === "cancelled"}
                              >
                                Mark as Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(order._id, "shipped")}
                                disabled={order.status === "shipped" || order.status === "delivered" || order.status === "cancelled"}
                              >
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(order._id, "delivered")}
                                disabled={order.status === "delivered" || order.status === "cancelled"}
                              >
                                Mark as Delivered
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(order._id, "cancelled")}
                                disabled={order.status === "delivered" || order.status === "cancelled"}
                              >
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?._id}</DialogTitle>
            <DialogDescription>
              Order placed on{" "}
              {new Date(selectedOrder?.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2">
                    Customer Information
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{selectedOrder.shippingInfo?.firstName} {selectedOrder.shippingInfo.lastName}</p>
                    <p className="font-medium">{selectedOrder.shippingInfo?.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">
                    Shipping Address
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{selectedOrder.shippingInfo?.address}</p>
                    <p className="font-medium">{selectedOrder.shippingInfo?.zipCode}</p>
                    <p className="font-medium">{selectedOrder.shippingInfo?.city}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Order Status</h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                  {selectedOrder.status !== "cancelled" &&
                    selectedOrder.status !== "delivered" && (
                      <div className="flex space-x-2 ml-2">
                        {selectedOrder.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600"
                            onClick={() =>
                              handleStatusUpdate(selectedOrder._id, "processing")
                            }
                          >
                            <PackageCheck className="mr-1 h-3 w-3" />
                            Process
                          </Button>
                        )}
                        {selectedOrder.status === "processing" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-indigo-600"
                            onClick={() =>
                              handleStatusUpdate(selectedOrder._id, "shipped")
                            }
                          >
                            <TruckIcon className="mr-1 h-3 w-3" />
                            Ship
                          </Button>
                        )}
                        {selectedOrder.status === "shipped" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600"
                            onClick={() =>
                              handleStatusUpdate(selectedOrder._id, "delivered")
                            }
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Deliver
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() =>
                            handleStatusUpdate(selectedOrder._id, "cancelled")
                          }
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Cancel
                        </Button>
                      </div>
                    )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Order Items</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Rs: {item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Rs: {(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 text-sm font-medium text-right"
                      >
                        Total:
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">
                        Rs: ${selectedOrder.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
