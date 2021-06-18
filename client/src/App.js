import "./App.scss";

import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import SwapPage from "./components/SwapPage/SwapPage";
import PoolPage from "./components/PoolPage/PoolPage";
import MarketPage from "./components/MarketPage/MarketPage";
import BuyModal from "./components/BuyModal/BuyModal";
import NotFound from "./components/NotFound/NotFound";

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={MarketPage}/>
          <Route path="/swap" component={SwapPage}/>
          <Route path="/pool" component={PoolPage}/>
          <Route path="/buy" component={BuyModal}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}
