import "./SwapPage.scss";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import SelectCoinModal from "../SelectCoinModal/SelectCoinModal";

import useFetch from "../../modules/crud";

import React, { Component, useEffect, useState } from "react";

const URL_Full =
  "https://api.lunarcrush.com/v2?data=meta&key=xyl8sb958pi25pq0efjjqn&type=full";
const URL_Price =
  "https://api.lunarcrush.com/v2?data=meta&key=xyl8sb958pi25pq0efjjqn&type=price";

const SwapPage = () => {
  const [coinData, coinError] = useFetch(URL_Full, []);
  const [pricesData, priceError] = useFetch(URL_Price, []);
  
  const [error, setError] = useState("");

  const [coin, setCoin] = useState({ baseCoin: null, swapCoin: null });
  // const [onPriceChange, setPriceChange] = useState({
  //   basePriceChange: null,
  //   swapPriceChange: null,
  // });
  const [baseCalc, setBaseCalc] = useState(0);
  const [swapCalc, setSwapCalc] = useState(0);

  const [modal, setModal] = useState({ baseModal: false, swapModal: false });


  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const resList = await axios.get(URL_Full);
  //       const top100List = resList.data.data.slice(0, 100);

  //       const resPrices = await axios.get(URL_Price);
  //       const top100Prices = resPrices.data.data.slice(0, 100);

  //       setData({ coinsList: top100List, coinsPrices: top100Prices });
  //     })();
  //   } catch (err) {
  //     console.log("err", err);
  //     setError(err);
  //   }
  // }, []);

  // useEffect(()=> {
  //   const coinPrice = data.coinsPrices.find(
  //     (coinSearch) => coinSearch.id === coin.baseCoin.id
  //   );
  //   setBaseCalc(
  //     baseCalc coinPrice.price * InValue
  //   )
  // })
  //functions

  const onBasePriceChange = (e) => {
    const InValue = e.target.value;
    const coinPrice = pricesData.find(
      (coinSearch) => coinSearch.id === coin.baseCoin.id
    );
    setPriceChange({
      basePriceChange: coinPrice.price * InValue,
    });
  };

  const onSwapPriceChange = (e) => {
    if (!coin.swapCoin) {
      alert("Please select coin");
      e.target.value = "";
    } else {
      const InValue = e.target.value;
      const coinPrice = pricesData.find(
        (coinSearch) => coinSearch.id === coin.swapCoin.id
      );
      setPriceChange({
        swapPriceChange: coinPrice.price * InValue,
      });
    }
  };

  const onSearch = (e) => {
    let search = e.target.value;
    if (search.length > 0) {
      setSearch(search);
    } else {
      setSearch("");
    }
  };

  const selectBase = (coinId) => {
    let baseCoin = coinData.find((coinSearch) => coinSearch.id === coinId);
    setCoin({
      baseCoin: baseCoin,
      swapCoin: coin.swapCoin,
    });
    setModal({
      baseModal: false,
    });
  };

  const selectSwap = (coinId) => {
    let swapCoin = coinData.find((coinSearch) => coinSearch.id === coinId);
    setCoin({
      baseCoin: coin.baseCoin,
      swapCoin: swapCoin,
    });
    setModal({
      swapModal: false,
    });
  };

  const toggleBaseModal = () => {
    setModal({
      baseModal: !modal.baseModal,
    });
  };

  const toggleSwapModal = () => {
    setModal({
      swapModal: !modal.swapModal,
    });
  };

  return (
    <section className="sp">
      <div className="sp__card">
        <h1>Swap</h1>
        <hr />
        <div className="sp__container">
          <div className="sp__select-token-container">
            <div className="sp__select-token-container--top">
              <button onClick={toggleBaseModal}>
                <img
                  src={
                    coin.baseCoin
                      ? coin.baseCoin.image
                      : "https://dkhpfm5hits1w.cloudfront.net/bitcoin.png"
                  }
                  alt=""
                />
                <p>{coin.baseCoin ? coin.baseCoin.symbol : "BTC"}</p>
                <FaChevronDown />
              </button>
              {modal.baseModal ? (
                <SelectCoinModal
                  toggleBaseModal={toggleBaseModal}
                  coinsList={coinData}
                  selectBase={selectBase}
                  baseModal={modal.baseModal}
                />
              ) : null}
              <input onChange={onBasePriceChange} type="number" />
              <div>~$ {onBasePriceChange}</div>
            </div>
            <div className="sp__select-token-container--top">
              <button onClick={toggleSwapModal}>
                <img src={coin.swapCoin ? coin.swapCoin.image : ""} alt="" />
                <p>{coin.swapCoin ? coin.swapCoin.symbol : "Select a Token"}</p>
                <FaChevronDown />
              </button>
              {modal.swapModal ? (
                <SelectCoinModal
                  toggleSwapModal={toggleSwapModal}
                  coinsList={coinData}
                  selectSwap={selectSwap}
                  swapModal={modal.swapModal}
                />
              ) : null}
              <input onChange={onSwapPriceChange} type="number" />
              <div>~$ {onSwapPriceChange}</div>
            </div>
            <a href="https://yoroi-wallet.com/#/">
              <button className="button-pay"> Connect Wallet</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwapPage;
