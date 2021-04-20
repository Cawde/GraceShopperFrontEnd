import { useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditAdminStatus = ({ userId, userIsAdmin, users, setUsers }) => {
  const [isAdmin, setIsAdmin] = useState(userIsAdmin);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function editUser(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(`https://peaceful-spire-60083.herokuapp.com/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          isAdmin: isAdmin,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            const updatedUser = users.map((user) => {
              if (user.id === userId) {
                toast.success(
                  `${result.username}'s admin status has changed.`,
                  {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                return result;
              } else {
                return user;
              }
            });

            setUsers(updatedUser);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#7209b7",
          border: "#7209b7",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={handleShow}
      >
        Change Admin Status
      </Button>
      <Modal show={show} onHide={handleClose} className="special_modal">
        <Modal.Header closeButton>
          <Modal.Title>Change Admin Status.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={editUser}>
          <Modal.Body>
            <Form.Group controlId="formBasicIsAdmin">
              <Form.Label>IsAdmin:</Form.Label>
              <Form.Control
                type="checkbox"
                checked={isAdmin ? "checked" : null}
                placeholder={userIsAdmin}
                onChange={() => {
                  if (isAdmin === true) {
                    setIsAdmin(false);
                  } else {
                    setIsAdmin(true);
                  }
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Change Admin Status
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAdminStatus;
