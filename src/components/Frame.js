import React, { Component } from "react";

export default class Frame extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <iframe
        {...this.props}
      />
    );
  } 
}