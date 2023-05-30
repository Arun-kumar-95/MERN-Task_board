import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import "./header.css";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Header = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleLogout = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };
  
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li>
            <Link to="/">
              {isAuthenticated ? (
                <Fragment>
                  Welcome,
                  <span
                    style={{ textTransform: "capitalize", marginLeft: "4px" }}
                  >
                    {user.full_name}
                  </span>
                </Fragment>
              ) : (
                <span>TaskBoard</span>
              )}
            </Link>
          </li>
          {isAuthenticated ? (
            <Fragment>
              <li>
                <button onClick={handleLogout} className="btn btnLogout">
                  Logout
                </button>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to="/register" className="register">
                  <span>
                    <MdAccountCircle />
                  </span>
                  Register
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
