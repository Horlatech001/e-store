import Products from "./Products"
import Banner from "../images/banner.png"
const Home = ({ products }) => {


  return (
    <>
      <div className="container-fluid home">
        <div className="banner-left">
          <h4 className="">Welcome to Horlatech Store</h4>
          <h3>Your Number 1 Online Store</h3>
        </div>
        <div className="banner-right">
          <img src={Banner} alt="banner-img" />
        </div>
      </div>
      <Products products={products} />
    </>
  )
}

export default Home