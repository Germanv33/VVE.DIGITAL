import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";

class Portal extends Component<{ children: React.ReactNode }> {
  private el: HTMLDivElement = document.createElement("div");

  public componentDidMount() {
    document.body.appendChild(this.el);
  }

  public componentWillUnmount() {
    document.body.appendChild(this.el);
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
