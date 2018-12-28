import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import My_search from "./components/search_bar";
import * as serviceWorker from "./serviceWorker";
import YTsearch from "youtube-api-search";
import web3 from "./web3";
import lottery from "./lottery";

//YTsearch({ key: API_KEY, term: "s10" }, function(data) {
//  console.log(data);
//});

console.log(web3.version);
web3.eth.getAccounts().then(data => console.log(data));
console.log("hi");

class App extends Component {
  state = {
    manager: "",
    balance: "",
    value: "",
    msg: ""
  };

  onsubmit = async event => {
    event.preventDefault();
    const acc = await web3.eth.getAccounts();
    this.setState({ msg: "You are entering the lottery wait please..." });
    await lottery.methods.enterlottery().send({
      from: acc[0],
      value: web3.utils.toWei(this.state.value)
    });
    this.setState({ msg: "you have entered the lottery" });
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    // const players = await lottery.methods.players(0).call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    console.log("manager address is ", manager);
    // console.log("players are", players);
    this.setState({ manager, balance });
    //const balance = await lottery.methods.getbalance().send();
    console.log("state manager is ", this.state.manager);
  }
  render() {
    return (
      <div>
        <h2>The lottery contract</h2>
        <p>
          The lottery contract is manager by {this.state.manager}. you have a
          chance to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ether!!
        </p>
        <hr />
        <form onSubmit={this.onsubmit}>
          <div>
            <h4>Enter the lottery></h4>
            <label>Amount of ether to senter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Submit</button>
        </form>
        {this.state.msg}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
