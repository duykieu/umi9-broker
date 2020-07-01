import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import slugify from "slugify";
import { Query } from "@syncfusion/ej2-data";

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
import { getPriceModelAction } from "../../actions/PriceModelAction";
import {
  getCategoryAction,
  storeCategoryAction,
} from "../../actions/CategoryAction";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import constants from "../../constants";
import { getUserAction } from "../../actions/UserAction";
import { getAllByDisplayValue } from "@testing-library/react";
import { storePropertyAction } from "../../modules/Property/PropertyActions";

const emptyProperty = {
  category: undefined,
  address: undefined,
  addressSlug: undefined,
  state: undefined,
  city: undefined,
  street: undefined,
  ward: undefined,
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
  structure: undefined,
  commission: undefined,
  tags: undefined,
  images: [],

  //User
  user: undefined,
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
  UserReducer,
  dispatch,
  visible,
  propertyData,
  close,
  title,
}) => {
  const [state, setState] = React.useState({
    formData: emptyProperty,
    category: null,
    defaultState: "SG",
    defaultCategory: "cho-thue-nha-mat-tien",
    defaultCity: "SG_10",
  });

  let stateRef = ComboBoxComponent;
  let cityRef = ComboBoxComponent;
  let streetRef = ComboBoxComponent;
  let wardRef = ComboBoxComponent;

  React.useEffect(() => {
    if (propertyData) {
      setState((state) => ({ ...state, formData: propertyData }));
    } else {
      setState((state) => ({ ...state, formData: emptyProperty }));
    }
  }, [propertyData]);

  React.useEffect(() => {
    dispatch(getPriceModelAction());
    dispatch(getCategoryAction());
    dispatch(getUserAction({ type: "internal" }));
  }, []);

  React.useEffect(() => {
    console.log({ stateRef });
  }, [stateRef]);

  const onFormSubmit = (values, { resetForm }) => {
    console.log({ values, resetForm });

    dispatch(storePropertyAction(values)).then(({ success }) => {
      if (success) {
        resetForm(emptyProperty);
        close();
      }
    });

    // console.log({ result });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: PropertyFormValidationSchema,
    initialValues: state.formData,
    onSubmit: onFormSubmit,
  });

  const { errors, touched, values, setFieldValue, handleSubmit } = formik;

  React.useEffect(() => {
    setFieldValue("state", "");
    setFieldValue("city", "");
    setFieldValue("ward", "");
    setFieldValue("street", "");
  }, []);

  React.useEffect(() => {
    setFieldValue("city", "");
    setFieldValue("ward", "");
    setFieldValue("street", "");
  }, [values.state]);

  React.useEffect(() => {
    setFieldValue("ward", "");
    setFieldValue("street", "");
  }, [values.city]);

  const onGeoChange = (name, value, action) => {
    setFieldValue(name, value);
    dispatch(action(value));
  };

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
      <form onSubmit={handleSubmit} className="page__form">
        <div className="row">
          <FieldComponent
            error={errors["category"]}
            touched={touched["category"]}
            label="Danh mục"
          >
            <ComboBoxComponent
              fields={{ groupBy: "model", text: "name", value: "slug" }}
              dataSource={CategoryReducer.data}
              allowFiltering
              ignoreAccent
              filterType="Contains"
              placeholder="Vui lòng chọn"
              change={({ value }) => setFieldValue("category", value)}
            />
          </FieldComponent>
          <FieldComponent
            errors={errors["state"]}
            touched={touched["state"]}
            label="Tỉnh/thành phố"
          >
            <ComboBoxComponent
              dataSource={GeoReducer.states}
              fields={{ text: "name", value: "_id" }}
              change={({ value }) => {
                cityRef.text = "";
                wardRef.text = "";
                streetRef.text = "";
                cityRef.dataBind();
                wardRef.dataBind();
                streetRef.dataBind();
                onGeoChange("state", value, setStateAction);
              }}
              allowFiltering
              ignoreAccent
              ref={(ref) => (stateRef = ref)}
            />
          </FieldComponent>
        </div>

        <div className="row">
          <FieldComponent
            error={errors["city"]}
            touched={touched["city"]}
            label="Quận/huyện"
          >
            <ComboBoxComponent
              dataSource={GeoReducer.cities}
              fields={{ text: "name", value: "_id" }}
              change={({ value }) => {
                wardRef.text = "";
                streetRef.text = "";
                wardRef.dataBind();
                streetRef.dataBind();
                onGeoChange("city", value, setStateAction);
              }}
              allowFiltering
              ignoreAccent
              ref={(ref) => (cityRef = ref)}
            />
          </FieldComponent>

          <FieldComponent
            error={errors["ward"]}
            touched={touched["ward"]}
            label="Phường/xã"
          >
            <ComboBoxComponent
              dataSource={GeoReducer.wards}
              fields={{ text: "name", value: "_id" }}
              change={({ value }) => {
                onGeoChange("ward", value, setStateAction);
              }}
              allowFiltering
              ignoreAccent
              ref={(ref) => (wardRef = ref)}
            />
          </FieldComponent>

          <FieldComponent
            label="Đường phố"
            error={errors["street"]}
            touched={touched["street"]}
          >
            <ComboBoxComponent
              dataSource={GeoReducer.streets}
              fields={{ text: "name", value: "_id" }}
              change={({ value }) => {
                onGeoChange("street", value, setStateAction);
              }}
              allowFiltering
              ignoreAccent
              ref={(ref) => (streetRef = ref)}
            />
          </FieldComponent>

          <FieldComponent
            label="Số nhà"
            error={errors["address"]}
            touched={touched["address"]}
          >
            <TextBoxComponent
              change={({ value }) => setFieldValue("address", value)}
              placeholder="Nhập số nhà"
            />
          </FieldComponent>

          <FieldComponent
            label="Giá"
            error={errors["price"]}
            touched={touched["price"]}
          >
            <NumericTextBoxComponent
              min={0}
              change={({ value }) => setFieldValue("price", value)}
              placeholder="Không nhập nếu thoả thuận"
            />
          </FieldComponent>

          <FieldComponent
            label="Đơn vị tính"
            error={errors["priceModel"]}
            touched={touched["priceModel"]}
          >
            <ComboBoxComponent
              fields={{ text: "name", value: "code" }}
              dataSource={PriceModelReducer.data}
              allowFiltering
              ignoreAccent
              filterType="Contains"
              placeholder="Vui lòng chọn"
              change={({ value }) => setFieldValue("priceModel", value)}
            />
          </FieldComponent>

          <FieldComponent
            label="Diện tích tính tiền"
            error={errors["priceOnSize"]}
            touched={touched["priceOnSize"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("priceOnSize", value)}
              min={0}
            />
          </FieldComponent>
        </div>
        <div className="divider" />
        <div className="row">
          <FieldComponent
            size={6}
            label="Ngang"
            error={errors["width"]}
            touched={touched["width"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("width", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Dài"
            error={errors["long"]}
            touched={touched["long"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("long", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Mặt hậu"
            error={errors["behindWidth"]}
            touched={touched["behindWidth"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("behindWidth", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="DT đất"
            error={errors["landSize"]}
            touched={touched["landSize"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("landSize", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="DTXD"
            error={errors["gfa"]}
            touched={touched["gfa"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("gfa", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Kết cấu"
            error={errors["structure"]}
            touched={touched["structure"]}
          >
            <TextBoxComponent
              change={({ value }) => setFieldValue("structure", value)}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Số phòng ngủ"
            error={errors["numOfBeds"]}
            touched={touched["numOfBeds"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("numOfBeds", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Số WC"
            error={errors["NumOfWcs"]}
            touched={touched["numOfWcs"]}
          >
            <NumericTextBoxComponent
              change={({ value }) => setFieldValue("numOfWcs", value)}
              min={0}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Hướng"
            error={errors["direction"]}
            touched={touched["direction"]}
          >
            <ComboBoxComponent
              dataSource={constants.LIST_OF_DIRECTION}
              fields={{ text: "name", value: "code" }}
              change={({ value }) => setFieldValue("direction", value)}
            />
          </FieldComponent>
          <FieldComponent
            size={6}
            label="Pháp lý"
            error={errors["paperModel"]}
            touched={touched["paperModel"]}
          >
            <TextBoxComponent />
          </FieldComponent>
          <FieldComponent
            size={3}
            label="Nhân viên"
            error={errors["user"]}
            touched={touched["user"]}
          >
            <UserSelectionComponent
              groups={["staff"]}
              listUsers={UserReducer.data}
              change={({ value }) => setFieldValue("user", value)}
            />
          </FieldComponent>
        </div>

        <div className="divider" />
        <div className="row">
          <FieldComponent
            size={3}
            label="Liên hệ 1"
            error={errors["firstContact"]}
            touched={touched["firstContact"]}
          >
            <UserSelectionComponent
              listUsers={UserReducer.data}
              groups={["host", "partner"]}
              change={({ value }) => setFieldValue("firstContact", value)}
            />
          </FieldComponent>
          <FieldComponent
            size={3}
            label="Liên hệ 2"
            error={errors["secondContact"]}
            touched={touched["secondContact"]}
          >
            <UserSelectionComponent
              listUsers={UserReducer.data}
              groups={["host", "partner"]}
              change={({ value }) => setFieldValue("secondContact", value)}
            />
          </FieldComponent>
          <FieldComponent
            size={3}
            label="Thông tin hoa hồng"
            error={errors["commission"]}
            touched={touched["commission"]}
          >
            <TextBoxComponent
              change={({ value }) => setFieldValue("commission", value)}
            />
          </FieldComponent>
        </div>
        <div className="divider" />
        <div className="row">
          <FieldComponent
            size={1}
            label="Mô tả"
            error={errors["description"]}
            touched={touched["description"]}
          >
            <TextBoxComponent
              multiline
              htmlAttributes={{ rows: "10" }}
              change={({ value }) => setFieldValue("description", value)}
            />
          </FieldComponent>
        </div>
        <div className="divider"></div>
        <div className="form__group">
          <label>Chọn hình ảnh</label>
          <ImageComponent />
        </div>
        <div className="buttons">
          <ButtonComponent
            // onClick={handleSubmit}
            type="submit"
            isPrimary
            content="Lưu"
          />
          <ButtonComponent type="button" onClick={close} content="Huỷ bỏ" />
        </div>
      </form>
    </DialogComponent>
  );
};

const mapStateToProps = ({
  GeoReducer,
  PriceModelReducer,
  CategoryReducer,
  UserReducer,
}) => ({
  GeoReducer,
  PriceModelReducer,
  CategoryReducer,
  UserReducer,
});

export default connect(mapStateToProps)(PropertyFormComponent);
