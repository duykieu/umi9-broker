import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Select, Input, Button, InputNumber } from "antd";
import { useHistory, Redirect } from "react-router-dom";
import { Modal } from "office-ui-fabric-react";
import slugify from "slugify";
import { Query } from "@syncfusion/ej2-data";

import "./PropertyStyles.scss";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import {
  setStateAction,
  setCityAction,
  setWardAction,
  setStreetAction,
} from "../../actions/GeoAction";
import FieldComponent from "../../components/FieldComponent/FieldComponent";
import { TextBoxComponent, NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import UserSelectionComponent from "../../components/UserSelectionComponent/UserSelectionComponent";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { useFormik } from "formik";
import PropertyFormValidationSchema from "./PropertyFormValidationSchema";
import { getPriceModelAction } from "../../actions/PriceModelAction";
import { getCategoryAction, storeCategoryAction } from "../../actions/CategoryAction";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import constants from "../../constants";
import { getUserAction } from "../../actions/UserAction";
import { getAllByDisplayValue } from "@testing-library/react";
import { storePropertyAction } from "./PropertyActions";
import { CSSTransition } from "react-transition-group";
import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { headerCellInfo } from "@syncfusion/ej2-react-grids";

const emptyProperty = {
  categorySlug: "",
  address: "",
  addressSlug: "",
  state: "",
  city: "",
  street: "",
  ward: "",
  width: "",
  long: "",
  behindWidth: "",
  landSize: "",
  gfa: "",
  type: "",
  price: "",
  priceModelCode: "",
  priceOnSize: "",
  numOfFloors: "",
  numOfBasements: "",
  numOfRootTops: "",
  numOfRooms: "",
  numOfBeds: "",
  description: "",
  structure: "",
  commission: "",
  tags: "",
  images: [],

  //User
  username: "",
  createdUsername: "",
  updatedUsername: "",
  infoFrom: "",
  history: "",
  status: "",
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
    showLoading: false,
  });

  const loadingOn = () => {
    setState(state => ({ ...state, showLoading: true }));
  };

  const loadingOff = () => {
    setState(state => ({ ...state, showLoading: false }));
  };

  let stateRef = ComboBoxComponent;
  let cityRef = ComboBoxComponent;
  let streetRef = ComboBoxComponent;
  let wardRef = ComboBoxComponent;

  React.useEffect(() => {
    if (propertyData) {
      setState(state => ({ ...state, formData: propertyData }));
    } else {
      setState(state => ({ ...state, formData: emptyProperty }));
    }
  }, [propertyData]);

  React.useEffect(() => {
    Promise.all([
      loadingOn(),
      dispatch(getPriceModelAction()),
      dispatch(getCategoryAction()),
      dispatch(getUserAction({ type: "internal" })),
    ]).then(loadingOff);
  }, []);

  const onFormSubmit = (values, { resetForm }) => {
    loadingOn();
    dispatch(storePropertyAction(values))
      .then(({ success }) => {
        if (success) {
          loadingOff();
          return resetForm(emptyProperty);
        }
        return false;
      })
      .then(loadingOff);
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
    (async function () {
      setFieldValue(name, value);
      dispatch(action(value));
    })();
  };

  React.useEffect(() => {
    setState(state => ({ ...state, formData: emptyProperty }));
  }, [state.showLoading]);

  const buttons = [
    {
      buttonModel: {
        content: "Lưu lại",
        isPrimary: true,
      },
      click: () => {
        alert("Hello");
      },
    },
    {
      buttonModel: {
        content: "Huỷ bỏ",
      },
      click: () => {
        alert("Balo");
      },
    },
  ];

  return (
    <DialogComponent
      closeOnEscape
      close={close}
      width={1024}
      isModal
      visible={visible}
      showCloseIcon
      header={title || "Thông tin sản phẩm"}
      buttons={buttons}
    >
      {/* <LoadingComponent visible={state.showLoading} /> */}
      <div className="page__form">
        <div className="row">
          <FieldComponent
            error={errors["categorySlug"]}
            touched={touched["categorySlug"]}
            label="Danh mục"
          >
            {/* <ComboBoxComponent
              fields={{ text: "name", value: "slug" }}
              dataSource={CategoryReducer.data}
              allowFiltering
              ignoreAccent
              filterType="Contains"
              placeholder="Vui lòng chọn"
              change={({ value }) => setFieldValue("categorySlug", value)}
              value={values.categorySlug}
            /> */}
          </FieldComponent>
          <FieldComponent
            errors={errors["state"]}
            touched={touched["state"]}
            label="Tỉnh/thành phố"
          >
            <Select
              placeholder="Vui lòng chọn"
              className="block"
              value={values.state}
              onChange={value => onGeoChange("state", value, setStateAction)}
            >
              {GeoReducer.states.map(item => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FieldComponent>
        </div>

        <div className="row">
          <FieldComponent
            error={errors["city"]}
            touched={touched["city"]}
            label="Quận/huyện"
          >
            <Select
              placeholder="Vui lòng chọn"
              className="block"
              value={values.city}
              onChange={value => onGeoChange("city", value, setCityAction)}
              disabled={!values.state}
            >
              {GeoReducer.cities.map(item => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FieldComponent>

          <FieldComponent
            error={errors["ward"]}
            touched={touched["ward"]}
            label="Phường/xã"
          >
            <Select
              value={values.ward}
              disabled={!values.city}
              placeholder="Vui lòng chọn"
              className="block"
              onChange={value => onGeoChange("ward", value, setWardAction)}
            >
              {GeoReducer.wards.map(item => (
                <Select.Option key={item._id} value={item._id}>
                  {item.prefix} {item.name}
                </Select.Option>
              ))}
            </Select>
          </FieldComponent>

          <FieldComponent
            label="Đường phố"
            error={errors["street"]}
            touched={touched["street"]}
          >
            <Select
              value={values.street}
              placeholder="Vui lòng chọn"
              className="block"
              disabled={!values.city}
              onChange={value => onGeoChange("street", value, setStreetAction)}
            >
              {GeoReducer.streets.map(item => (
                <Select.Option key={item._id} value={item._id}>
                  {item.prefix} {item.name}
                </Select.Option>
              ))}
            </Select>
          </FieldComponent>

          <FieldComponent
            label="Số nhà"
            error={errors["address"]}
            touched={touched["address"]}
          >
            <TextBoxComponent
              value={values.address}
              change={({ value }) => setFieldValue("address", value)}
              placeholder="Nhập số nhà"
            />
          </FieldComponent>

          <FieldComponent label="Giá" error={errors["price"]} touched={touched["price"]}>
            <NumericTextBoxComponent
              value={values.price}
              min={0}
              change={({ value }) => setFieldValue("price", value)}
              placeholder="Không nhập nếu thoả thuận"
            />
          </FieldComponent>

          <FieldComponent
            label="Đơn vị tính"
            error={errors["priceModelCode"]}
            touched={touched["priceModelCode"]}
          >
            <ComboBoxComponent
              value={values.priceModelCode}
              fields={{ text: "name", value: "code" }}
              dataSource={PriceModelReducer.data}
              allowFiltering
              ignoreAccent
              filterType="Contains"
              placeholder="Vui lòng chọn"
              change={({ value }) => setFieldValue("priceModelCode", value)}
            />
          </FieldComponent>

          <FieldComponent
            label="Diện tích tính tiền"
            error={errors["priceOnSize"]}
            touched={touched["priceOnSize"]}
          >
            <NumericTextBoxComponent
              value={values.priceOnSize}
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
              value={values.width}
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
              value={values.long}
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
              value={values.behindWidth}
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
              value={values.landSize}
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
              value={values.gfa}
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
              value={values.structure}
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
              value={values.numOfBeds}
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
              value={values.numOfWcs}
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
              value={values.direction}
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
            <TextBoxComponent
              value={values.paperModel}
              change={({ value }) => setFieldValue("paperModel", value)}
            />
          </FieldComponent>
          <FieldComponent
            size={3}
            label="Nhân viên"
            error={errors["username"]}
            touched={touched["username"]}
          >
            <UserSelectionComponent
              groups={["staff"]}
              listUsers={UserReducer.data}
              change={({ value }) => setFieldValue("username", value)}
              value={values.username}
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
              value={values.firstContact}
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
            value={values.secondContact}
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
              value={values.commission}
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
            <Input.TextArea
              value={values.description}
              onChange={({ value }) => setFieldValue("description", value)}
            />
          </FieldComponent>
        </div>
        <div className="divider"></div>
        <div className="form__group">
          <label>Chọn hình ảnh</label>
          <ImageComponent
            change={imageIds => {
              setFieldValue("images", imageIds);
            }}
          />
        </div>
      </div>
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
