import React from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";

const PropertyAddPage = () => {
  return (
    <LayoutComponent pageTitle="Thêm mới sản phẩm">
      <div className="page__form">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 form__group">
            <label>Name</label>
            <TextBoxComponent
              id="default"
              floatLabelType="Never"
              placeholder="Enter your address"
            ></TextBoxComponent>
          </div>
          <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 form__group">
            <label>Email</label>
            <TextBoxComponent
              id="default"
              floatLabelType="Never"
              placeholder="Enter your address"
            ></TextBoxComponent>
          </div>
          <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 form__group">
            <label>Password</label>
            <TextBoxComponent
              id="default"
              floatLabelType="Never"
              placeholder="Enter your address"
            ></TextBoxComponent>
          </div>
          <div className="col-md-6">sdfsdlfjdf</div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default PropertyAddPage;
