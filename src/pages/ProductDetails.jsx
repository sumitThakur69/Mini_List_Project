import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, RefreshCcw, Shield, Sun, Moon } from "lucide-react";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🌙 Dark mode setup
  const [isDark, setIsDark] = useState(() => localStorage.getItem("darkMode") === "true");
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("darkMode", next);
  };

  // Fetch product
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Common background and text colors
  const bg = isDark ? "bg-gray-900" : "bg-gray-50";
  const text = isDark ? "text-gray-200" : "text-gray-900";
  const box = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";

  if (loading)
    return (
      <div className={`flex justify-center items-center min-h-screen ${bg} ${text}`}>
        <p>Loading product...</p>
      </div>
    );

  if (!product)
    return (
      <div className={`flex justify-center items-center min-h-screen ${bg} text-red-400`}>
        <p>Product not found</p>
      </div>
    );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg} ${text}`}>
      {/* Header */}
      <header
        className={`flex justify-between items-center px-6 py-3 border-b sticky top-0 z-10 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-lg sm:text-xl font-bold">
            Product Explorer
          </Link>
          <span>›</span>
          <span className="capitalize">{product.category}</span>
          <span>›</span>
          <span>{product.title}</span>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className={`p-2 rounded-md border ${
              isDark
                ? "bg-gray-900 border-gray-600"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-md border ${
              isDark
                ? "bg-gray-900 border-gray-600"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className={`h-100 rounded-xl p-6 flex justify-center items-center border shadow-sm ${box}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDark ? "bg-blue-900 text-blue-200" : "bg-blue-50 text-blue-800"
              }`}
            >
              {product.category}
            </span>

            <div className="flex items-center text-yellow-400">
              ⭐ <span className="ml-1">{product.rating?.rate}</span>
              <span className="ml-1 text-gray-500">(reviews)</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3 text-left">{product.title}</h2>
          <p className="text-3xl font-bold mb-4 text-left">${product.price}</p>

          <h3 className="font-semibold mb-1 text-left">Description</h3>
          <p className="text-sm mb-6 leading-relaxed text-left">{product.description}</p>

          {/* Quantity + Stock */}
          <div className={`border rounded-xl p-4 mb-6 ${box}`}>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm mb-2 font-medium text-left">Quantity</p>
                <div className="flex items-center space-x-2">
                  <button className={`border rounded-md px-3 py-1 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                    -
                  </button>
                  <span>1</span>
                  <button className={`border rounded-md px-3 py-1 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">In Stock</p>
                <p className="text-xl font-semibold">15 available</p>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Add to Cart - ${product.price}
            </button>
            <button className={`w-full mt-2 border py-2 rounded-lg ${isDark ? "border-gray-600" : "border-gray-300"}`}>
              Add to Wishlist
            </button>
          </div>

          {/* Shipping */}
          <div className={`border rounded-xl p-4 ${box}`}>
            <h3 className="font-semibold mb-2 text-left">Shipping & Returns</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Free shipping on orders over $50
              </li>
              <li className="flex items-center gap-2">
                <RefreshCcw size={16} className="text-blue-500" /> 30-day return policy
              </li>
              <li className="flex items-center gap-2">
                <Shield size={16} className="text-purple-500" /> 1-year warranty included
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
};

export default ProductDetails;
