import React from "react";
import { NavLink } from "react-router-dom";
import { ApartmentOutlined } from "@ant-design/icons";

import "./MenuComponentStyle.scss";
import routesList from "../../routes/routesList";

const MenuComponent = () => {
  return (
    <ul className="main__menu">
      {routesList.map(route => (
        <li key={route.path}>
          <NavLink to={route.path} exact={route.exact}>
            <ApartmentOutlined /> {route.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuComponent;
