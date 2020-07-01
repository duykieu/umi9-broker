import React from "react";
import { connect } from "react-redux";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";
import PropertyFormComponent from "../../components/PropertyFormComponent/PropertyFormComponent";
import { getPropertyAction } from "../../modules/Property/PropertyActions";

const PropertyPage = ({ dispatch }) => {
  const [state, setState] = React.useState({
    showForm: false,
    showLoading: false,
    selectedProperty: undefined,
  });
  const loadingOn = () => {
    setState((state) => ({ ...state, showLoading: true }));
  };

  const loadingOff = () => {
    setState((state) => ({ ...state, showLoading: false }));
  };

  React.useEffect(() => {
    dispatch(getPropertyAction());
  }, []);

  const openForm = (data = undefined) => {
    setState((state) => ({ ...state, showForm: true, selectedProperty: data }));
  };

  const closeForm = () => {
    setState((state) => ({
      ...state,
      showForm: false,
      selectedProperty: undefined,
    }));
  };

  return (
    <React.Fragment>
      <LayoutComponent addItemButton={openForm} pageTitle="Quản lý sản phẩm">
        <h1>Hello from Property Page</h1>
      </LayoutComponent>
      {state.showForm && (
        <PropertyFormComponent
          visible={state.showForm}
          propertyData={state.selectedProperty}
          close={closeForm}
        />
      )}
    </React.Fragment>
  );
};

export default connect()(PropertyPage);
