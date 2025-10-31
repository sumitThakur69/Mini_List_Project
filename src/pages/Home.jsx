import React, { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { fetchAllProducts } from '../lib/api';

const Home = ({ isDark, toggleDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {    // Fetch product data once when component mounts
  // This avoids repeated API calls every render
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      // Reset pagination when filters or sorting change
      // Ensures user always starts from page 1 for new results
    applyFilters();
  }, [searchQuery, category, sort, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sort === 'Low to High') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'High to Low') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'Highest') filtered.sort((a, b) => b.rating.rate - a.rating.rate);

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (query) => setSearchQuery(query);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: isDark ? '#111827' : '#ffffff', color: isDark ? '#ffffff' : '#111827' }}>
        <Navbar onSearch={handleSearch} searchQuery={searchQuery} isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Loader />
        <Footer isDark={isDark} />

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: isDark ? '#111827' : '#ffffff', color: isDark ? '#ffffff' : '#111827' }}>
        <Navbar onSearch={handleSearch} searchQuery={searchQuery} isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <ErrorState message={error} onRetry={loadProducts} />
        <Footer isDark={isDark} />

      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors
    " style={{ backgroundColor: isDark ? '#111827' : '#ffffff', color: isDark ? '#ffffff' : '#111827' }}>
      <Navbar onSearch={handleSearch} searchQuery={searchQuery} isDark={isDark} toggleDarkMode={toggleDarkMode} />

      <main className="flex p-4 max-w-[1680px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex h-60">
            <FilterBar
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              isDark={isDark}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products found
              </p>

          {/* View Toggle */}
          <div
           className="flex items-center gap-2 border rounded-lg p-1 transition-colors"
            style={{
             backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
             borderColor: isDark ? "#374151" : "#d1d5db",
       }}
    >
          <button
           onClick={() => setViewMode("grid")}
            className="p-2 rounded transition-colors"
             style={{
              backgroundColor:
              viewMode === "grid"
            ? isDark
            ? "#2563eb"
            : "#2563eb"
            :"transparent",
             color:
             viewMode === "grid"
            ? "#ffffff"
            : isDark
            ? "#9ca3af"
            : "#4b5563",
    }}
  >
    <Grid size={20} />
  </button>

  <button
    onClick={() => setViewMode("list")}
    className="p-2 rounded transition-colors"
    style={{
      backgroundColor:
        viewMode === "list"
          ? isDark
            ? "#2563eb"
            : "#2563eb"
          : "transparent",
      color:
        viewMode === "list"
          ? "#ffffff"
          : isDark
          ? "#9ca3af"
          : "#4b5563",
    }}
  >
    <List size={20} />
  </button>
</div>
            </div>

            {/* Product Display */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-800 dark:text-gray-200">No products found</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <>
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} viewMode="grid" isDark={isDark} />
                    ))}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} viewMode="list" isDark={isDark} />
                    ))}
                  </div>
                )}

   {/* Pagination */}
    {totalPages > 1 && (
    <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
    {/* Previous Button */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
        border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
        color: isDark ? "#d1d5db" : "#374151",
        opacity: currentPage === 1 ? 0.5 : 1,
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
      }}
      className="px-4 py-2 rounded-md transition-colors hover:opacity-80"
    >
      Previous
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;
      const isActive = currentPage === page;
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={{
            backgroundColor: isActive
              ? "#2563eb"
              : isDark
              ? "#1f2937"
              : "#f3f4f6",
            color: isActive ? "#ffffff" : isDark ? "#d1d5db" : "#374151",
            border: isActive
              ? "none"
              : `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
          }}
          className="px-4 py-2 rounded-md transition-colors hover:opacity-80"
        >
          {page}
        </button>
      );
    })}

    {/* Next Button */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{
        backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
        border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
        color: isDark ? "#d1d5db" : "#374151",
        opacity: currentPage === totalPages ? 0.5 : 1,
        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
      }}
      className="px-4 py-2 rounded-md transition-colors hover:opacity-80"
    >
      Next
    </button>
  </div>
)}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />

    </div>
  );
};

export default Home;