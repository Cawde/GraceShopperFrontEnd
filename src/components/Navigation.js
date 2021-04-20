import {getUser, getToken} from "../auth"
import { Link, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShoppingCartModal from "./ShoppingCartModal";

const Navigation = ({
    username,
    authenticate,
    userId,
    orders,
    setOrders,
    guestOrder,
    setGuestOrder,
    cart,
    setCart
}) => {

    return (
 
        <Navbar className="navBar">
            <Navbar.Brand style ={{paddingLeft: "20px"}}href="/"><img src= "https://cdn.discordapp.com/attachments/631019099182465033/833848194260664370/Logo_white_transparent_100_by_70.png" style={{height: "50px", width: "75px"}}/></Navbar.Brand>
            {/* <img src= "https://i.imgur.com/9juQDwp.png" style={{height: "50px", width: "75px"}}/> */}
            <Nav className="ml-auto">
            <Link style={{ color: "white", padding: "7.5px" }} to="/">
                Home
            </Link>
            <Link style={{ color: "white", padding: "7.5px" }} to="/games">
                Games
            </Link>
            {authenticate && getUser() && getToken() ? (
                <Link style={{ color: "white", padding: "7.5px" }} to="/admin">
                Admin Tasks
                </Link>
            ) : null}
            <Link style={{ color: "white", padding: "7.5px" }} to="/checkout">
                Checkout!
            </Link>
            {!authenticate && !getToken() ? (
                <Link style={{ color: "white", padding: "7.5px" }} to="/login">
                Login/Register
                </Link>
            ) : (
                <Link style={{ color: "white", padding: "7.5px" }} to="/logout">
                Logout
                </Link>
            )}
            {authenticate && getToken() ?(
            <Link style={{ color: "white", padding: "7.5px" }} to="/profile">
                Profile
            </Link>)
            : null
            }               
            {orders ? (
                <ShoppingCartModal
                userId={userId}
                orders={orders}
                setOrders={setOrders}
                guestOrder={guestOrder}
                setGuestOrder={setGuestOrder}
                cart={cart}
                setCart={setCart}
                />
            ) : null}
            </Nav>
        </Navbar>
        
    )
}
export default Navigation;
