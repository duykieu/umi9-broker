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
} from "@syncfusion/ej2-react-grids";
import PropertyService from "./PropertyService";

const PropertyPage = ({ dispatch }) => {
  const [state, setState] = React.useState({
    showForm: false,
    showLoading: false,
    selectedProperty: undefined,
    gridData: [],
  });
  const loadingOn = () => {
    setState(state => ({ ...state, showLoading: true }));
  };

  const loadingOff = () => {
    setState(state => ({ ...state, showLoading: false }));
  };

  React.useEffect(() => {
    loadingOn();
    PropertyService.get()
      .then(({ data }) => {
        if (data.success) {
          setState(state => ({ ...state, gridData: data.entries.properties }));
        }
        return;
      })
      .then(loadingOff)
      .catch(loadingOff);
  }, []);

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

  return (
    <div>
      <LayoutComponent addItemButton={openForm} pageTitle="Quản lý sản phẩm">
        <GridComponent>
          <ColumnsDirective>
            <ColumnDirective></ColumnDirective>
          </ColumnsDirective>
        </GridComponent>
      </LayoutComponent>
      <LoadingComponent visible={state.showLoading} />
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
