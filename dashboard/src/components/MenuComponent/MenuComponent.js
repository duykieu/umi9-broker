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
          <div>
            <DashboardOutlined /> {sidebarOpen && <span>Bảng chính</span>}
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/property">
          <div>
            <ApartmentOutlined /> {sidebarOpen && <span>Sản phẩm</span>}
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/ads">
          <div>
            <FormOutlined /> {sidebarOpen && <span>Tin đăng</span>}
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <div>
            <UserOutlined /> {sidebarOpen && <span>Người dùng</span>}
          </div>
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuComponent;
