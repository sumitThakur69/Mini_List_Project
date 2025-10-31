import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, viewMode = "grid", isDark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">☆</span>);
      } else {
        stars.push(
          <span key={i} style={{ color: isDark ? "#4b5563" : "#d1d5db" }}>★</span>
        );
      }
    }
    return stars;
  };

  const cardStyle = {
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    borderColor: isDark ? "#374151" : "#e5e7eb",
    color: isDark ? "#e5e7eb" : "#111827",
  };

  const categoryStyle = {
    backgroundColor: isDark ? "#1e3a8a" : "#dbeafe",
    color: isDark ? "#93c5fd" : "#2563eb",
  };

  const descStyle = {
    color: isDark ? "#9ca3af" : "#4b5563",
  };

  //  GRID VIEW 
  if (viewMode === "grid") {
    return (
      <div
        onClick={handleCardClick}
        className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border"
        style={cardStyle}
      >
        <div
          className="h-64 flex items-center justify-center p-4 bg-white"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold line-clamp-1 pr-2 text-left">
              {product.title}
            </h3>

            <span
              className="text-xs font-medium px-3 py-1 rounded-full capitalize whitespace-nowrap"
              style={categoryStyle}
            >
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{renderStars(product.rating.rate)}</div>
            <span className="text-sm" style={descStyle}>
              ({product.rating.rate})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${product.price}</span>
          </div>
        </div>
      </div>
    );
  }

  //LIST VIEW
  return (
    <div
      onClick={handleCardClick}
      className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border flex flex-col sm:flex-row"
      style={cardStyle}
    >
      <div
        className="w-full sm:w-48 h-48 flex items-center justify-center p-4 bg-white"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-left">{product.title}</h3>

          <span
            className="inline-block text-xs px-2 py-1 rounded-full capitalize ml-2"
            style={categoryStyle}
          >
            {product.category}
          </span>
        </div>

        <div className="flex flex-col items-start mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(product.rating.rate)}</div>
            <span className="text-sm" style={descStyle}>
              ({product.rating.rate})
            </span>
          </div>

          <span className="text-2xl font-bold">${product.price}</span>
        </div>

        <p className="text-sm line-clamp-2 mt-auto text-left" style={descStyle}>
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
