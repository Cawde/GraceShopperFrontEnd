import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken, logout, removeUser, removeUserId } from "../auth";

const Logout = ({
  authenticate,
  setAuthentication,
  setOrders,
  setUserId,
  setGuestOrder,
}) => {
  const [logoutSuccessful, setLogoutSuccessful] = useState(false);

  useEffect(() => {
    if (getToken()) {
      logout();
      setLogoutSuccessful(true);
      setAuthentication(false);
      removeUser();
      removeUserId();
      setOrders([]);
      setUserId(null);
      localStorage.clear();
      setGuestOrder([]);
    }
  }, []);

  if (logoutSuccessful && !authenticate) {
    return (
      <Route exact path="/logout">
        <Redirect to="/" />
      </Route>
    );
  }
  return null;
};
export default Logout;