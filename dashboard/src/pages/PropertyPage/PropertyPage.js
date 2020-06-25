import React from "react";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";

const PropertyPage = () => {
  return (
    <LayoutComponent addItemLink="/property/add" pageTitle="Quản lý sản phẩm">
      <h1>Hello from Property Page</h1>
    </LayoutComponent>
  );
};

export default PropertyPage;
