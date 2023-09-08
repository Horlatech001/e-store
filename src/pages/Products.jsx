import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = ({ getProducts, products }) => {
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getProducts();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Make sure to set loading to false even in case of an error
      }
    };

    if (!products.length) {
      // Only fetch products if the products array is empty
      fetchData();
    } else {
      // If products are already available (e.g., when navigating back to this page), set filterData
      setFilterData(products);
      setLoading(false);
    }
  }, [getProducts, products]);


  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    )
  }

  const filterProduct = (cat) => {
    const updatedList = products.filter((x) => x.category.stringValue === cat);
    setFilterData(updatedList);
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilterData(products)}>All</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic</button>
        </div>
        {filterData.map((product) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-2 col-6 mb-4" key={product.id.stringValue}>
              <div className="card h-100 text-center p-4">
                <img className="card-img-top" src={product.image.mapValue.fields.src.stringValue} alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title mb-0">{product.title.stringValue.substring(0, 12)}...</h5>
                  <p className="card-text lead fw-bold">${product.price.stringValue}</p>
                  <Link to={`/product/${product.id.stringValue}`} className="btn btn-outline-dark">Buy Now</Link>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 l-product">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default Products
