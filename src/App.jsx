import React, { useState, useEffect } from "react";
import "./App.css";
import cartIcon from "./assets/cart.svg";

const mockProducts = [
  { id: 1, name: "Item #1", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 2, name: "Item #2", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 3, name: "Item #3", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 4, name: "Item #4", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 5, name: "Item #5", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 6, name: "Item #6", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 7, name: "Item #7", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
  { id: 8, name: "Item #8", price: "PHP", desc: "text here",  image: "https://placehold.co/300x200?text=IMG" },
];

const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img className="product-img" src={product.image} alt={product.name} />

      <div className="product-info">
        <h2 className="name">{product.name}</h2>
        <p className="price">{product.price}</p>

        <button className="btn-add">Add to Cart</button>
      </div>
    </div>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">STORE</h1>

        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="cart-btn">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          Cart
          <span className="cart-icon"></span>
        </button>
      </header>

      {/* Item Cards in grid */}
      <main className="content">
        <div className="grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="no-result">No items found.</p>
        )}
      </main>

      <footer className="footer">
        UnPAUSE
      </footer>
    </div>
  );
};

export default App;
