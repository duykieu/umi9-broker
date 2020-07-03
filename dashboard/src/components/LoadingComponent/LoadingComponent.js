import React from "react";
import { Spin } from "antd";

import "./LoadingComponent.scss";

const LoadingComponent = ({ visible }) => {
  return (
    <div className={"loading__backdrop " + (visible && "visible")}>
      <div className="spin__container">
        <Spin className="spin" size="large" />
      </div>
    </div>
  );
};
export default LoadingComponent;
