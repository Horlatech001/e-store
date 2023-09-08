import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = ({ products, addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product with the matching ID in the products array
    const selectedProduct = products.find((p) => p.id.stringValue === id);

    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      // Handle the case where the product is not found
      setProduct(null);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Call a function to add the product to the cart
    }
  };

  const Loading = () => {
    return <div>Loading...</div>
  }

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="container py-5">
      <div className="row py-5 single">
        <div className="col-md-6 text-center">
          <img src={product.image.mapValue.fields.src.stringValue} alt={product.title.stringValue} height="300px" width="300px" id="single-product" />
        </div>
        <div className="col-md-6 product-details">
          <h4 className="text-uppercase text-black-50">{product.category.stringValue}</h4>
          <h1 className="display-5">{product.title.stringValue}</h1>
          <p className="lead fw-bolder">Rating {product.rate.stringValue}<i className="fa fa-star"></i></p>
          <h3 className="display-6 fw-bold my-4">${product.price.stringValue}</h3>
          <p className="lead">{product.description.stringValue}</p>
          <button className="btn btn-outline-dark px-4 py-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
