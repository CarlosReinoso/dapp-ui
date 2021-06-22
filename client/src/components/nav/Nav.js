import React from "react";
import "./nav.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { FaCreditCard, FaStoreAlt, FaWater } from "react-icons/fa";

export const Nav = () => {
  const activeStyle = {
    backgroundColor: "#f1f3f0",
    borderRadius: "15px",
    padding: "8px",
  };
  return (
    <nav className="nav">
      <Link to="/">
        <img className="nav__logo" src={logo} alt="" />
      </Link>
      <ul className="nav__list">
        <NavLink activeStyle={activeStyle} to="/swap">
          <li className="nav__list-item">
            <FaStoreAlt />
            Swap
          </li>
        </NavLink>
        <NavLink activeStyle={activeStyle} to="pool">
          <li className="nav__list-item">
            <FaWater />
            Pool
          </li>
        </NavLink>
        <NavLink activeStyle={activeStyle} to="Buy">
          <li className="nav__list-item">
            <FaCreditCard />
            Buy
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
