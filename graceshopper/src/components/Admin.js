import "./Admin.css";
import { useState, useEffect } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import { getToken } from "../auth";
import Footer from './Footer'
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import EditAdminStatus from "./EditAdminStatus";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Admin = () => {
  let { path } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [orderSearchTerm, setOrderSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://peaceful-spire-60083.herokuapp.com/api/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.users);
      })
      .catch(console.error);
    fetch("https://peaceful-spire-60083.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch(console.error);
    fetch("https://peaceful-spire-60083.herokuapp.com/api/orders")
      .then((response) => response.json())
      .then((result) => {
        setOrders(result);
      })
      .catch(console.error);
  }, []);

  const deleteUser = (userId) => {
    fetch(`https://peaceful-spire-60083.herokuapp.com/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const usersAfterDeletion = users.filter((user) => user.id !== userId);
          setUsers(usersAfterDeletion);
        }
      })
      .catch(console.error);
  };

  const deleteProduct = (productId) => {
    fetch(
      `https://peaceful-spire-60083.herokuapp.com/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const newProductsAfterDeletion = products.filter(
            (product) => product.id !== productId
          );
          setProducts(newProductsAfterDeletion);
        }
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <h1 style={{ textAlign: "center", marginBottom: "10px", fontFamily: 'Libre Barcode 39 Text' }}>ADMIN PAGE</h1> */}

      <Route exact path={`${path}`}>
        <center
          style={{
            fontSize: "50px",
            fontFamily: "'Megrim', cursive",
            fontSize: "75px",
            fontWeight: "bolder",
            color: "white",
          }}
        >
          WELCOME TO THE ADMIN DASHBOARD
        </center>
      </Route>

      <center style={{ fontSize: "25px", margin: "10px 0px 20px 0px" }}>
        <img style={{width: "50px"}} src="https://wmumc.org/wmumc2019/wp-content/uploads/revslider/homepage-slider/staff.png"/>
        <Link to="/admin/user" style={{ marginRight: "20px" }}>
          {" "}
          VIEW ALL USERS
        </Link>
        <img style={{width: "50px"}} src="https://i.imgur.com/9juQDwp.png"/>
        <Link to="/admin/products" style={{ marginRight: "20px" }}>
          {" "}
          VIEW ALL PRODUCTS
        </Link>
        <img style={{width: "40px"}} src="https://i.imgur.com/cMfWc5o.png"/>
        <Link to="/admin/orders" style={{ marginRight: "20px" }}>
          {" "}
          VIEW ALL ORDERS
        </Link>
      </center>

      <Route exact path={`${path}`}>
        <center>
          <img className="isabelle" style={{width: "500px", marginTop: "50px"}}src="https://i.imgur.com/W3mSZqV.png" />
        </center>
      </Route>

      <Route path={`${path}/user`}>
        <h4
          style={{
            fontSize: "50px",
            fontFamily: "'Megrim', cursive",
            fontSize: "75px",
            fontWeight: "bolder",
            color: "white",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          ALL USERS
        </h4>
        <center>
          <div className="search-box">
            <img
              src="https://i.imgur.com/e8S8gy3.png"
              style={{ width: "35px" }}
            />
            <input
              type="text"
              placeholder="Search User"
              onChange={(event) => {
                setUserSearchTerm(event.target.value);
              }}
              style={{ border: "solid gold", margin: "25px" }}
            />
          </div>
        </center>
        <section style={{ overflow: "auto", height: "600px" }}>
          <center>
            {/* style={{ backgroundColor: "#cfcfd0", color: "black" }} */}
            <Table
              striped
              bordered
              hover
              style={{
                backgroundColor: "#d5e7fe",
                color: "black",
                fontWeight: "bold",
                marginTop: "20px",
                width: "75vw",
              }}
            >
              <thead style={{ backgroundColor: "#023e8a", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Admin</th>
                  <th>Change Admin Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {users
                .filter((user) => {
                  if (userSearchTerm === "") {
                    return user;
                  } else if (
                    user.username
                      .toLowerCase()
                      .includes(userSearchTerm.toLowerCase()) ||
                    user.email
                      .toLowerCase()
                      .includes(userSearchTerm.toLowerCase()) ||
                    user.isAdmin
                      .toString()
                      .toLowerCase()
                      .includes(userSearchTerm)
                  ) {
                    return user;
                  }
                  return null;
                })
                .map((user, index) => {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.isAdmin.toString().toUpperCase()}</td>
                        <td>
                          <EditAdminStatus
                            userId={user.id}
                            userIsAdmin={user.isAdmin}
                            users={users}
                            setUsers={setUsers}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            style={{ color: "white", fontWeight: "bold" }}
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete User
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </center>
        </section>
      </Route>
      <Route path={`${path}/products`}>
        <h4
          style={{
            fontSize: "50px",
            fontFamily: "'Megrim', cursive",
            fontSize: "75px",
            fontWeight: "bolder",
            color: "white",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          ALL PRODUCTS
          <AddProductModal products={products} setProducts={setProducts} />
        </h4>
        <center>
          <div className="search-box">
            <img
              src="https://i.imgur.com/e8S8gy3.png"
              style={{ width: "35px" }}
            />
            <input
              type="text"
              placeholder="Search Products"
              onChange={(event) => {
                setProductSearchTerm(event.target.value);
              }}
              style={{ border: "solid gold", margin: "25px" }}
            />
          </div>
        </center>
        <section style={{ overflow: "auto", height: "800px" }}>
          <center>
            <Table
              striped
              bordered
              hover
              style={{
                backgroundColor: "#d5e7fe",
                color: "black",
                fontWeight: "bold",
                marginTop: "20px",
                width: "80vw",
              }}
            >
              <thead style={{ backgroundColor: "#023e8a", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>Title/Category/Platform/Age Rating/Release Date</th>
                  <th>Image/Splash</th>
                  <th>Single Game URL Route</th>
                  <th>Description</th>
                  <th>Publisher/Developer</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {products
                .filter((product) => {
                  if (productSearchTerm === "") {
                    return product;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(productSearchTerm.toLowerCase()) ||
                    product.category
                      .toLowerCase()
                      .includes(productSearchTerm.toLowerCase()) ||
                    product.platform
                      .toLowerCase()
                      .includes(productSearchTerm.toLowerCase()) ||
                    product.ageRating
                      .toLowerCase()
                      .includes(productSearchTerm.toLowerCase()) ||
                    product.publisher
                      .toLowerCase()
                      .includes(productSearchTerm.toLowerCase()) ||
                    product.developer
                      .toLowerCase()
                      .includes(productSearchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                  return null;
                })
                .map((product, index) => {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>
                          {product.title} <hr /> {product.category}
                          <hr />
                          {product.platform} <hr /> {product.ageRating} <hr />{" "}
                          {new Date(product.releaseDate).toLocaleDateString()}
                        </td>
                        <td>
                          <img
                            src={product.imageURL}
                            alt={product.title}
                            style={{ width: "50px" }}
                          />
                          <hr />
                          <img
                            src={product.splash}
                            alt={`Splash of ${product.title}`}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{product.productURL}</td>

                        <td>{product.description}</td>
                        <td>
                          {product.publisher} <hr /> {product.developer}
                        </td>
                        <td>${product.price}</td>
                        <td>{product.inventory}</td>
                        <td>
                          <EditProductModal
                            productId={product.id}
                            productTitle={product.title}
                            productImageURL={product.imageURL}
                            productSplash={product.splash}
                            productURL={product.productURL}
                            productCategory={product.category}
                            productDescription={product.description}
                            productPrice={product.price}
                            productInventory={product.inventory}
                            productPlatform={product.platform}
                            productPublisher={product.publisher}
                            productDeveloper={product.developer}
                            productAgeRating={product.ageRating}
                            productReleaseDate={product.releaseDate}
                            products={products}
                            setProducts={setProducts}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            style={{ color: "white", fontWeight: "bold" }}
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete Product
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </center>
        </section>
        <center style={{ margin: "10px" }}>
          <AddProductModal products={products} setProducts={setProducts} />
        </center>
      </Route>
      <Route path={`${path}/orders`}>
        <h4
          style={{
            fontSize: "50px",
            fontFamily: "'Megrim', cursive",
            fontSize: "75px",
            fontWeight: "bolder",
            color: "white",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          ALL ORDERS{" "}
        </h4>
        <center>
          <div className="search-box">
            <img
              src="https://i.imgur.com/e8S8gy3.png"
              style={{ width: "35px" }}
            />
            <input
              type="text"
              style={{ width: "650px" }}
              placeholder="Search Order Status (Created, Pending, Completed, Canceled), User, or Product"
              onChange={(event) => {
                setOrderSearchTerm(event.target.value);
              }}
              style={{ border: "solid gold", margin: "25px" }}
            />
          </div>
        </center>
        <section style={{ overflow: "auto", height: "600px" }}>
          <center>
            <Table
              striped
              bordered
              hover
              style={{
                backgroundColor: "#d5e7fe",
                color: "black",
                fontWeight: "bold",
                marginTop: "20px",
                width: "75vw",
              }}
            >
              <thead style={{ backgroundColor: "#023e8a", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>User's Email</th>
                  <th>Product Title</th>
                  <th>Product Image</th>
                  <th>Product Price</th>
                  <th>Count</th>
                  <th>Order Status</th>
                  <th>Order Created</th>
                </tr>
              </thead>
              {orders
                .filter((order) => {
                  if (orderSearchTerm === "") {
                    return order;
                  } else if (
                    order.creatorName
                      .toLowerCase()
                      .includes(orderSearchTerm.toLowerCase()) ||
                    order.creatorEmail
                      .toLowerCase()
                      .includes(orderSearchTerm.toLowerCase()) ||
                    order.productTitle
                      .toLowerCase()
                      .includes(orderSearchTerm.toLowerCase()) ||
                    order.orderStatus
                      .toLowerCase()
                      .includes(orderSearchTerm.toLowerCase())
                  ) {
                    return order;
                  }
                  return null;
                })
                .map((order, index) => {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.creatorName}</td>
                        <td>{order.creatorEmail}</td>
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
                })}
            </Table>
          </center>
        </section>
      </Route>
      <Footer/>
    </div>
  );
};

export default Admin;
