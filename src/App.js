import Home from './pages/Home';
import Navbar from './component/Navbar';
import Product from './pages/Product';
import { Routes, Route } from "react-router-dom";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./Config";
import { useEffect, useState } from "react";
import Products from './pages/Products';
import Footer from './component/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';



function App() {
  const [products, setproducts] = useState([]);
  const [cart, setCart] = useState([]);


  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is in the cart, update its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleAddProduct = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    }
  }

  const handleRemoveProduct = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct.quantity === 1) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== product.id))
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      )
    }
  }

  const totalPrice = cart.reduce(
    (price, item) => price + item.quantity * item.price.stringValue,
    0
  );

  const getProducts = async () => {
    try {
      const docRef = query(collection(db, "Products"));
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        let d = docSnap.docs.map(
          (dc) => dc._document.data.value.mapValue.fields
        );
        // console.log("Document data:", d);
        setproducts(d);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Navbar cart={cart}/>
      <Routes>
        <Route path="/" exact element={<Home getProducts={getProducts} products={products}  />} />
        <Route path="/product/:id" element={<Product getProducts={getProducts} products={products} addToCart={addToCart} />} />
        <Route path="/products" element={<Products getProducts={getProducts} products={products} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} handleRemoveProduct={handleRemoveProduct} handleAddProduct={handleAddProduct} totalPrice={totalPrice}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} totalPrice={totalPrice}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
