import React, { Component } from "react";
import resLogo from "../../assets/images/resLogo.png";
import axios from "axios";
import { FaMinusCircle, FaPlus, FaPlusCircle } from "react-icons/fa";

const URL = `http://localhost:8080/`;

export default class Main extends Component {
  state = {
    friendsList: [],
    checked: true,
    friend: {},
  };

  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
    axios.get(URL).then((res) => {
      this.setState({
        friendsList: res.data,
      });
    });
  };

  addFriend = (friend) => {
    axios.post(URL, friend).catch((err) => console.log(err));
    // this.getFriends();
    this.setState({
      friendsList: [...this.state.friendsList, friend],
    });
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  render() {
    const { friendsList } = this.state;
    if (!friendsList) {
      return <h3>...Loading..check internet</h3>;
    }
    return (
      <main className="main">
        <div className="main__card">
          <hr />
          <div className="main__split-container">
            <div className="main__split-checkbox">
              <label htmlFor="splitBIll">Split the Bill?</label>
              <input onChange={this.handleChange} type="checkbox" checked />
            </div>
            {this.state.checked && (
              <SplitBIll
                friendsdData={this.state.friendsList}
                getFriend={this.addFriend}
              />
            )}
          </div>
        </div>
      </main>
    );
  }
}

const SplitBIll = ({ getFriend, friendsdData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let friend = {
      name: e.target.name.value,
      email: e.target.email.value,
      pay: e.target.pay.value,
    };
    getFriend(friend);
    e.target.reset();
  };
  return (
    <section className="sb">
      <header className="sb__header">
        <img className="sb__header-img" src={resLogo} alt="" />
        <div className="sb__res-detail">
          <h3>Veggie Vitality</h3>
          <h4>1, Canalside Here East Estate, London E20 3BS</h4>
        </div>
        <p>£57.95</p>
      </header>
      <div className="sb__user-list-container">
        {friendsdData.map((p) => (
          <ul key={p.id} className="sb__user-list">
            <div className="sb__user-list-detail">
              <li>{p.name}</li>
              <li>{p.email}</li>
            </div>
            <div className="sb__user-counter">
              <FaMinusCircle />
              <div>{p.pay}</div>
              <FaPlusCircle />
            </div>
          </ul>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="sb__form">
          <div className="sb__form-inputs">

        <input
          className="sb__form-input"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className="sb__form-input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="sb__form-input--pay"
          type="number"
          name="pay"
          placeholder="Pay"
        />
          </div>

        <button className="sb__form-btn" type="submit">
          + Add
        </button>
      </form>
    </section>
  );
};

