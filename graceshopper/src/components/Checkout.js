import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Dropdown from "react-bootstrap/Dropdown";
import "./Checkout.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { removeGuestProducts } from "../auth";
// import TakeMoney from './StripeCheckout'
import CheckoutForm from "./StripeCheckout";
const API = "https://peaceful-spire-60083.herokuapp.com/api/orders";
// import StripeCheckout from 'react-stripe-checkout';
const stripePromise = loadStripe(
  "pk_test_51Iei4JBoHWwkzUsZILLciQCW97S5JTpLMZak2X4ckbSdJUnT2CcRywoxeNb0Ez1fcyBtVzETYR1MJnLlKAtpf9xi00hJBUHQdx"
);

const Checkout = ({
  userId,
  orders,
  setOrders,
  cart,
  setCart,
  guestOrder,
  setGuestOrder,
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [count, setCount] = useState();

  // const [selected, setSelected] = useState("");
  const tax = 1.1;
  let subtotal = 0;
  let total = 0;
  const getOrders = () => {
    fetch(`${API}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        setCart(data);
      })
      .catch(console.error);
  };

  const makePending = () => {
    orders.forEach((order) => {
      fetch(
        `https://peaceful-spire-60083.herokuapp.com/api/orders/${order.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus: "pending",
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "order is pending");
          setOrderConfirmed(true);
        })
        .catch(console.error);
    });
  };

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

  // const userOrder = orders.filter((order) => {
  //     if(order.userId == userId){
  //         return order
  //     }
  // })

  // console.log(userOrder)

  async function updateCount(orderId) {
    // const changeCountHandler = (event) => {
    //     console.log(event.target.value)
    //     setCount(event.target.value);
    //   };

    // changeCountHandler()

    // orders.forEach((order) => {
    await fetch(
      `https://peaceful-spire-60083.herokuapp.com/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: count,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "count is increased");

        if (data) {
          const newOrderCount = orders.map((order) => {
            if (orderId) {
              return data;
            } else {
              return order;
            }
          });

          setOrders(newOrderCount);
        }
      })
      .catch(console.error);
  }

  const clearCart = () => {
    orders.forEach((order) => {
    fetch(
      `https://peaceful-spire-60083.herokuapp.com/api/orders/${order.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: "cancelled",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "order is cancelled");
        setCart([]);
        setOrders([]);
        removeGuestProducts();
      })
      .catch(console.error); 
    })
  };

  useEffect(() => {
    if (userId) {
      getOrders();
    } else {
      // getProductForGuests()
      // setGuestOrder(getProductForGuests())
      console.log(guestOrder);
    }
  }, []);


    return (
        <>
        <div className="order-checkout">
            <h1 className="secure-checkout"> Secure Checkout </h1>
            <p className="enjoy"> We hope you enjoy your purchase! </p>
        </div>
        
        <section>
          <center>
            <Table className = "left" striped bordered hover style={{backgroundColor:"#decbe8", color: "black", fontWeight: "bolder", width: "75vw", textAlign: "center", marginBottom: "40px"}}>
                <thead style={{backgroundColor: "#510087", color: "white", textAlign: "center" }}>
                    <tr>
                    <th>Quantity</th>
                    <th> </th>
                    <th>Game Name</th>
                    <th>Price</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                
                {userId ?
                orders.map((order, index) => {
                    subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
                    total = Math.round(subtotal * tax * 100) / 100;
                    console.log(order)
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>
                                {order.count}
                                </td>
                                <td>
                                  <img
                                    src={order.imageURL}
                                    
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </td>
                                <td>{order.productTitle}</td>
                                <td>{order.productPrice}</td>
                                <td> 
                                    <button
                                        className="deleteButton"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Remove Item
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )
                    })
                    : 
                    guestOrder.map((order, index) => {
                      subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
                      total = Math.round(subtotal * tax * 100) / 100;
                      return (
                          <tbody key={index}>
                              <tr>
                                <td>
                                  {order.count}
                                </td>
                                <td>
                                  <img
                                      src={order.productImageURL}
                                      
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                </td>
                                <td>{order.productTitle}</td>
                                <td>{order.productPrice}</td>
                                <td> 
                                    <button
                                        className="deleteButton"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Remove Item
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )})
                    
                  }
                  
            </Table>
          </center>
            <div className="orderTotal">
                <div>Subtotal: {subtotal}</div>
                <div>Tax: 10%</div>
                
                <h6 className= "total">Total: {total} </h6>
              </div>
              <center>
                <section className="checkoutButtons"> 
                  {/* <div className="cancel">  */}
                    <img src="https://i.imgur.com/3p0mNxQ.png" className="x"/>
                    <button onClick={clearCart} className="cancelButton"> CANCEL </button>
                  {/* </div> */}
                  {/* <div className="confirm"> */}
                    <img src="https://i.imgur.com/yUzJ7Sc.png" className="checkMark"/>
                    <button className="confirmButton"
                        // onClick={makePending}
                        onClick={setOrderConfirmed}
                        
                    > 
                        CONFIRM
                    </button>
                  {/* </div> */}
                
            { orderConfirmed ? 
            <div className="AppWrapper">
                <Elements stripe={stripePromise} >
                    <CheckoutForm 
                    amount={total}
                    orders={orders}
                    guestOrder={guestOrder}
                    setGuestOrder={setGuestOrder}

                    />
                </Elements>
            </div>
            
            : null}
            </section>
            </center>
        </section>
        </>
    )
}

  


export default Checkout;
