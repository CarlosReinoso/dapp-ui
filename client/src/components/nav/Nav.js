import React from "react";
import './nav.scss'
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { FaCreditCard, FaMinusCircle, FaPlus, FaPlusCircle, FaStore, FaStoreAlt, FaWater } from "react-icons/fa";


export const Nav = () => {
  return (
    <nav className="nav" >
      <Link to="/" 
     >
        <img 
         className="nav__logo"
        src={logo} alt="" />
      </Link>

      <ul className="nav__list">
        {/* <li className="nav__list-item">
          <FaStoreAlt />
          Market
        </li> */}
        <li className="nav__list-item">
          <FaStoreAlt />
          Swap
        </li>
        <li className="nav__list-item">
          <FaWater/>
          Pool
        </li>
        <li className="nav__list-item">
          <FaCreditCard/>
          Buy
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
