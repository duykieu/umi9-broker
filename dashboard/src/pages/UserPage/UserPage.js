import React, { useState } from "react";
import { connect } from "react-redux";
import {
  ColumnsDirective,
  ColumnDirective,
  GridComponent,
  Filter,
  Inject,
  Page,
  Sort,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";
import UserFormComponent from "../../components/UserFormComponent/UserFormComponent";
import {
  getUserAction,
  storeUserAction,
  updateUserAction,
  destroyUserAction,
} from "../../actions/UserAction";
import { Col } from "antd";

const emptyUser = {
  fullName: undefined,
  displayName: undefined,
  username: undefined,
  email: undefined,
  phoneNumber: undefined,
  password: undefined,
  passwordConfirm: undefined,
  phoneNumber: undefined,
  subPhoneNumber: undefined,
  address: undefined,
};

const UserPage = ({ UserReducer, dispatch }) => {
  const [state, setState] = useState({
    showForm: false,
    showLoading: false,
    data: emptyUser,
  });

  const openForm = (data = undefined) => {
    setState((state) => ({
      ...state,
      showForm: true,
      data: data ? data : emptyUser,
    }));
  };

  const closeForm = () => {
    setState((state) => ({ ...state, showForm: false, data: emptyUser }));
  };

  const loadingOn = () => {
    setState((state) => ({ ...state, showLoading: true }));
  };

  const loadingOff = () => {
    setState((state) => ({ ...state, showLoading: false }));
  };

  //Init server data
  React.useEffect(() => {
    dispatch(getUserAction());
  }, []);

  //CRUD
  const storeUser = (data) => {
    return dispatch(storeUserAction(data));
  };

  const updateUser = (data) => {
    return dispatch(updateUserAction(data));
  };

  const destroyUser = (data) => {
    return dispatch(destroyUserAction(data));
  };

  const toolbarClickHandler = (args) => {
    console.log({ args });
  };

  const commandClick = ({ commandColumn, rowData }) => {
    if (commandColumn.type === "edit") {
      openForm(rowData);
    }
  };

  return (
    <React.Fragment>
      <LayoutComponent addItemButton={openForm} pageTitle="Quản lý người dùng">
        <div className="grid__container">
          <GridComponent
            commandClick={commandClick}
            allowSorting
            allowFiltering
            allowPaging
            width={1366 - 250}
            dataSource={UserReducer.data}
            toolbar={[{ text: "Add", align: "Right" }]}
            toolbarClick={toolbarClickHandler}
            pageSettings={{ pageSize: 15 }}
          >
            <ColumnsDirective>
              <ColumnDirective headerText="Họ tên" field="fullName" />
              <ColumnDirective headerText="Tên hiển thị" field="displayName" />
              <ColumnDirective width={250} headerText="Email" field="email" />
              <ColumnDirective headerText="Tên truy cập" field="username" />
              <ColumnDirective headerText="Số điện thoại" field="phoneNumber" />
              <ColumnDirective
                commands={[
                  {
                    buttonOption: {
                      content: "Sửa",
                    },
                    type: "edit",
                  },
                  { buttonOption: { content: "Xoá" }, type: "delete" },
                ]}
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, CommandColumn]} />
          </GridComponent>
        </div>
      </LayoutComponent>
      <UserFormComponent
        model="user"
        title="Thêm người dùng"
        closeForm={closeForm}
        visible={state.showForm}
        userData={state.data}
        storeUser={storeUser}
        updateUser={updateUser}
        destroyUser={destroyUser}
        loadingOff={loadingOff}
        loadingOn={loadingOn}
        dispatch={dispatch}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  UserReducer,
});

export default connect(mapStateToProps)(UserPage);
