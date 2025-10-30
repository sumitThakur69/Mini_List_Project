# Product Explorer

A responsive product listing web app built with React + Tailwind CSS (v4).
It includes features like dark/light mode, filtering, sorting, pagination, and a clean modern UI.

# Features

Dark/Light Mode toggle (persistent using localStorage)

Filter by Category and Sort by Price/Rating

Responsive Grid/List View Toggle

Pagination for product listing

Product Details Page with back navigation

Built using Tailwind CSS v4 and React Router

# Component Structure
Component	Responsibility
App.jsx	Manages global dark mode state and routes between pages
Navbar.jsx	Navigation bar + theme toggle button
Home.jsx	Main product listing page with filters, sorting, and pagination
FilterBar.jsx	Handles category and sorting selection
ProductCard.jsx	Displays individual product info (grid/list mode)
ProductDetails.jsx	Detailed view of a single product + back button
Footer.jsx	Fixed footer with theme-adaptive design
Filtering, Sorting & Pagination Logic

# Filtering:
When a category is selected, the product list is filtered using that category.

const filtered = products.filter(
  (p) => category === "All" || p.category === category
);

# Sorting:
Applied on the filtered list before pagination.

if (sort === "Low to High") filtered.sort((a, b) => a.price - b.price);

# Pagination:
Controlled using currentPage and itemsPerPage.

const start = (currentPage - 1) * itemsPerPage;
const paginated = filtered.slice(start, start + itemsPerPage);

# Resetting Pagination:
useEffect resets the current page to 1 whenever filters or sorting change.

# Dark Mode Handling

Controlled globally via a state variable isDark.

Stored in localStorage to persist user preference.

All major containers use inline style bindings for Tailwind v4 compatibility:

style={{
  backgroundColor: isDark ? "#111827" : "#ffffff",
  color: isDark ? "#e5e7eb" : "#1f2937",
}}

# Challenges & Debugging

Tailwind v4 Dark Mode:
dark: classes weren’t applying properly, so inline styles were used.
This ensured full color control on all components.

# Data Fetching

Products are fetched from a Fake Store API using useEffect.

Data is stored in a local state and filtered/sorted client-side.

# Fetch logic:

useEffect(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Fetch error:", err));
}, []);

# Tech Stack

React 18+

Tailwind CSS v4

React Router DOM

Lucide Icons for Grid/List icons

Developer Notes


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
