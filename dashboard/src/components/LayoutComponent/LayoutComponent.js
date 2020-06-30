import React from "react";
import { connect } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import * as Logo from "../../statics/logo.png";
import "./LayoutStyle.scss";
import MenuComponent from "../MenuComponent/MenuComponent";
import { NavLink, Link } from "react-router-dom";
import { authLogoutAction } from "../../actions/AuthAction";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

const LayoutComponent = ({
  children,
  addItemLink,
  addItemButton,
  pageTitle,
  dispatch,
}) => {
  let sideBarRef = React.createRef();

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="main__layout">
      <SidebarComponent sidebarOpen={sidebarOpen}></SidebarComponent>
      <div
        style={{ width: !sidebarOpen ? "100vw" : "calc(100vw-6.5rem)" }}
        className="main__content"
      >
        <div className="top__bar">
          <div className="top__left">
            <button onClick={toggleSidebar}>
              {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </button>{" "}
            <h1 className="page__title">{pageTitle}</h1>
          </div>
          <div className="top__right">
            <button
              onClick={() => {
                dispatch(authLogoutAction());
              }}
            >
              <LogoutOutlined />
            </button>
          </div>
        </div>

        <div className="content__wrapper">{children}</div>
        {addItemLink && (
          <div className="loading__button">
            <NavLink to={addItemLink} exact>
              <PlusOutlined />
            </NavLink>
          </div>
        )}
        {addItemButton && (
          <div className="loading__button">
            <button className="button" onClick={() => addItemButton()}>
              <PlusOutlined />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect()(LayoutComponent);
