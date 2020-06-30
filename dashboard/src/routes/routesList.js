import DashboardPage from "../pages/DashboardPage/DashboardPage";
import UserPage from "../pages/UserPage/UserPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PropertyPage from "../pages/PropertyPage/PropertyPage";

export default [
  {
    path: "/login",
    component: LoginPage,
    isPublic: true,
  },
  {
    path: "/",
    component: DashboardPage,
    permission: null,
    exact: true,
  },
  {
    path: "/user",
    component: UserPage,
    permission: "UserIndex",
  },
  {
    path: "/property",
    component: PropertyPage,
    permission: "PropertyIndex",
  },
];
