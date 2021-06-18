import React, { useEffect, useState } from "react";
import close from "../../assets/icons/close-24px.svg";

const SelectCoinModal = ({
  coinsList,
  onSearch,
  selectBase,
  selectSwap,
  baseModal,
  swapModal,
  toggleBaseModal,
  toggleSwapModal,
}) => {
  const handleClick = () => {
    if (baseModal) {
      toggleBaseModal();
    } else if (swapModal) {
      toggleSwapModal();
    }
  };

  const [search, setSearch] = useState("");
  const [filtered, setFiltererd] = useState(coinsList);

  useEffect(() => {
    setFiltererd(
      coinsList.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, coinsList ]);

  return (
    <div className="modal">
      <div className="modal__pop">
        <span className="modal__pop-close">
          <img onClick={handleClick} src={close} alt="" />
        </span>
        <h3>Select a Token</h3>
        <input
          onChange={e => setSearch(e.target.value)}
          name="name"
          type="text"
          placeholder="Search for name"
        />
        <h3>Common Bases</h3>
        <hr />

        <div className="modal__coinsList">
          <ul className="modal__coinsList-ul">
            {filtered
              .map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => {
                    if (baseModal) {
                      selectBase(coin.id);
                    } else if (swapModal) {
                      selectSwap(coin.id);
                    }
                  }}
                  className="modal__coinsList-item"
                >
                  <img src={coin.image} alt="" />
                  <div>
                    <h3>{coin.symbol}</h3>
                    <h3>{coin.name}</h3>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectCoinModal;
