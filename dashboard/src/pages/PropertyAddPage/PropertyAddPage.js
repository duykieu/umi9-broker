import React, { useState } from "react";
import { connect } from "react-redux";
import { Query } from "@syncfusion/ej2-data";
import {
  TextBoxComponent,
  NumericTextBoxComponent,
  UploaderComponent,
} from "@syncfusion/ej2-react-inputs";

import { Select } from "antd";

import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";
import FieldComponent from "../../components/FieldComponent/FieldComponent";

//css
import "./PropertyAddPage.scss";
import {
  fetchStatesAction,
  setStateAction,
  setCityAction,
  setWardAction,
  setStreetAction,
} from "../../actions/GeoAction";
import GeoReducer from "../../reducers/GeoReducer";
import { getCategoryAction } from "../../actions/CategoryAction";
import { getPriceModelAction } from "../../actions/PriceModelAction";
import UserSelectionComponent from "../../components/UserSelectionComponent/UserSelectionComponent";
import ImageComponent from "../../components/ImageComponent/ImageComponent";

const PropertyAddPage = ({
  GeoReducer,
  CategoryReducer,
  PriceModelReducer,
  dispatch,
}) => {
  const [state, setState] = React.useState({
    asyncSettings: {
      saveUrl: "/",
      removeUrl: "/",
    },
    formData: {
      category: null,
      priceModel: null,
    },
  });

  React.useEffect(() => {
    dispatch(fetchStatesAction());
    dispatch(getCategoryAction());
    dispatch(getPriceModelAction());
  }, []);

  const geoObj = { text: "name", value: "code" };

  return <LayoutComponent pageTitle="Thêm mới sản phẩm"></LayoutComponent>;
};

const mapStateToProps = ({
  GeoReducer,
  CategoryReducer,
  PriceModelReducer,
}) => ({
  GeoReducer,
  CategoryReducer,
  PriceModelReducer,
});

export default connect(mapStateToProps)(PropertyAddPage);
