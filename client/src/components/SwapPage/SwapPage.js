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
  const [data, setData] = useState({ coinsList: null, coinsPrices: null });
  const [error, setError] = useState("");

  const [coin, setCoin] = useState({ baseCoin: null, swapCoin: null });
  const [onPriceChange, setPriceChange] = useState({
    basePriceChange: null,
    swapPriceChange: null,
  });
  const [modal, setModal] = useState({ baseModal: false, swapModal: false });

  useEffect(() => {
    try {
      (async () => {
        const resList = await axios.get(URL_Full);
        const top100List = resList.data.data.slice(0, 100);

        const resPrices = await axios.get(URL_Price);
        const top100Prices = resPrices.data.data.slice(0, 100);

        setData({ coinsList: top100List, coinsPrices: top100Prices });
      })();
    } catch (err) {
      console.log("err", err);
      setError(err);
    }
  }, []);

  //functions
  const onBasePriceChange = (e) => {
    const InValue = e.target.value;
    const coinPrice = data.coinsPrices.find(
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
      const coinPrice = data.coinsPrices.find(
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
      setData({
        coinsList: data.coinsList.filter((coin) => {
          return (
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
          );
        }),
      });
    } else {
      setData(data);
    }
  };

  const selectBase = (coinId) => {
    // console.log("selectBase");
    let baseCoin = data.coinsList.find(
      (coinSearch) => coinSearch.id === coinId
    );
    setCoin({
      baseCoin: baseCoin,
    });
    setModal({
      baseModal: false,
    });
  };

  const selectSwap = (coinId) => {
    let swapCoin = data.coinsList.find(
      (coinSearch) => coinSearch.id === coinId
    );
    setCoin({
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
                  coinsList={data.coinsList}
                  onSearch={onSearch}
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
                  coinsList={data.coinsList}
                  onSearch={onSearch}
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

// export default class SwapPage extends Component {
//   state = {
//     coinsList: [],
//     coinsPrices: [],
//     baseCoin: null,
//     swapCoin: null,
//     onBasePriceChange: null,
//     onSwapPriceChange: null,
//     baseModal: false,
//     swapModal: false,
//   };
//   componentDidMount() {
//     this.getCoinsInfo();
//   }

//   getCoinsInfo = () => {
//     axios
//       .get(
//         "https://api.lunarcrush.com/v2?data=meta&key=xyl8sb958pi25pq0efjjqn&type=full"
//       )
//       .then((res) => {
//         const top100 = res.data.data.slice(0, 100);
//         this.setState(
//           {
//             coinsList: top100,
//             baseCoin: top100[0],
//           }
//           //   () => console.log(this.state.baseCoin)
//         );
//       });

//     axios
//       .get(
//         "https://api.lunarcrush.com/v2?data=meta&key=xyl8sb958pi25pq0efjjqn&type=price"
//       )
//       .then((res) => {
//         const top100 = res.data.data.slice(0, 100);
//         this.setState({
//           coinsPrices: top100,
//         });
//       });
//   };

//   onBasePriceChange = (e) => {
//     const InValue = e.target.value;
//     const coinPrice = this.state.coinsPrices.find(
//       (coin) => coin.id === this.state.baseCoin.id
//     );
//     this.setState({
//       onBasePriceChange: coinPrice.price * InValue,
//     });
//   };

//   onSwapPriceChange = (e) => {
//     if (!this.state.swapCoin) {
//       alert("Please select coin");
//       e.target.value = "";
//     } else {
//       const InValue = e.target.value;
//       const coinPrice = this.state.coinsPrices.find(
//         (coin) => coin.id === this.state.swapCoin.id
//       );
//       this.setState({
//         onSwapPriceChange: coinPrice.price * InValue,
//       });
//     }
//   };

//   onSearch = (e) => {
//     let search = e.target.value;
//     if (search.length > 0) {
//       this.setState({
//         coinsList: this.state.coinsList.filter((coin) => {
//           return (
//             coin.name.toLowerCase().includes(search.toLowerCase()) ||
//             coin.symbol.toLowerCase().includes(search.toLowerCase())
//           );
//         }),
//       });
//     } else {
//       this.getCoinsInfo();
//     }
//   };

//   selectBase = (coinId) => {
//     // console.log("selectBase");
//     let baseCoin = this.state.coinsList.find((coin) => coin.id === coinId);
//     this.setState(
//       {
//         baseCoin: baseCoin,
//         baseModal: false,
//       }
//       // () => console.log(this.state)
//     );
//   };

//   selectSwap = (coinId) => {
//     let swapCoin = this.state.coinsList.find((coin) => coin.id === coinId);
//     this.setState(
//       {
//         swapCoin: swapCoin,
//         swapModal: false,
//       }
//       // () => console.log(this.state)
//     );
//   };

//   toggleBaseModal = () => {
//     this.setState({
//       baseModal: !this.state.baseModal,
//     });
//   };

//   toggleSwapModal = () => {
//     this.setState({
//       swapModal: !this.state.swapModal,
//     });
//   };

//   render() {
//     const { coinsList } = this.state;
//     if (!coinsList) {
//       return <h3>...Loading..check internet</h3>;
//     }

//     return (
//       <section className="sp">
//         <div className="sp__card">
//           <h1>Swap</h1>
//           <hr />
//           <div className="sp__container">
//             <div className="sp__select-token-container">
//               <div className="sp__select-token-container--top">
//                 <button onClick={this.toggleBaseModal}>
//                   <img
//                     src={
//                       this.state.baseCoin
//                         ? this.state.baseCoin.image
//                         : "https://dkhpfm5hits1w.cloudfront.net/bitcoin.png"
//                     }
//                     alt=""
//                   />
//                   <p>
//                     {this.state.baseCoin ? this.state.baseCoin.symbol : "BTC"}
//                   </p>
//                   <FaChevronDown />
//                 </button>
//                 {this.state.baseModal ? (
//                   <SelectCoinModal
//                     toggleBaseModal={this.toggleBaseModal}
//                     coinsList={this.state.coinsList}
//                     onSearch={this.onSearch}
//                     selectBase={this.selectBase}
//                     baseModal={this.state.baseModal}
//                   />
//                 ) : null}
//                 <input onChange={this.onBasePriceChange} type="number" />
//                 <div>~$ {this.state.onBasePriceChange}</div>
//               </div>
//               <div className="sp__select-token-container--top">
//                 <button onClick={this.toggleSwapModal}>
//                   <img
//                     src={this.state.swapCoin ? this.state.swapCoin.image : ""}
//                     alt=""
//                   />
//                   <p>
//                     {this.state.swapCoin
//                       ? this.state.swapCoin.symbol
//                       : "Select a Token"}
//                   </p>
//                   <FaChevronDown />
//                 </button>
//                 {this.state.swapModal ? (
//                   <SelectCoinModal
//                     toggleSwapModal={this.toggleSwapModal}
//                     coinsList={this.state.coinsList}
//                     onSearch={this.onSearch}
//                     selectSwap={this.selectSwap}
//                     swapModal={this.state.swapModal}
//                   />
//                 ) : null}
//                 <input onChange={this.onSwapPriceChange} type="number" />
//                 <div>~$ {this.state.onSwapPriceChange}</div>
//               </div>
//               <a href="https://yoroi-wallet.com/#/">
//                 <button className="button-pay"> Connect Wallet</button>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }
