import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, handleRemoveProduct, handleAddProduct, totalPrice }) => {

  return (
    <div className="container carts mb-5">
      <div className="cart-items">
        <div className="cart-items-header mt-5 mb-3">Shopping Cart</div>
        {cart.length === 0 && (
          <div className="cart-items-empty">
            <div className="cart-box mt-5">
              <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            </div>
            <p className="mt-3">No Items in your cart.</p>
          </div>
        )}

        <div>
          {cart.map((item) => (
            <div key={item.id.stringValue} className="cart-items-list mb-3 pt-4 pb-4">
              <img
                src={item.image.mapValue.fields.src.stringValue}
                alt={item.title.stringValue}
                className="cart-items-img"
              />
              <div className="cart-items-name">{item.title.stringValue.substring(0, 21)}</div>
              <div className="cart-items-function">
                <button
                  className="cart-items-add"
                  onClick={() => handleAddProduct(item)}
                >
                  +
                </button>
                <button
                  className="cart-items-remove"
                  onClick={() => handleRemoveProduct(item)}
                >
                  -
                </button>
              </div>
              <div className="cart-item-price">{item.quantity} * {item.price.stringValue}</div>
            </div>
          ))}
        </div>
        {cart.length === 0 ? "" : <>
          <div className="cart-items-total-price-box">
            <div className="cart-items-name">Sub Total</div>
            <div className="cart-item-price">${totalPrice}</div>
            <div>
              <Link to="/checkout">
                <button className="btn btn-primary rounded-5 buy-btn">Continue Checkout</button>
              </Link>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
};

export default Cart;
