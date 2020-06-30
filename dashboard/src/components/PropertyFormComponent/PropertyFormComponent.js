import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import slugify from "slugify";

import "./PropertyFormComponent.scss";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import {
  setStateAction,
  setCityAction,
  setWardAction,
  setStreetAction,
} from "../../actions/GeoAction";
import FieldComponent from "../FieldComponent/FieldComponent";
import {
  TextBoxComponent,
  NumericTextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import UserSelectionComponent from "../UserSelectionComponent/UserSelectionComponent";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import ImageComponent from "../ImageComponent/ImageComponent";
import { useFormik } from "formik";
import PropertyFormValidationSchema from "./PropertyFormValidationSchema";

const emptyProperty = {
  address: undefined,
  addressSlug: undefined,
  width: undefined,
  long: undefined,
  behindWidth: undefined,
  landSize: undefined,
  gfa: undefined,
  type: undefined,
  price: undefined,
  priceModel: undefined,
  priceOnSize: undefined,
  numOfFloors: undefined,
  numOfBasements: undefined,
  numOfRootTops: undefined,
  numOfRooms: undefined,
  numOfBeds: undefined,
  description: undefined,
  tags: undefined,
  images: [],

  //User
  createdUser: undefined,
  updatedUser: undefined,
  infoFrom: undefined,
  history: undefined,
  status: undefined,
};

const PropertyFormComponent = ({
  GeoReducer,
  PriceModelReducer,
  CategoryReducer,
  dispatch,
  visible,
  propertyData,
  close,
  title,
}) => {
  const [state, setState] = React.useState({
    formData: emptyProperty,
    category: null,
  });

  React.useEffect(() => {
    if (propertyData) {
      setState((state) => ({ ...state, formData: propertyData }));
    } else {
      setState((state) => ({ ...state, formData: emptyProperty }));
    }
  }, [propertyData]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: PropertyFormValidationSchema,
    initialValues: state.formData,
  });

  const { errors, touched, values, setFieldValue } = formik;

  return (
    <DialogComponent
      header={title || (state.formData._id ? "Sửa sản phẩm" : "Thêm sản phẩm")}
      isModal
      visible={visible}
      width={1024}
      close={close}
      enableResize
      allowDragging
      closeOnEscape
      showCloseIcon
    >
      <div className="page__form">
        <div className="row">
          <FieldComponent label="Danh mục">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              onChange={(v) => console.log({ v })}
            >
              {CategoryReducer.data.map((item) => {
                return (
                  <Select.Option
                    key={item._id}
                    value={slugify(item.name, { locale: "vi", lower: true })}
                  >
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
            <UserSelectionComponent />
          </FieldComponent>
          <FieldComponent label="Liên hệ 2">
            <UserSelectionComponent />
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
          <ImageComponent />
        </div>
        <div className="buttons">
          <ButtonComponent type="submit" isPrimary content="Lưu" />
          <ButtonComponent type="button" onClick={close} content="Huỷ bỏ" />
        </div>
      </div>
    </DialogComponent>
  );
};

const mapStateToProps = ({
  GeoReducer,
  PriceModelReducer,
  CategoryReducer,
}) => ({
  GeoReducer,
  PriceModelReducer,
  CategoryReducer,
});

export default connect(mapStateToProps)(PropertyFormComponent);
