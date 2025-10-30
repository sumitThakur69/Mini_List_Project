// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Home from './pages/Home';
// import ProductDetails from './pages/ProductDetails';


// function App() {
//   return (
    
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//         </Routes>
//       </Router>
   
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to HTML element coze Tailwind CSS v4 no longer supports the old dark: prefix by default. ass.
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/product/:id" element={<ProductDetails isDark={isDark} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </Router>
    
  );
}

export default App;
