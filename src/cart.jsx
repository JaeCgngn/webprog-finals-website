import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

const mockCart = [
  { id: 1, name: "Item #1", price: "PHP 100", qty: 2, image: "https://placehold.co/300x200?text=IMG" },
  { id: 2, name: "Item #3", price: "PHP 250", qty: 1, image: "https://placehold.co/300x200?text=IMG" },
];

const Cart = () => {
    const navigate = useNavigate();
    const itemTotal = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const deliveryFee = 50; //placeholder sample
    const discount = 20;     
    const subtotal = itemTotal + deliveryFee - discount;

return (
    <div className="cart-container">
        <h2>Your Cart</h2>

        {mockCart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
        ) : (
            <div className="cart-content">
                <div className="cart-items">
                    {mockCart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>Price: {item.price}</p>
                                <p>Quantity: {item.qty}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="order-summary">

                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Item Total:</span>
                        <span>PHP {itemTotal}</span>
                    </div>
                    
                    <div className="summary-row">
                        <span>Delivery Fee:</span>
                        <span>PHP {deliveryFee}</span>
                    </div>

                    <div className="summary-row">
                        <span>Discount:</span>
                        <span>- PHP {discount}</span>
                    </div>

                    <div className="summary-row total">
                        <span>Subtotal:</span>
                        <span>PHP {subtotal}</span>
                    </div>

                    <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                        Proceed to Checkout
                    </button>

                </div>
            </div>
        )}

        <div className="back-link">
            <Link to="/">Back to Store</Link>
        </div>
    </div>
);
};

export default Cart;
