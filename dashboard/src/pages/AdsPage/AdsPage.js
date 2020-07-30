import React from "react";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";

import "../../styles/main.scss";

const AdsPage = () => {
  return (
    <LayoutComponent addItemLink="/ads/add" pageTitle="Quản lý tin đăng">
      <h1>Hello from Ads Page</h1>
    </LayoutComponent>
  );
};

export default AdsPage;
