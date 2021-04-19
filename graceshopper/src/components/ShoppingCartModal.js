import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {getProductForGuests} from '../auth'
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const ShoppingCartModal = ({
  userId,
  orders,
  setOrders,
  guestOrder,
  setGuestOrder,
  // cart,
  // setCart
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const tax = 1.1;
  let subtotal = 0;
  console.log(orders);
  console.log(guestOrder);

  const deleteOrder = (orderId) => {
    fetch(`https://peaceful-spire-60083.herokuapp.com/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const updatedOrders = orders.filter((order) => order.id !== orderId);
          setOrders(updatedOrders);
        }
      })
      .catch(console.error);
  };

  const removeProductFromGuestCart = (productId) => {
    let storageProducts = guestOrder;
    let products = storageProducts.filter(
      (product) => product.productId !== productId
    );
    localStorage.setItem("products", JSON.stringify(products));
    setGuestOrder(products);
  }

  const cart = () => {
    if (orders.length) {
      return orders.map((order, index) => {
        subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
        return (
          <div key={index} style={{marginTop: "20px"}}>
            <img
              className="game-icon"
              src={order.imageURL}
              width="70px"
              height="70px"
            />
            <h5>{order.productTitle}</h5>
            <h5>${order.productPrice}</h5>
            <Button variant="danger" onClick={() => deleteOrder(order.id)}>
              Remove Item
            </Button>
          </div>
        );
      });
    } else if (guestOrder.length) {
      return guestOrder.map((order, index) => {
        subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
        return (
          <>
          <div key={index} style={{marginTop: "20px"}}>
            <img
              src={order.productImageURL}
              className="game-icon"
              style={{ 
                width:"70px",
                height:"70px", 
              }}
             
            />
            <h5>{order.productTitle}</h5>
            <h5>${order.productPrice}</h5>

           
          </div>
          <div margin-bottom= "40px">
            <Button
              variant="danger"
              onClick={() => removeProductFromGuestCart(order.productId)}
            >
              Remove Item
            </Button>
          </div>

          </>
        );
      });
    }
    return <h3>There's no items in your cart</h3>
  }

  return (
    <>
      <img
      onClick={handleShow} 
      src="https://www.pinclipart.com/picdir/big/330-3306967_1600-x-1600-13-shopping-cart-icon-clipart.png"
      width= "50px"
      height="50px"
      // style={{backgroundColor: linear-gradient(to right, #3dd0d8 0%, rgba(146, 82, 234, 0.64) 100%)}}
      />

      <Modal show={show} onHide={handleClose}  className="special_modal">
        <Modal.Header closeButton style={{backgroundColor: "#510087"}}>
          <Modal.Title
          style={{
            textAlign: "center",
            fontFamily: "'Megrim', cursive",
            fontWeight: "bolder",
            fontSize: "30px",
            color: "white"
            
          }}
          >CART</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#decbe8", color: "black", textAlign: "center"}}>
          <div className="cart">
            {cart()}
            {/* {!userId ? guestShoppingCart() : "There's no items in your cart"} */}
          </div>
          <div style={{backgroundColor: "#510087", color: "white", marginTop: "20px", height: "120px", alignItems: "center", justifyContent: "center"}}>
          <h6>...... </h6>
          <h6>Subtotal: {subtotal}</h6>
          <h6>Tax: 10%</h6>
          <h6>Total: {Math.round(subtotal * tax * 100) / 100}</h6>
          </div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#decbe8"}}>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Link to='/checkout'
          style={{ 
            background: "#0718EB",
            background: "-webkit-linear-gradient(top right, #0718EB, #BA08B4)",
            background: "-moz-linear-gradient(top right, #0718EB, #BA08B4)",
            background: "linear-gradient(to bottom left, #0718EB, #BA08B4)",
            color: "white",
            fontWeight: "bold",
            padding: "7px",
            borderRadius: "5px"
          }}
          
          >Checkout</Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;