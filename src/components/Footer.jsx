import React from "react";

const Footer = ({ isDark }) => {
  return (
    <footer
      className="border-t text-center py-10 text-sm flex flex-col gap-2 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? "#111827" : "#ffffff",
        borderColor: isDark ? "#374151" : "#e5e7eb",
        color: isDark ? "#9ca3af" : "#4b5563",
      }}
    >
      <p>© {new Date().getFullYear()} Product Explorer. All rights reserved.</p>
      <a
        href="#"
        className="block mt-1 hover:underline transition-colors"
        style={{
          color: isDark ? "#60a5fa" : "#2563eb",
        }}
      >
        Made with by Ready
      </a>
    </footer>
  );
};

export default Footer;
