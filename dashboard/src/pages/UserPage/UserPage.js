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
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const UserPage = ({ UserReducer, dispatch }) => {
  const [state, setState] = useState({
    showForm: false,
    showLoading: false,
    selectedUser: undefined,
  });

  const openForm = (data = undefined) => {
    setState(state => ({
      ...state,
      showForm: true,
      selectedUser: data,
    }));
  };

  const closeForm = () => {
    setState(state => ({
      ...state,
      showForm: false,
      selectedUser: undefined,
    }));
  };

  const loadingOn = () => {
    setState(state => ({ ...state, showLoading: true }));
  };

  const loadingOff = () => {
    setState(state => ({ ...state, showLoading: false }));
  };

  //Init server data
  React.useEffect(() => {
    loadingOn();
    dispatch(getUserAction()).then(loadingOff);
  }, []);

  //CRUD
  const storeUser = data => {
    return dispatch(storeUserAction(data));
  };

  const updateUser = data => {
    return dispatch(updateUserAction(data));
  };

  const destroyUser = data => {
    return dispatch(destroyUserAction(data));
  };

  const toolbarClickHandler = args => {
    console.log({ args });
  };

  const commandClick = ({ commandColumn, rowData }) => {
    if (commandColumn.type === "edit") {
      openForm(rowData);
    }
  };

  return (
    <LayoutComponent addItemButton={openForm} pageTitle="Quản lý người dùng">
      {/* <GridComponent
        commandClick={commandClick}
        allowSorting
        allowFiltering
        allowPaging
        width="1000"
        dataSource={UserReducer.data}
        toolbar={[{ text: "Add", align: "Right" }]}
        toolbarClick={toolbarClickHandler}
        pageSettings={{ pageSize: 15 }}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="Họ tên" field="fullName" />
          <ColumnDirective headerText="Tên hiển thị" field="displayName" />
          <ColumnDirective headerText="Email" field="email" />
          <ColumnDirective headerText="Tên truy cập" field="username" />
          <ColumnDirective headerText="Số điện thoại" field="phoneNumber" />
          <ColumnDirective headerText="Số phụ" field="subPhoneNumber" />
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
      </GridComponent> */}
      <UserFormComponent
        model="user"
        title="Thêm người dùng"
        closeForm={closeForm}
        visible={state.showForm}
        userData={state.selectedUser}
        storeUser={storeUser}
        updateUser={updateUser}
        destroyUser={destroyUser}
        loadingOff={loadingOff}
        loadingOn={loadingOn}
        dispatch={dispatch}
      />
      <LoadingComponent visible={state.showLoading} />
    </LayoutComponent>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  UserReducer,
});

export default connect(mapStateToProps)(UserPage);
