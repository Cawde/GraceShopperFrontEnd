import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleGame from "./SingleGame";
import Footer from './Footer'
import Button from "react-bootstrap/Button";
// import {addProduct} from "../auth"
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Games = ({
  game,
  setGame,
  userId,
  orders,
  setOrders,
  guestOrder,
  setGuestOrder,
}) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderComplete, setOrderComplete] = useState();
  const [orderId, setOrderId] = useState(null);
  

  const getProducts = () => {
    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch(console.error);
  };

  const getProductsByCategory = (category) => {
    fetch(`${API}/products/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data)) {
          return setProducts([data]);
        }
        setProducts(data);
      })
      .catch(console.error);
  };

  const getOrdersForUser = () => {
    fetch(`${API}/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch(console.error);
  };

  const addOrderToCart = (productId, productTitle) => {
    fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        count: 1,
        orderStatus: "created",
        orderCreated: new Date()
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.orderStatus === "created"
          ? alert(`${productTitle} has been added to cart`)
          : alert("This order already exists");
        getOrdersForUser();
      });
  };

  const addProductGuest = (
    productId,
    productTitle,
    productPrice,
    productImageURL
  ) => {
    let products = [];
    console.log(guestOrder);
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    products.push({
      productId: productId,
      productTitle: productTitle,
      productPrice: productPrice,
      productImageURL: productImageURL,
      count: 1,
    });
    localStorage.setItem("products", JSON.stringify(products));
    products = JSON.parse(localStorage.getItem("products"));
    setGuestOrder(products);
    console.log(guestOrder);
    alert(`${productTitle} has been added to cart.`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="game-page" style={{cursor: "pointer"}}>
      <h1 style={{textAlign: "center", fontFamily: "'Megrim', cursive", fontWeight: "bold", fontSize: "75px"}}>GAME HEAVEN</h1>
      <div className="search-box" style={{paddingLeft: "75px", marginBottom: "20px"}}>
        <input
          type="text"
          placeholder="Search for games here"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="games-page-container">
        <div className="genre-container">
          <aside className="genre-aside">
            <h3 onClick={getProducts}>Show All Games</h3>
            <h3 onClick={() => getProductsByCategory("JRPG")}>JRPG</h3>
            <h3 onClick={() => getProductsByCategory("ACTION-ADVENTURE")}>
              ACTION/ADVENTURE
            </h3>
            <h3 onClick={() => getProductsByCategory("RPG")}>RPG</h3>
            <h3 onClick={() => getProductsByCategory("FIGHTING")}>FIGHTING</h3>
            <h3 onClick={() => getProductsByCategory("HORROR")}>HORROR</h3>
            <h3 onClick={() => getProductsByCategory("HACK-N-SLASH")}>
              HACK AND SLASH
            </h3>
            <h3 onClick={() => getProductsByCategory("SIMULATION")}>SIMULATION</h3>
          </aside>
        </div>

        <div className="gamelist-container">
          {products
            ? products
                .filter((product) => {
                  if (searchTerm === "") {
                    return product;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <div className="results" key={index}>
                      <Link to={`/games/${product.productURL}`}>
                        <img
                          src={product.imageURL}
                          width="150"
                          height="160"
                          className="game-icon"
                          onClick={() => setGame(product)}
                        />
                      </Link>
                      <Link to={`/games/${product.productURL}`}>
                        <p className="game-title" onClick={() => setGame(product)}>
                          {product.title}
                        </p>
                      </Link>
                      <p>{product.category}</p>
                      <h4>${product.price}</h4>
                      <Button
                      style={{ 
                        background: "#0718EB",
                        background: "-webkit-linear-gradient(top right, #0718EB, #BA08B4)",
                        background: "-moz-linear-gradient(top right, #0718EB, #BA08B4)",
                        background: "linear-gradient(to bottom left, #0718EB, #BA08B4)",
                        color: "white",
                        fontWeight: "bold"
                      }}
                        onClick={() => {
                          if (userId) {
                            addOrderToCart(product.id, product.title);
                          } else {
                            addProductGuest(
                              product.id,
                              product.title,
                              product.price,
                              product.imageURL
                            );
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  );
                })
            : "There's no games to display!"}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Games;
