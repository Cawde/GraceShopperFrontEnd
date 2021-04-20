import { useState, React } from "react";
import { Redirect } from "react-router-dom";
import { login, getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const RegisterModal = ({
  username,
  setUsername,
  token,
  setToken,
  authenticate,
  setAuthentication,
}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPassWordConfirmation] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function createUser(event) {
    event.preventDefault();
    if (username && password && password === passwordConfirmation) {
      fetch("https://nameless-cove-00092.herokuapp.com/api/users/register", {
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
          if (result.name === "IncorrectCredentialsError") {
            alert(
              "Username has already been taken. Please choose another username to use."
            );
          }
          if (result.token !== undefined) {
            login(result.token);
            setToken(getToken());
            isLoggedIn(result);
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
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Register
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Form onSubmit={createUser}>
          <Modal.Body>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
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
              <Form.Label>Password Confirmation</Form.Label>
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
            </Form.Group>{" "}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
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
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
export default RegisterModal;
