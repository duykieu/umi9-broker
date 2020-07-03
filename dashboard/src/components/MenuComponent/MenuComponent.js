import React from "react";
import { NavLink } from "react-router-dom";
import {
  ApartmentOutlined,
  DashboardOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";

import "./MenuComponentStyle.scss";
import routesList from "../../routes/routesList";

const MenuComponent = ({ sidebarOpen }) => {
  return (
    <ul className="main__menu">
      {routesList.map(route => (
        <li key={route.path}>
          <NavLink to={route.path}>
            <div>
              <ApartmentOutlined /> {sidebarOpen && <span>{route.label}</span>}
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuComponent;
