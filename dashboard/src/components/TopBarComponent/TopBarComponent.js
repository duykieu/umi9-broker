import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { authLogoutAction } from "../../actions/AuthAction";

import "./TopBarComponent.scss";

const TopBarComponent = ({
  sidebarOpen,
  addItemLink,
  addItemButton,
  toggleSidebar,
  dispatch,
  pageTitle,
}) => {
  return (
    <div className="top__bar">
      <div className="top__bar-left">
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </button>
      </div>
      <div className="top__bar-center">
        <input placeholder="Bạn muốn tìm gì ?" className="form-control form-control-lg" />
      </div>
      <div className="top__bar-right">
        {addItemLink && (
          <Link to={addItemLink}>
            <PlusOutlined />
          </Link>
        )}
        {addItemButton && (
          <button
            onClick={() => {
              addItemButton();
            }}
          >
            <PlusOutlined />
          </button>
        )}

        <button
          onClick={() => {
            dispatch(authLogoutAction());
          }}
        >
          <LogoutOutlined />
        </button>
      </div>
    </div>
  );
};
export default connect()(TopBarComponent);
