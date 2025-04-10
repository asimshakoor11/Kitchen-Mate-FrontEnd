
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductSection from "@/components/ProductSection";
import OfferBanner from "@/components/OfferBanner";
import DiscountSignup from "@/components/DiscountSignup";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <Hero />
        <Categories />
        <ProductSection 
          title="Trending Products" 
          viewAllLink="#" 
          filterOptions={["ALL", "FRUITS & VEGE", "JUICE"]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <OfferBanner 
            title="Luxa Dark Chocolate"
            description="Very tasty & naturally made Finest creamy, mouthwatering"
            bgColor="bg-[#FBF2F0]"
            imageUrl="/lovable-uploads/881103a4-6b3c-40c4-a191-a10c13890b86.png"
            imageSide="left"
            badgeText="NEW OFFER"
          />
          <OfferBanner 
            title="Creamy Muffins"
            description="Very tasty & naturally made Finest creamy, mouthwatering"
            bgColor="bg-[#F0F7FB]"
            imageUrl="/lovable-uploads/881103a4-6b3c-40c4-a191-a10c13890b86.png"
            imageSide="right"
            badgeText="NEW OFFER"
          />
        </div>
        <DiscountSignup />
        <ProductSection 
          title="Just arrived" 
          viewAllLink="#" 
          filterOptions={[]}
        />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
