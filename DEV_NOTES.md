A. How did you structure your components and why?

I kept the project modular and easy to maintain.
Each part of the UI is its own component — for example, Navbar, FilterBar, ProductCard, and Footer.
Home.jsx handles listing, filtering, and pagination, while ProductDetails.jsx focuses only on single product info.
This separation keeps logic simple and helps reusability (like the dark mode toggle shared across pages).

B. How did you handle filtering, sorting, and pagination?

Filtering and sorting are managed using React state.
When the user searches, selects a category, or changes sort order, a single function applyFilters() runs to update the filtered product list.
Pagination is handled by slicing the filtered data — only a few products per page are shown using currentPage and productsPerPage.
Buttons for “Previous” and “Next” simply update the current page and trigger smooth scrolling to the top.

C. What challenges did you face, and how did you debug them?

The main challenge was Dark Mode — since Tailwind CSS v4 no longer supports the old dark: prefix by default.
To fix this, I replaced Tailwind’s dark classes with inline conditional styles using isDark state and stored the mode in localStorage so it persists.
Another small issue was the footer floating up on shorter pages; I solved it by using a flex-col min-h-screen layout in App.jsx to push it naturally to the bottom.

D. How does your data fetching strategy work?

Data is fetched from the Fake Store API inside a useEffect() hook on component mount.
All fetching logic is centralized in a helper file api.js so it can be reused or changed later.
If the request fails, a friendly error state is shown with a retry button.
This keeps data loading, error handling, and UI states clearly separated.