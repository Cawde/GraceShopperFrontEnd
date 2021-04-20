import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import moment from "moment";
import "./SingleGame.css";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const SingleGame = ({ game, userId, setOrders, setGuestOrder, guestOrder }) => {
  console.log(game);
  // const date = moment(game.releaseDate).format("DD MMM, YYYY");
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
        orderCreated: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.orderStatus === "created"
          ? toast.success(`${productTitle} has been added to cart.`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.error(`This order already exists`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
    // alert(`${productTitle} has been added to cart.`);

    toast.success(`${productTitle} has been added to cart.`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return game ? (
    <div className="single-game">
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${game.splash}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          filter: "brightness(50%)",
        }}
      ></div>
      <div id="gp-purchase" className="details-container">
        <div className="gp-game-icon">
          <img
            src={game.imageURL}
            width="200"
            height="230"
            className="game-icon"
          />
        </div>
        <div id="gp-info" className="game-info">
          <h4 className="gp-game-title">{game.title}</h4>
          <div className="gp-game-sub-details">
            <p>
              {" "}
              {game.platform} <span>&#8226;</span> {game.category}
              <span> &#8226; </span>
              <span
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                {game.ageRating}{" "}
              </span>
            </p>
          </div>
          <p>{game.description}</p>
        </div>
        <div className="gp-game-details">
          <h4>${game.price}</h4>
          <Button
            className="add-to-cart-button"
            onClick={() => {
              if (userId) {
                addOrderToCart(game.id, game.title);
              } else {
                addProductGuest(game.id, game.title, game.price, game.imageURL);
              }
            }}
          >
            Add to Cart
          </Button>
          <div> &nbsp; </div>
          <p>
            <b>Publisher:</b> {game.publisher}
          </p>
          <p>
            <b>Developer:</b> {game.developer}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/games" />
  );
};

export default SingleGame;
