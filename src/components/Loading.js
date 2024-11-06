import React from "react";
import { Spin } from "antd";
import "./style.css";

var divStyle = {
  margin: "auto",
  width: "100px",
  height: "100px",
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
};

export const Loading = () => {
  return (
    <div className="spinner-table" style={divStyle}>
      {/*<Spin size="large" style={{alignItems: 'center', justifyItems: 'center'}} />*/}
      <Spin size="large"/>
    </div>
  );
};

export default Loading;
