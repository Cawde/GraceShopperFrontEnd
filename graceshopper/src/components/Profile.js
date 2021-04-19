import { useState, useEffect } from "react";
import Footer from './Footer'
import Table from "react-bootstrap/Table";

const Profile = ({ username, userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://peaceful-spire-60083.herokuapp.com/api/orders")
      .then((response) => response.json())
      .then((result) => {
        setOrders(result);
        console.log(result);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1
        style={{
          fontFamily: "'Megrim', cursive",
          fontSize: "75px",
          fontWeight: "bolder",
          color: "white",
          textAlign: "center",
        }}
      >
        {username.toUpperCase()}'s PROFILE
      </h1>

      <div
        style={{
          fontSize: "50px",
          fontFamily: "'Megrim', cursive",
          fontWeight: "bolder",
          color: "white",
          textAlign: "center",
        }}
      >
        {" "}
        <img
          style={{ width: "40px" }}
          src="https://i.imgur.com/cMfWc5o.png"
        />{" "}
        Order History
      </div>
      <center>
        <section style={{ overflow: "auto", height: "600px", width: "75vw" }}>
          <center>
            <Table
              striped
              bordered
              hover
              style={{
                backgroundColor:"#decbe8",
                color: "black",
                fontWeight: "bolder",
                marginTop:"50px"
              }}
            >
              <thead
                style={{
                  backgroundColor: "#510087",
                  color: "white",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Product Title</th>
                  <th>Product Image</th>
                  <th>Product Price</th>
                  <th>Count</th>
                  <th>Order Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>

              {orders.map((order, index) => {
                if (
                  order.orderStatus === "completed" &&
                  order.userId === userId
                ) {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.productTitle}</td>
                        <td>
                          <img
                            src={order.imageURL}
                            alt={order.productTitle}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{order.productPrice}</td>
                        <td>{order.count}</td>
                        <td>{order.orderStatus}</td>
                        <td>
                          {new Date(order.orderCreated).toLocaleDateString()}
                        </td>
                      </tr>
                    </tbody>
                  );
                } else {
                  return null;
                }
              })}
            </Table>
          </center>
        </section>
      </center>
      <Footer/>
    </div>
  );
};

export default Profile;
