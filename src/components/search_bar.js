import React, { Component } from "react";

class searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "Default", clicked: false };
  }
  checkbutton() {
    if (this.state.clicked) {
      return <p>The button is clicked</p>;
    }
  }
  render() {
    return (
      <div>
        <input
          value={this.state.term}
          //// setting the state of the searchbar using setState when a onchange even occurs
          onChange={event => this.setState({ term: event.target.value })}
        />{" "}
        Typed value is :{this.state.term}
        <button
          onClick={() => {
            console.log("clicked");
            this.setState({ clicked: !this.state.clicked });
          }}
        >
          {" "}
          please click
        </button>
        {this.checkbutton()}
      </div>
    );
  }

  //event handler for handling any events
}

export default searchbar;
