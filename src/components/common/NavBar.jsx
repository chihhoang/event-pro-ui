import React from "react";
import { NavLink, Link } from "react-router-dom";

// Stateless Functional Component
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Event Pro
      </Link>
        <Link className="navbar-brand" to="/cart">
            Shopping Cart
        </Link>
        <Link className="navbar-brand" to="/history">
            Booking History
        </Link>

      <div
        className="collapse navbar-collapse w-100 order-3 dual-collapse2"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav ml-auto">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/list">
                Events
              </NavLink>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.sub}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
          {user && user.auth.includes("ROLE_ADMIN") && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/admin">
                Admin Control <span style={{ color: "black" }}>{user.env}</span>
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
