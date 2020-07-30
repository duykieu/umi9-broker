import React from "react";
import { connect } from "react-redux";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";
import PropertyFormComponent from "./PropertyFormComponent";
import { getPropertyAction } from "./PropertyActions";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import PropertyService from "./PropertyService";
import {
  DataManager,
  WebApiAdaptor,
  Query,
  WebMethodAdaptor,
} from "@syncfusion/ej2-data";
import TTableComponent from "../../components/TTableComponent/TTableComponent";

import FilterComponent from "./FilterComponent";

const PropertyPage = ({ dispatch }) => {
  const [state, setState] = React.useState({
    showForm: false,
    showLoading: false,
    selectedProperty: undefined,
    metaData: {
      currentPage: 0,
      nextPage: null,
      numOfPage: -1,
      perPage: 20,
      prevPage: null,
      total: 8949,
    },
    currentPage: 0,
    pageSize: window.innerHeight >= 900 ? 20 : 15,
    gridData: [],
    filter: {
      state: "",
      city: "",
      street: "",
      price: [0, 50],
      width: [0, 100],
    },
  });

  const loadingOn = () => {
    setState(state => ({ ...state, showLoading: true }));
  };

  const loadingOff = () => {
    setState(state => ({ ...state, showLoading: false }));
  };

  const onPageChangeHandler = pageNumber => {
    setState(state => ({ ...state, currentPage: pageNumber }));
  };

  React.useEffect(() => {
    loadingOn();
    PropertyService.get({
      $skip: state.pageSize * state.currentPage,
      $top: state.pageSize,
      $filter: state.filter,
    })
      .then(({ data }) => {
        if (data.success) {
          setState(state => ({
            ...state,
            gridData: data.entries.properties,
            metaData: data.entries.meta,
          }));
        }
        return;
      })
      .then(loadingOff)
      .catch(loadingOff);
  }, [state.pageSize, state.currentPage, state.filter]);

  const openForm = (data = undefined) => {
    setState(state => ({ ...state, showForm: true, selectedProperty: data }));
  };

  const closeForm = () => {
    setState(state => ({
      ...state,
      showForm: false,
      selectedProperty: undefined,
    }));
  };

  const commandClick = ({ commandColumn, rowData }) => {
    if (commandColumn.type === "edit") {
      console.log({ rowData });
    }
  };

  const dataSource = new DataManager(
    {
      url: process.env.REACT_APP_MAIN_API + "/property/grid",
      adaptor: new WebApiAdaptor(),
    },
    new Query().addParams({ myLocation: "VN" })
  );

  const columns = React.useMemo(
    () => [
      {
        accessor: "category",
        headerText: "Chuyên mục",
        Filter: false,
      },
      {
        accessor: "fullAddress",
        headerText: "Địa chỉ",
        Filter: false,
      },
      {
        accessor: "width",
        headerText: "Ngang",
        Filter: false,
      },
      {
        accessor: "long",
        headerText: "Dài",
        Filter: false,
      },
      {
        accessor: "structure",
        headerText: "Kết cấu",
        Filter: false,
      },
    ],
    []
  );

  return (
    <div>
      <LayoutComponent addItemButton={openForm} pageTitle="Quản lý sản phẩm">
        <div className="card card-responsive">
          {/* <FilterComponent /> */}
          <TTableComponent
            metaData={state.metaData}
            manualPagination
            data={state.gridData}
            columns={columns}
            onPageChange={onPageChangeHandler}
            perPage={state.perPage}
          />
        </div>
      </LayoutComponent>
      <PropertyFormComponent
        visible={state.showForm}
        propertyData={state.selectedProperty}
        close={closeForm}
        loadingOn={loadingOn}
        loadingOff={loadingOff}
      />
    </div>
  );
};

export default connect()(PropertyPage);
