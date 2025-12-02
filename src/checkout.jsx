import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.css";

const mockCart = [
{ id: 1, name: "Item #1", price: 100, qty: 2 },
{ id: 2, name: "Item #3", price: 250, qty: 1 },
];

const Checkout = () => {
const [first, setFirst] = useState("");
const [last, setLast] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");
const navigate = useNavigate();

const itemTotal = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);
const deliveryFee = 50;
const discount = 20;
const subtotal = itemTotal + deliveryFee - discount;

const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/"); // Redirect to home after checkout
};

return (
    <div className="checkout-container">
    <h2>Checkout</h2>

    <div className="checkout-content">
        {/*Shipping Form */}
        <form className="shipping-form" onSubmit={handlePlaceOrder}>
        <h3>Shipping Information</h3>

        <input
            type="text"
            placeholder="First Name"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="Last Name"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            required
        />

        <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
        />

        <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
        />

        <button type="submit">Place Order</button>
        </form>

        {/*Order Summary */}
        <div className="checkout-summary">
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
        </div>
    </div>

    <div className="back-link">
        <Link to="/cart">Back to Cart</Link>
    </div>
    </div>
);
};

export default Checkout;
