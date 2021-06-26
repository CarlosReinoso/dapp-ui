import "./SwapPage.scss";
import { FaArrowsAltV, FaChevronDown } from "react-icons/fa";
import SelectCoinModal from "../SelectCoinModal/SelectCoinModal";

import useFetch from "../../modules/crud";

import React, { useEffect, useState } from "react";
import axios from "axios";
import SuccessModal from "../SuccessModal/SuccessModal";
// import FormErrors from "../FormErrors/FormErrors";

const URL_Full =
  "https://api.lunarcrush.com/v2?data=meta&key=xyl8sb958pi25pq0efjjqn&type=full";
const URL_Price =
  "https://api.lunarcrush.com/v2?data=meta&key=xyl8sb958pi25pq0efjjqn&type=price";
const URL_SWAP = "http://localhost:3010/swap";

const SwapPage = () => {
  const [coinData, firstCoinData] = useFetch(URL_Full, []);
  const [pricesData] = useFetch(URL_Price, []);

  const [baseCoin, setBaseCoin] = useState(null);
  const [swapCoin, setSwapCoin] = useState(null);

  const [baseCalc, setBaseCalc] = useState(0);
  const [swapCalc, setSwapCalc] = useState(0);

  const [modal, setModal] = useState({ baseModal: false, swapModal: false });

  const [postTransaction, setTransaction] = useState([]);

  const [successModal, setSuccessModal] = useState(false);

  // const [formError, setFormError] = useState({ swapChoice: false });

  // const [toSwitch, setSwitch] = useState(true);
  // const onSwitch = () => {
  //   setSwitch((toSwitch) => !toSwitch);
  // };

  const toggleSuccess = () => {
    setSuccessModal((toToggle) => !toToggle);
  };

  useEffect(() => {
    setSuccessModal(successModal);
  }, [successModal]);

  useEffect(() => {
    setBaseCoin(firstCoinData);
  }, [firstCoinData]);

  useEffect(() => {
    axios
      .post(URL_SWAP, postTransaction)
      .then((res) => console.log(res))
      .catch((err) => console.log("err", err));
  }, [postTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !baseCoin || !swapCoin || !baseCalc || !swapCalc) {
      return console.log("select fields");
    } else {
      const transaction = {
        base_coin: baseCoin.name,
        swap_coin: swapCoin.name,
        base_input: e.target.base.value,
        swap_input: e.target.swap.value,
        base_calc: baseCalc,
        swap_calc: swapCalc,
      };
      
      setTransaction(transaction);
      setSuccessModal(successModal);
    }
    e.target.reset();
  };

  const selectBase = (coinId) => {
    let baseCoin = coinData.find((coinSearch) => coinSearch.id === coinId);
    setBaseCoin(baseCoin);
    setSwapCoin(swapCoin);
    setModal({
      baseModal: false,
    });
  };

  const selectSwap = (coinId) => {
    let swapCoin = coinData.find((coinSearch) => coinSearch.id === coinId);
    setBaseCoin(baseCoin);
    setSwapCoin(swapCoin);
    setModal({
      swapModal: false,
    });
  };

  const calcBasePrice = (value) => {
    const currentCoin = pricesData.find(
      (coinSearch) => coinSearch.id === baseCoin.id
    );
    setBaseCalc(currentCoin.price * value);
  };

  const calcSwapPrice = (value) => {
    const currentCoin = pricesData.find(
      (coinSearch) => coinSearch.id === swapCoin.id
    );
    setSwapCalc(currentCoin.price * value);
  };

  const toggle = (selector) => {
    if (selector === "one") {
      setModal({
        baseModal: !modal.baseModal,
      });
    } else if (selector === "two") {
      setModal({
        swapModal: !modal.swapModal,
      });
    }
  };

  const [toSwitch, setSwitch] = useState(true);
  const onSwitch = () => {
    setSwitch((toSwitch) => !toSwitch);
  };

  return (
    <section className="sp">
      <div className="sp__card">
        <h3>Swap</h3>
        <form onSubmit={(e) => handleSubmit(e)} className="sp__container">
          <div className="sp__tokens-frame">
            {toSwitch && (
              <div className="sp__token-container">
                <div className="sp__token-container--top">
                  <button
                    className="sp__token-button"
                    id="one"
                    onClick={(e) => toggle(e.target.id)}
                  >
                    <img
                      className="sp__token-image"
                      id="one"
                      src={
                        baseCoin
                          ? baseCoin.image
                          : "	https://dkhpfm5hits1w.cloudfront.net/bitcoin.png"
                      }
                      alt=""
                    />
                    <p id="one">{baseCoin ? baseCoin.symbol : "BTC"}</p>
                    <FaChevronDown id="one" />
                  </button>
                  {modal.baseModal ? (
                    <SelectCoinModal
                      toggle={toggle}
                      coinsList={coinData}
                      selectBase={selectBase}
                      baseModal={modal.baseModal}
                      swapCoin={swapCoin}
                      baseCoin={baseCoin}
                    />
                  ) : null}
                  <input
                    name="base"
                    className="sp__token-input"
                    onChange={(e) => calcBasePrice(e.target.value)}
                    type="number"
                    placeholder="0.0"
                  />
                </div>
                <div className="sp__token-container--bottom">
                  {baseCalc ? <p>~$ {baseCalc}</p> : null}
                </div>
              </div>
            )}
            {!toSwitch && (
              <div className="sp__token-container">
                <div className="sp__token-container--top">
                  <button
                    className={
                      swapCoin
                        ? "sp__token-button"
                        : "sp__token-button--toSelect"
                    }
                    id="two"
                    onClick={(e) => toggle(e.target.id)}
                  >
                    <img
                      className="sp__token-image"
                      id="two"
                      src={swapCoin ? swapCoin.image : ""}
                      alt=""
                    />
                    <p id="two">
                      {swapCoin ? swapCoin.symbol : "Select a Token"}
                    </p>
                    <FaChevronDown id="two" />
                  </button>
                  {modal.swapModal ? (
                    <SelectCoinModal
                      toggle={toggle}
                      coinsList={coinData}
                      selectSwap={selectSwap}
                      swapModal={modal.swapModal}
                      swapCoin={swapCoin}
                      baseCoin={baseCoin}
                    />
                  ) : null}
                  <input
                    name="swap"
                    className="sp__token-input"
                    onChange={(e) => calcSwapPrice(e.target.value)}
                    type="number"
                    placeholder="0.0"
                    disabled={swapCoin ? false : true}
                  />
                </div>
                <div className="sp__token-container--bottom">
                  {swapCalc ? <p>~$ {swapCalc}</p> : null}
                </div>
              </div>
            )}

            <FaArrowsAltV onClick={onSwitch} className="sp__switch" />

            {toSwitch && (
              <div className="sp__token-container">
                <div className="sp__token-container--top">
                  <button
                    className={
                      swapCoin
                        ? "sp__token-button"
                        : "sp__token-button--toSelect"
                    }
                    id="two"
                    onClick={(e) => toggle(e.target.id)}
                  >
                    <img
                      className="sp__token-image"
                      id="two"
                      src={swapCoin ? swapCoin.image : ""}
                      alt=""
                    />
                    <p id="two">
                      {swapCoin ? swapCoin.symbol : "Select a Token"}
                    </p>
                    <FaChevronDown id="two" />
                  </button>
                  {modal.swapModal ? (
                    <SelectCoinModal
                      toggle={toggle}
                      coinsList={coinData}
                      selectSwap={selectSwap}
                      swapModal={modal.swapModal}
                      swapCoin={swapCoin}
                      baseCoin={baseCoin}
                    />
                  ) : null}
                  <input
                    name="swap"
                    className="sp__token-input"
                    onChange={(e) => calcSwapPrice(e.target.value)}
                    type="number"
                    placeholder="0.0"
                    disabled={swapCoin ? false : true}
                  />
                </div>
                <div className="sp__token-container--bottom">
                  {swapCalc ? <p>~$ {swapCalc}</p> : null}
                </div>
              </div>
            )}

            {!toSwitch && (
              <div className="sp__token-container">
                <div className="sp__token-container--top">
                  <button
                    className="sp__token-button"
                    id="one"
                    onClick={(e) => toggle(e.target.id)}
                  >
                    <img
                      className="sp__token-image"
                      id="one"
                      src={
                        baseCoin
                          ? baseCoin.image
                          : "	https://dkhpfm5hits1w.cloudfront.net/bitcoin.png"
                      }
                      alt=""
                    />
                    <p id="one">{baseCoin ? baseCoin.symbol : "BTC"}</p>
                    <FaChevronDown id="one" />
                  </button>
                  {modal.baseModal ? (
                    <SelectCoinModal
                      toggle={toggle}
                      coinsList={coinData}
                      selectBase={selectBase}
                      baseModal={modal.baseModal}
                      swapCoin={swapCoin}
                      baseCoin={baseCoin}
                    />
                  ) : null}
                  <input
                    name="base"
                    className="sp__token-input"
                    onChange={(e) => calcBasePrice(e.target.value)}
                    type="number"
                    placeholder="0.0"
                  />
                </div>
                <div className="sp__token-container--bottom">
                  {baseCalc ? <p>~$ {baseCalc}</p> : null}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            // onClick={() =>
            //   (window.location.href = "https://yoroi-wallet.com/#/")
            // // }
            onClick={() =>
             setSuccessModal(!successModal)
            }
            className="sp__submit button-pay"
          >
            Swap Coins
          </button>
          {successModal && (
            <SuccessModal
              toggleSuccess={toggleSuccess}
              successModal={successModal}
            />
          )}
        </form>
      </div>
    </section>
  );
};

export default SwapPage;
