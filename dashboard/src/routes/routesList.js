import React from "react";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import UserPage from "../pages/UserPage/UserPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PropertyPage from "../modules/Property/PropertyPage";
import PropertyFormComponent from "../modules/Property/PropertyFormComponent";
import LayoutComponent from "../components/LayoutComponent/LayoutComponent";

export default [
  {
    path: "/login",
    component: LoginPage,
    isPublic: true,
    label: "Đăng nhập",
  },
  {
    path: "/",
    component: DashboardPage,
    permission: "DashboardIndex",
    exact: true,
    label: "Bảng chính",
  },
  {
    path: "/user",
    component: UserPage,
    permission: "UserIndex",
    label: "Người dùng",
  },
  {
    path: "/property",
    component: PropertyPage,
    permission: "PropertyIndex",
    label: "Sản phẩm",
    exact: true,
  },
];
