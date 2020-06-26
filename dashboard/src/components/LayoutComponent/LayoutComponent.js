import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import * as Logo from "../../statics/logo.png";
import "./LayoutStyle.scss";
import MenuComponent from "../MenuComponent/MenuComponent";
import { NavLink, Link } from "react-router-dom";

const LayoutComponent = ({ children, addItemLink, pageTitle }) => {
  let sideBarRef = React.createRef();

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="main__layout">
      <SidebarComponent
        isOpen={sidebarOpen}
        enablePersistence
        enableDock
        dockSize="55"
        type="Slide"
        close={() => setSidebarOpen(false)}
      >
        <div className="sidebar__content">
          <div className="sidebar__content--logo">
            {sidebarOpen && (
              <Link to="/">
                <img src={Logo} />
              </Link>
            )}

            <button onClick={toggleSidebar}>
              {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </button>
          </div>
          <MenuComponent sidebarOpen={sidebarOpen} />
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
