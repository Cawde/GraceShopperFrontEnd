import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Footer from './Footer'
// import RegisterModal from "./RegisterModal";
import {toast} from 'react-toastify'
import { getToken, getUser, login, user, setUserIdLocal, getUserId } from "../auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Login = ({
  authenticate,
  setAuthentication,
  username,
  setUsername,
  setToken,
  orders,
  setOrders,
  guestOrder,
  setGuestOrder,
  userId,
  setUserId,
}) => {
  const [password, setPassword] = useState();
  const [loginSuccessful, setLoginSuccessful] = useState(false);
 

  function authentication(event) {
    event.preventDefault();
    fetch("https://peaceful-spire-60083.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.name === "IncorrectCredentialsError") {
          // alert("Username or Password does not match. Please try again.");
          // setOrders([])
       
          toast.error("Username or Password does not match. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.log(result);
          login(result.token);
          if (result.admin === true) {
            user(result.admin);
          }
          setToken(getToken());
          isLoggedIn(result);
          setUserIdLocal(result.userId);
          setUserId(result.userId);
          if (guestOrder.length) {
            moveOrdersFromGuestToUser(result.userId);
          } else {
            getOrdersForUser(result.userId);
          }
        }
      })
      .catch(console.error);
  }

  const getOrdersForUser = (id) => {
    fetch(`${API}/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch(console.error);
  };

  const moveOrdersFromGuestToUser = (id) => {
    guestOrder.forEach(order => {
      fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          productId: order.productId,
          productTitle: order.productTitle,
          count: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          getOrdersForUser(id);
        });
    });
    setGuestOrder([]);
    localStorage.removeItem("products");
  };

  const isLoggedIn = (result) => {
    if (result.name !== "IncorrectCredentialsError") {
      console.log("is logged in");
      setAuthentication(true);
      setLoginSuccessful(true);
      // alert(result.message);
      toast.success(`Welcome back, ${username}! Happy shopping!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("not logged in");
      alert(result.message);
    }
  };

  if (loginSuccessful && authenticate && !getUser()) {
    return <Redirect to="/" />;
  } else if (loginSuccessful && authenticate && getUser()) {
    return <Redirect to="./admin" />;
  }

  return ( <>
    <div>
      <Container style={{marginBottom: "175px"}}>
        <center>
          <h1 
          style={{ 
            padding: "35px", 
            color: "white",
            fontSize: "50px",
            fontFamily: "'Megrim', cursive",
            fontWeight: "bold"
            }}>LOGIN </h1>
        </center>
        <Form onSubmit={authentication}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label style={{ color: "white"  }}> Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" style={{ marginBottom: "50px"}}>
            <Form.Label style={{ color: "white"  }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Button 
           type="submit"
           style={{
            background: "#0718EB",
            background: "-webkit-linear-gradient(top right, #0718EB, #BA08B4)",
            background: "-moz-linear-gradient(top right, #0718EB, #BA08B4)",
            background: "linear-gradient(to bottom left, #0718EB, #BA08B4)",
            color: "white",
            fontWeight: "bold"
           }}
           >
            Submit
          </Button>
          <Link
            to="/register"
            style={{
              background: "#0718EB",
              background: "-webkit-linear-gradient(top right, #0718EB, #BA08B4)",
              background: "-moz-linear-gradient(top right, #0718EB, #BA08B4)",
              background: "linear-gradient(to bottom left, #0718EB, #BA08B4)",
              color: "white",
              fontWeight: "bold",
              border: "#0718EB",
              padding: "8px 45px",
              margin: "9px 15px",
              borderRadius: "7%",
              fontSize: "16px",
              textAlign: "center",
              border: "1px #007bff solid"
            }}
          >
            Register
          </Link>
        </Form>
      </Container>
      {/* <RegisterModal
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
            authenticate={authenticate}
            setAuthentication={setAuthentication}
          /> */}
          
    </div>
    <Footer/>
    </>
  );
};

export default Login;
