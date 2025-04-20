import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000.api";

export const createProduct = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/product/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const response = await axios.put(`${API_URL}/product/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/product/all`);
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await axios.get(`${API_URL}/product/${id}`);
  return response.data;
};
