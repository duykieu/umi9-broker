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
            <ButtonComponent cssClass="e-outline e-round" onClick={toggleSidebar}>
              {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </ButtonComponent>{" "}
            <h1 className="page__title">{pageTitle}</h1>
          </div>
          <div className="top__right">
            {addItemLink && (
              <Link to={addItemLink}>
                <PlusOutlined />
              </Link>
            )}
            {addItemButton && (
              <ButtonComponent
                cssClass="e-outline e-round"
                onClick={() => {
                  addItemButton();
                }}
              >
                <PlusOutlined />
              </ButtonComponent>
            )}

            <ButtonComponent
              cssClass="e-outline e-round"
              onClick={() => {
                dispatch(authLogoutAction());
              }}
            >
              <LogoutOutlined />
            </ButtonComponent>
          </div>
        </div>

        <div className="content__wrapper">{children}</div>
      </div>
    </div>
  );
};

export default connect()(LayoutComponent);
