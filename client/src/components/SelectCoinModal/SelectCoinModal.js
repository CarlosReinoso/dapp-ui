import React, { useEffect, useState } from "react";
import close from "../../assets/icons/close-24px.svg";
import "./SelectCoinModal.scss";

const SelectCoinModal = ({
  coinsList,
  selectBase,
  selectSwap,
  baseModal,
  swapModal,
  toggle,
  swapCoin,
  baseCoin,
}) => {
  console.log("baseCoin", baseCoin);
  console.log("swap", swapCoin);
  const [search, setSearch] = useState("");
  const [filtered, setFiltererd] = useState(coinsList);

  const random5 = [...coinsList];

  useEffect(() => {
    setFiltererd(
      coinsList.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, coinsList]);

  const handleClick = () => {
    if (baseModal) {
      toggle("one");
    } else if (swapModal) {
      toggle("two");
    }
  };

  const [disabled, setDisabled] = useState(false);

  const onDisabled = (coinId) => {
    if (!swapCoin) {
      if (baseCoin.id === coinId) {
        return "disabled";
      } else {
        return "";
      }
    } else {
      if (baseCoin.id === coinId || swapCoin.id === coinId) {
        return "disabled";
      } else {
        return ""
      }
    }
  };

  if (!baseCoin && !swapCoin) {
    return <p>...Loading...</p>;
  } else {
    return (
      <div className="modal">
        <div className="modal__pop">
          <div className="modal__pop-close-container">
            <h4>Select a Token</h4>
            <img
              className="modal__pop-close"
              onClick={handleClick}
              src={close}
              alt=""
            />
          </div>
          <input
            className="modal__input input-swapModal"
            onChange={(e) => setSearch(e.target.value)}
            name="name"
            type="text"
            placeholder="Search for name"
          />
          <h4>Common Bases</h4>
          <ul className="modal__commonBases">
            {random5
              .slice(0, 5) //from top 100 to top 20
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((coin) => {
                return (
                  <li
                  disabled={
                    !swapCoin
                      ? baseCoin.id === coin.id
                      : baseCoin.id === coin.id || swapCoin.id === coin.id
                  }
                    key={coin.id}
                    
                    className="modal__commonBases-item"
                  >
                    <button
                      disabled={
                        !swapCoin
                          ? baseCoin.id === coin.id
                          : baseCoin.id === coin.id || swapCoin.id === coin.id
                      }
                      className="modal__random-button button-swapModal"
                      onClick={() => {
                        if (baseModal) {
                          selectBase(coin.id);
                        } else if (swapModal) {
                          selectSwap(coin.id);
                        }
                      }}
                    >
                      <img
                        className="sp__token-image"
                        id="one"
                        src={coin.image}
                        alt={coin.image}
                      />
                      <p id="one">{coin.symbol}</p>
                    </button>
                  </li>
                );
              })}
          </ul>
          <div className="modal__coinsList">
            <ul className="modal__coinsList-ul">
              {filtered.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => {
                    if (baseModal) {
                      selectBase(coin.id);
                    } else if (swapModal) {
                      selectSwap(coin.id);
                    }
                  }}
                  disabled={
                    !swapCoin
                      ? baseCoin.id === coin.id
                      : baseCoin.id === coin.id || swapCoin.id === coin.id
                  }
                  //"modal__coinsList-item"
                  className={`modal__coinsList-item ${onDisabled(coin.id)}`}
                >
                  <img
                    className="modal__coinsList-image"
                    src={coin.image}
                    alt=""
                  />
                  <div>
                    <p className="modal__coinsList-symbol">{coin.symbol}</p>
                    <p className="modal__coinsList-name">{coin.name}</p>
                  </div>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default SelectCoinModal;
