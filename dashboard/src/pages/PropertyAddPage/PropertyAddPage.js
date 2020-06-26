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

  return (
    <LayoutComponent pageTitle="Thêm mới sản phẩm">
      <div className="page__form">
        <div className="row">
          <FieldComponent label="Danh mục">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              onChange={(v) =>
                setState((state) => ({
                  ...state,
                  formData: { ...state.formData, category: v },
                }))
              }
            >
              {CategoryReducer.data.map((item) => {
                return (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </FieldComponent>
          <FieldComponent label="Tỉnh/thành phố">
            <Select
              showSearch
              onChange={(v) => dispatch(setStateAction(v))}
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              value={GeoReducer.selectedState.code}
            >
              {GeoReducer.states.map((item) => {
                return (
                  <Select.Option key={item.code} value={item.code}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </FieldComponent>
        </div>

        <div className="row">
          <FieldComponent label="Quận/huyện">
            <Select
              onChange={(v) => dispatch(setCityAction(v))}
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              value={GeoReducer.selectedCity.code}
              disabled={!GeoReducer.selectedState.code}
            >
              {GeoReducer.cities.map((item) => {
                return (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </FieldComponent>

          <FieldComponent label="Phường/xã">
            <Select
              onChange={(v) => dispatch(setWardAction(v))}
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              value={GeoReducer.selectedWard.code}
              disabled={!GeoReducer.selectedCity.code}
            >
              {GeoReducer.wards.map((item) => {
                return (
                  <Select.Option value={item.code} key={item.code}>
                    {item.prefix} {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </FieldComponent>

          <FieldComponent label="Đường phố">
            <Select
              showSearch
              onChange={(v) => dispatch(setStreetAction(v))}
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              value={GeoReducer.selectedStreet.code}
              disabled={!GeoReducer.selectedCity.code}
            >
              {GeoReducer.streets.map((item) => {
                return (
                  <Select.Option value={item.code} key={item.code}>
                    {item.prefix} {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </FieldComponent>

          <FieldComponent label="Số nhà">
            <TextBoxComponent placeholder="Nhập số nhà" />
          </FieldComponent>

          <FieldComponent label="Giá">
            <TextBoxComponent />
          </FieldComponent>

          <FieldComponent label="Đơn vị tính">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              onChange={(v) =>
                setState((state) => ({
                  ...state,
                  formData: { ...state.formData, priceModel: v },
                }))
              }
            >
              {PriceModelReducer.data.map((item) => {
                return (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </FieldComponent>

          <FieldComponent label="Diện tích tính tiền">
            <TextBoxComponent />
          </FieldComponent>
        </div>
        <div className="divider" />
        <div className="row">
          <FieldComponent size={6} label="Ngang">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="Dài">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="Mặt hậu">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="DT đất">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="DTXD">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="Kết cấu">
            <TextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Số phòng ngủ">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="Số WC">
            <NumericTextBoxComponent min={0} />
          </FieldComponent>
          <FieldComponent size={6} label="Hướng">
            <TextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Pháp lý">
            <TextBoxComponent />
          </FieldComponent>
          <FieldComponent size={3} label="Nhân viên">
            <TextBoxComponent />
          </FieldComponent>
        </div>

        <div className="divider" />
        <div className="row">
          <FieldComponent label="Liên hệ 1">
            <ComboBoxComponent
              allowFiltering
              dataSource={CategoryReducer.data}
              noRecordsTemplate={"<button>Hello</button>"}
            />
          </FieldComponent>
          <FieldComponent label="Liên hệ 2">
            <TextBoxComponent />
          </FieldComponent>
          <FieldComponent size={2} label="Thông tin hoa hồng">
            <TextBoxComponent />
          </FieldComponent>
        </div>
        <div className="divider" />
        <div className="row">
          <FieldComponent size={1} label="Mô tả">
            <TextBoxComponent multiline htmlAttributes={{ rows: "10" }} />
          </FieldComponent>
        </div>
        <div className="divider"></div>
        <div className="form__group">
          <label>Chọn hình ảnh</label>
          <UploaderComponent
            buttons={{
              browse: "Chọn file",
              clear: "Xoá tất cả",
              upload: "Tải lên",
            }}
            asyncSettings={state.asyncSettings}
            maxFileSize={10 * 1024 * 1024} //in byte
            allowedExtensions=".jpg,.jpeg,.png,.gif"
          />
        </div>
        <div className="buttons">
          <ButtonComponent isPrimary content="Lưu" />
          <ButtonComponent isPrimary content="Lưu và tạo mới" />
          <ButtonComponent content="Huỷ bỏ" />
        </div>
      </div>
    </LayoutComponent>
  );
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
