import React from "react";
import { NavLink } from "react-router-dom";

import "./MenuComponentStyle.scss";

const MenuComponent = () => {
  return (
    <ul class="main__menu">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/property">Sản phẩm</NavLink>
      </li>
    </ul>
  );
};

export default MenuComponent;
