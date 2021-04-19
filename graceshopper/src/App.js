import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  Home,
  Admin,
  Login,
  Logout,
  Register,
  Games,
  SingleGame,
  Checkout,
  Error,
  ThankYou,
  Navigation,
  Profile,
  Footer,
} from "./components";
import { getToken, getUser, getUserId } from "./auth";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [authenticate, setAuthentication] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [game, setGame] = useState(null);
  const [userId, setUserId] = useState(getUserId());
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [guestOrder, setGuestOrder] = useState(
    localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : []
  );

  console.log(isAdmin);
  console.log(authenticate);
  console.log(userId);
  const getOrdersForUser = () => {
    fetch(`https://peaceful-spire-60083.herokuapp.com/api/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (userId) {
      getOrdersForUser();
    }

    if (getToken() && getToken() !== undefined) {
      setAuthentication(true);
    }
    if (getUser()) {
      setIsAdmin(getUser());
    }
    if (getUserId()) {
      setUserId(getUserId());
      console.log(userId);
    }
  }, []);

  return (
    <Router>
      <Navigation
        userId={userId}
        orders={orders}
        setOrders={setOrders}
        guestOrder={guestOrder}
        setGuestOrder={setGuestOrder}
        cart={cart}
        setCart={setCart}
        authenticate={authenticate}
        username={username}
      />
      {/* <nav>
        <Link to="/">HOME</Link>
        <Link to="/admin">ADMIN</Link>
        {getToken() && authenticate ? (
          <Link to="/logout" className="link">
            LOGOUT
          </Link>
        ) : (
          <Link to="/login" className="link">
            LOGIN
          </Link>
        )}
        <Link to="/register">REGISTER</Link>
        <Link to="/games">GAMES</Link>
        {/* <Link to="/games/(name of game)">individual game</Link> */}
      {/* <Link to="/checkout">CHECKOUT</Link>
      </nav> */}

      <main>
        <Switch>
          <Route path="/admin">
            {authenticate && getToken() && getUser() ? (
              <Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            ) : (
              <Error />
            )}
          </Route>

          <Route path="/login">
            <Login
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              orders={orders}
              setOrders={setOrders}
              guestOrder={guestOrder}
              setGuestOrder={setGuestOrder}
              userId={userId}
              setUserId={setUserId}
            />
          </Route>
          <Route path="/logout">
            <Logout
              setUserId={setUserId}
              setOrders={setOrders}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
              setGuestOrder={setGuestOrder}
            />
          </Route>
          <Route path="/register">
            <Register
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              guestOrder={guestOrder}
              setOrders={setOrders}
              setGuestOrder={setGuestOrder}
              userId={userId}
              setUserId={setUserId}
            />
          </Route>
          <Route exact path="/games/:gametitle">
            <SingleGame
              game={game}
              userId={userId}
              setOrders={setOrders}
              setGuestOrder={setGuestOrder}
              guestOrder={guestOrder}
            />
          </Route>
          <Route path="/games">
            <Games
              orders={orders}
              setOrders={setOrders}
              game={game}
              setGame={setGame}
              userId={userId}
              guestOrder={guestOrder}
              setGuestOrder={setGuestOrder}
            />
          </Route>

          <Route path="/checkout">
            <Checkout
              userId={userId}
              setOrders={setOrders}
              orders={orders}
              cart={cart}
              setCart={setCart}
              guestOrder={guestOrder}
              setGuestOrder={setGuestOrder}
            />
          </Route>
          <Route path="/profile">
            <Profile username={username} userId={userId} />
          </Route>
          <Route path="/thankyou">
            <ThankYou />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
