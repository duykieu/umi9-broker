import React from "react";
import MenuComponent from "../MenuComponent/MenuComponent";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import Logo from "../../statics/logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  if (!sidebarOpen) return null;

  return (
    <div className="sidebar__content">
      <div className="sidebar__content--logo">
        {/* {sidebarOpen && (
          <Link to="/">
            <img src={Logo} />
          </Link>
        )} */}
      </div>
      <MenuComponent sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default Sidebar;
