import React from "react";
import { connect } from "react-redux";

import "./LayoutStyle.scss";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import TopBarComponent from "../TopBarComponent/TopBarComponent";

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
      <SidebarComponent visible={sidebarOpen} />
      <div className="main__content">
        <TopBarComponent
          toggleSidebar={toggleSidebar}
          addItemLink={addItemLink}
          addItemButton={addItemButton}
          pageTitle={pageTitle}
        />
        <div className="content__wrapper">{children}</div>
      </div>
    </div>
  );
};

export default connect()(LayoutComponent);
