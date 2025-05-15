
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import { QrCode, Bell, ShoppingCart, ExternalLink } from "lucide-react";
const Index: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-6 mb-16 bg-orange-50">
        <div className="mb-8">
          <ImageCarousel />
          
          <h1 className="text-4xl font-bold mb-2 mt-6">Welcome, User!</h1>
          <p className="text-xl text-gray-600">Skip waiting in lines, not meals!!!</p>
        </div>
        
        <div className="space-y-4 mb-12">
          <Link to="/menu" className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-swayum-orange/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-swayum-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">Our Menu</h2>
                  <p className="text-gray-600">Browse our delicious offerings</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          <a 
            href="https://maps.app.goo.gl/a9kg77ZJftj3V8Z18" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-swayum-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">Find Us</h2>
                  <p className="text-gray-600">Directions to our locations</p>
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <ExternalLink className="h-5 w-5 mr-1" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
          
          <Link to="/auth" className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-swayum-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">Sign In / Sign Up</h2>
                  <p className="text-gray-600">Manage your account and orders</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
        
        {/* How It Works Section */}
        <div className="py-10">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                  <ShoppingCart size={32} className="text-swayum-orange" />
                </div>
                
              </div>
              <h3 className="text-xl font-semibold mb-2">Order & Pay Online</h3>
              <p className="text-gray-600">Browse the menu and place your order from anywhere on campus</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                  <Bell size={32} className="text-swayum-orange" />
                </div>
                
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
              <p className="text-gray-600">Receive a notification when your order is ready for pickup</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                  <QrCode size={32} className="text-swayum-orange" />
                </div>
                
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan & Collect</h3>
              <p className="text-gray-600">Show your QR code at the counter and enjoy your meal</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Index;
