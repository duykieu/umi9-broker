import React from "react";
import MenuComponent from "../MenuComponent/MenuComponent";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import Logo from "../../statics/logo.png";
import { Link } from "react-router-dom";

import "./SidebarComponent.scss";

const Sidebar = ({ visible }) => {
  return (
    <div className={`sidebar__content ${visible && "active"}`}>
      <div className="sidebar__content-inner">
        <div className="sidebar__content--logo">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>
        <MenuComponent />
      </div>
    </div>
  );
};

export default Sidebar;
