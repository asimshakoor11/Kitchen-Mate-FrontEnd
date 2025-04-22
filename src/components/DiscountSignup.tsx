
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiscountSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate('/login')
  };
  
  return (
    <div className="bg-[#F0F7FB] rounded-lg p-6 my-12">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-4xl font-bold mb-2">
            Get <span className="text-amber-500">25% Discount</span> <br />
            on your first purchase
          </h3>
          <p className="text-gray-600 text-sm mb-4 max-w-xs">
          Sign up now and enjoy an exclusive 25% discount on your first order.
          Stay updated with our latest offers and products!
          </p>
        </div>
        
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="abc@mail.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="flex items-start text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mt-1 mr-2"
                  required
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscountSignup;
