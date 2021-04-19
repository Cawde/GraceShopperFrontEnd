import { useState, React } from "react";
import { Redirect } from "react-router-dom";
import { login, getToken, setUserIdLocal, getUserId } from "../auth";
import Footer from './Footer'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Register = ({
  username,
  setUsername,
  token,
  setToken,
  authenticate,
  setAuthentication,
  guestOrder,
  setGuestOrder,
  setOrders,
  userId,
  setUserId
}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPassWordConfirmation] = useState();

  function createUser(event) {
    event.preventDefault();
    if (email && username && password && password === passwordConfirmation) {
      fetch("https://peaceful-spire-60083.herokuapp.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.error) {
            alert(result.error);
          }
          if(result.message === `duplicate key value violates unique constraint "users_email_key"`)
          {alert("Email already used. Please use another email to register.")}
          if (result.token !== undefined) {
            login(result.token);
            setToken(getToken());
            isLoggedIn(result);
            setUserIdLocal(result.userId);
            setUserId(result.userId);
            if (guestOrder.length) {
              moveOrdersFromGuestToUser(result.userId);
            }
          }
        })
        .catch(console.error);
    }
  }

  const isLoggedIn = (result) => {
    if (result.token) {
      console.log("is registered");
      setAuthentication(true);
      alert(result.message);
    } else {
      console.log("not registered");
    }
  };

  if (authenticate && token) {
    return <Redirect to="./" />;
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
    localStorage.removeItem('products');
  }

  return (<>
    <div>
      <Container>
        <center>
          <h1 
          style={{ 
            padding: "35px", 
            fontSize: "50px",
            fontFamily: "'Megrim', cursive",
            fontWeight: "bold",
            color: "white"
            }}>REGISTER HERE!</h1>
        </center>
        <Form onSubmit={createUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "white"  }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label style={{ color: "white"  }}>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "white"  }}>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              minLength="8"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Form.Text id="passwordHelpInline" muted>
              Must be greater than 7 characters.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label style={{ color: "white"  }}>Password Confirmation</Form.Label>
            <Form.Control
              placeholder="Password Confirmation"
              minLength="8"
              onChange={(event) => {
                setPassWordConfirmation(event.target.value);
              }}
            />
            <Form.Text id="passwordHelpInline" muted>
              Must be greater than 7 characters.
            </Form.Text>
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
        </Form>
      </Container>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
