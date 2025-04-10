
import { useState } from "react";
import { 
  Search, 
  Calendar, 
  Filter,
  Eye,
  TruckIcon,
  PackageCheck,
  CheckCircle,
  XCircle
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
import AdminLayout from "@/components/Admin/AdminLayout";

// Dummy order data
const dummyOrders = [
  {
    id: "ORD-4832",
    date: "2023-04-09",
    customer: "John Smith",
    items: [
      { name: "Air Fryer XL", quantity: 1, price: 129.99 },
      { name: "Cutlery Set", quantity: 1, price: 59.99 }
    ],
    total: 189.98,
    status: "Pending",
    address: "123 Main St, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "john.smith@example.com"
  },
  {
    id: "ORD-4831",
    date: "2023-04-09",
    customer: "Jane Cooper",
    items: [
      { name: "Professional Blender", quantity: 1, price: 199.99 }
    ],
    total: 199.99,
    status: "Processing",
    address: "456 Oak Ave, Chicago, IL 60611",
    phone: "(555) 987-6543",
    email: "jane.cooper@example.com"
  },
  {
    id: "ORD-4830",
    date: "2023-04-08",
    customer: "Robert Johnson",
    items: [
      { name: "Non-Stick Pan Set", quantity: 1, price: 89.99 },
      { name: "Ceramic Dining Set", quantity: 1, price: 119.99 }
    ],
    total: 209.98,
    status: "Shipped",
    address: "789 Pine Rd, Seattle, WA 98101",
    phone: "(555) 456-7890",
    email: "robert.j@example.com"
  },
  {
    id: "ORD-4829",
    date: "2023-04-08",
    customer: "Sarah Williams",
    items: [
      { name: "Espresso Coffee Maker", quantity: 1, price: 249.99 }
    ],
    total: 249.99,
    status: "Delivered",
    address: "101 Cedar Ln, Austin, TX 78701",
    phone: "(555) 234-5678",
    email: "sarah.w@example.com"
  },
  {
    id: "ORD-4828",
    date: "2023-04-07",
    customer: "Michael Brown",
    items: [
      { name: "Food Processor", quantity: 1, price: 149.99 },
      { name: "Stand Mixer", quantity: 1, price: 329.99 }
    ],
    total: 479.98,
    status: "Delivered",
    address: "202 Elm St, San Francisco, CA 94107",
    phone: "(555) 876-5432",
    email: "michael.b@example.com"
  },
  {
    id: "ORD-4827",
    date: "2023-04-07",
    customer: "Emily Davis",
    items: [
      { name: "Knife Set", quantity: 1, price: 79.99 }
    ],
    total: 79.99,
    status: "Cancelled",
    address: "303 Maple Dr, Miami, FL 33101",
    phone: "(555) 765-4321",
    email: "emily.d@example.com"
  }
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800"
};

type Order = typeof dummyOrders[0];

const AdminOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId} is now ${newStatus}`,
    });
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and process customer orders
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search orders by ID or customer name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setOrders(dummyOrders)}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOrders(dummyOrders.filter(o => o.status === "Pending"))}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOrders(dummyOrders.filter(o => o.status === "Processing"))}>
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOrders(dummyOrders.filter(o => o.status === "Shipped"))}>
                  Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOrders(dummyOrders.filter(o => o.status === "Delivered"))}>
                  Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOrders(dummyOrders.filter(o => o.status === "Cancelled"))}>
                  Cancelled
                </DropdownMenuItem>
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
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[order.status as keyof typeof statusColors]
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
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
                                onClick={() => updateOrderStatus(order.id, "Processing")}
                                disabled={order.status === "Processing" || order.status === "Cancelled"}
                              >
                                Mark as Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, "Shipped")}
                                disabled={order.status === "Shipped" || order.status === "Delivered" || order.status === "Cancelled"}
                              >
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, "Delivered")}
                                disabled={order.status === "Delivered" || order.status === "Cancelled"}
                              >
                                Mark as Delivered
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, "Cancelled")}
                                disabled={order.status === "Delivered" || order.status === "Cancelled"}
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
                    <TableCell colSpan={6} className="text-center py-6">
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
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Order placed on {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p>{selectedOrder.email}</p>
                    <p>{selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Shipping Address</h3>
                  <div className="space-y-1 text-sm">
                    <p>{selectedOrder.address}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Order Status</h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusColors[selectedOrder.status as keyof typeof statusColors]
                  }`}>
                    {selectedOrder.status}
                  </span>
                  {selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Delivered" && (
                    <div className="flex space-x-2 ml-2">
                      {selectedOrder.status === "Pending" && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-blue-600"
                          onClick={() => updateOrderStatus(selectedOrder.id, "Processing")}
                        >
                          <PackageCheck className="mr-1 h-3 w-3" />
                          Process
                        </Button>
                      )}
                      {selectedOrder.status === "Processing" && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-indigo-600"
                          onClick={() => updateOrderStatus(selectedOrder.id, "Shipped")}
                        >
                          <TruckIcon className="mr-1 h-3 w-3" />
                          Ship
                        </Button>
                      )}
                      {selectedOrder.status === "Shipped" && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-green-600"
                          onClick={() => updateOrderStatus(selectedOrder.id, "Delivered")}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Deliver
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="text-red-600"
                        onClick={() => updateOrderStatus(selectedOrder.id, "Cancelled")}
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
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-sm font-medium text-right">
                        Total:
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">
                        ${selectedOrder.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
