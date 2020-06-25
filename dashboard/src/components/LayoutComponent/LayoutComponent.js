import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import "./LayoutStyle.scss";
import MenuComponent from "../MenuComponent/MenuComponent";
import { NavLink } from "react-router-dom";

const LayoutComponent = ({ children, addItemLink, pageTitle }) => {
  let sideBarRef = React.createRef();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="main__layout">
      <SidebarComponent isOpen={sidebarOpen} enableDock dockSize="55">
        <div className="sidebar__content">
          <button onClick={toggleSidebar}>
            {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </button>
          <MenuComponent />
        </div>
      </SidebarComponent>
      <div className="main__content">
        <h1 className="page__title">{pageTitle}</h1>
        <div className="content__wrapper">{children}</div>
      </div>
      {addItemLink && (
        <div className="loading__button">
          <NavLink to={addItemLink} exact>
            <PlusOutlined />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default LayoutComponent;
