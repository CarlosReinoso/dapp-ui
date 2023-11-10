import React from "react";
import "./nav.scss";
import logo from "../../assets/logo/logo.svg";
import { FaCreditCard, FaStoreAlt, FaWater } from "react-icons/fa";
import Image from "next/image";

export const Nav = () => {
  const activeStyle = {
    backgroundColor: "#f1f3f0",
    borderRadius: "15px",
    padding: "8px",
  };
  return (
    <nav className="nav">
      <Image width={60} height={60} src="/logo.svg" alt="jpg" />
      <div>
        <img className="nav__logo" src={logo} alt="" />
      </div>
      <ul className="nav__list">
        <div activeStyle={activeStyle} to="/swap">
          <li className="nav__list-item">
            <FaStoreAlt />
            Swap
          </li>
        </div>
        <div activeStyle={activeStyle} to="pool">
          <li className="nav__list-item">
            <FaWater />
            Pool
          </li>
        </div>
        <div activeStyle={activeStyle} to="Buy">
          <li className="nav__list-item">
            <FaCreditCard />
            Buy
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
