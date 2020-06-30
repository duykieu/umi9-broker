import React from "react";
import MenuComponent from "../MenuComponent/MenuComponent";

const SidebarComponent = ({ sidebarOpen }) => {
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

export default SidebarComponent;
