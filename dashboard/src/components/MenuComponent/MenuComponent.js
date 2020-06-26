import React from "react";
import { NavLink } from "react-router-dom";
import {
  ApartmentOutlined,
  DashboardOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";

import "./MenuComponentStyle.scss";

const MenuComponent = ({ sidebarOpen }) => {
  return (
    <ul className="main__menu">
      <li>
        <NavLink exact to="/">
          <DashboardOutlined /> {sidebarOpen && <span>Bảng chính</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/property">
          <ApartmentOutlined /> {sidebarOpen && <span>Sản phẩm</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/ads">
          <FormOutlined /> {sidebarOpen && <span>Tin đăng</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <UserOutlined /> {sidebarOpen && <span>Người dùng</span>}
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuComponent;
