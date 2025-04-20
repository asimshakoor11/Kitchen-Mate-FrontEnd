import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createOrder = async (orderData: {
  id: string;
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  shippingInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  totalAmount: number;
  deliveryFee: number;
  paymentMethod: string;
}) => {
  const response = await axios.post(`${API_URL}/order`, orderData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/order/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getMyOrders = async (id: { id: string }) => {
  const response = await axios.get(`${API_URL}/order/my-orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: id, // Will append ?id=123 to the URL
  });
  return response.data;
};

export const getOrder = async (id: string) => {
  const response = await axios.get(`${API_URL}/order/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axios.patch(
    `${API_URL}/order/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/order/stats`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
