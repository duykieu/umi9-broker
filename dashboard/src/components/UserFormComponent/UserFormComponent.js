import React from "react";
import { useFormik, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import FieldComponent from "../FieldComponent/FieldComponent";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  ButtonComponent,
  SwitchComponent,
} from "@syncfusion/ej2-react-buttons";

import "./UserFormStyle.scss";
import UserValidationSchema from "./UserValidationSchema";
import { updateUserAction, storeUserAction } from "../../actions/UserAction";

const UserFormComponent = ({
  model,
  fullProfile,
  visible,
  closeForm,
  title,
  dispatch,
  userData,
}) => {
  const [state, setState] = React.useState({
    showLoading: false,
    editPassword: false,
    profileInfo: false,
  });

  React.useEffect(() => {
    if (!userData._id) {
      return setState((state) => ({
        ...state,
        editPassword: true,
        profileInfo: false,
      }));
    } else {
      return setState((state) => ({
        ...state,
        editPassword: false,
        profileInfo: true,
      }));
    }
  }, [userData]);

  const loadingOn = () =>
    setState((state) => ({ ...state, showLoading: true }));
  const loadingOff = () =>
    setState((state) => ({ ...state, showLoading: false }));

  const onFormSubmit = (values) => {
    loadingOn();
    const promise = values._id
      ? dispatch(updateUserAction(values))
      : dispatch(storeUserAction(values));
    promise
      .then(({ success }) => {
        if (success) closeForm();
        return;
      })
      .then(() => {
        loadingOff();
      });
  };

  const formik = useFormik({
    initialValues: {
      ...userData,
      password: undefined,
      passwordConfirm: undefined,
    },
    validationSchema: new UserValidationSchema().generate(),
    enableReinitialize: true,
    onSubmit: onFormSubmit,
  });

  return (
    <DialogComponent
      allowDragging
      isModal
      width="600px"
      visible={visible}
      close={closeForm}
      header={title || "Thêm liên hệ mới"}
    >
      <form onSubmit={formik.handleSubmit} className="form__content">
        <div className="row">
          <FieldComponent
            error={formik.errors["fullName"]}
            touched={formik.touched["fullName"]}
            label="Họ và tên"
            size={2}
          >
            <TextBoxComponent
              name="fullName"
              change={({ value }) => formik.setFieldValue("fullName", value)}
              placeholder="Nhập họ tên"
              value={formik.values.fullName}
              disabled={state.showLoading}
            />
          </FieldComponent>
          <FieldComponent
            error={formik.errors["displayName"]}
            touched={formik.touched["displayName"]}
            label="Tên hiển thị"
            size={2}
          >
            <TextBoxComponent
              name="displayName"
              value={formik.values.displayName}
              change={({ value }) => formik.setFieldValue("displayName", value)}
              placeholder="Tên hiển thị"
              disabled={state.showLoading}
            />
          </FieldComponent>

          <FieldComponent
            error={formik.errors["username"]}
            isRequired
            label="Tên đăng nhập"
            touched={formik.touched["username"]}
            size={2}
          >
            <TextBoxComponent
              name="username"
              value={formik.values.username}
              change={({ value }) => formik.setFieldValue("username", value)}
              placeholder="Nhập ký tự không dấu liền nhau"
              disabled={state.showLoading}
            />
          </FieldComponent>

          <FieldComponent
            error={formik.errors["email"]}
            touched={formik.touched["email"]}
            isRequired
            label="Email"
            size={2}
          >
            <TextBoxComponent
              name="email"
              value={formik.values.email}
              change={({ value }) => formik.setFieldValue("email", value)}
              placeholder="Email là duy nhất trên hệ thống"
              disabled={state.showLoading}
            />
          </FieldComponent>

          {state.editPassword && (
            <React.Fragment>
              <FieldComponent
                error={formik.errors["password"]}
                touched={formik.touched["password"]}
                label="Mật khẩu"
                size={2}
              >
                <TextBoxComponent
                  name="passwordConfirm"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  change={({ value }) =>
                    formik.setFieldValue("password", value)
                  }
                  disabled={state.showLoading}
                />
              </FieldComponent>
              <FieldComponent
                error={formik.errors["passwordConfirm"]}
                label="Nhập lại mật khẩu"
                touched={formik.touched["passwordConfirm"]}
                size={2}
              >
                <TextBoxComponent
                  name="passwordConfirm"
                  placeholder="Nhập lại mật khẩu"
                  change={({ value }) =>
                    formik.setFieldValue("passwordConfirm", value)
                  }
                  type="password"
                  disabled={state.showLoading}
                />
              </FieldComponent>
            </React.Fragment>
          )}

          <FieldComponent
            error={formik.errors["phoneNumber"]}
            touched={formik.touched["phoneNumber"]}
            label="Số chính"
            isRequired
            size={2}
          >
            <TextBoxComponent
              name="phoneNumber"
              value={formik.values.phoneNumber}
              placeholder="Bắt buộc"
              change={({ value }) => formik.setFieldValue("phoneNumber", value)}
              disabled={state.showLoading}
            />
          </FieldComponent>

          <FieldComponent
            error={formik.errors["subPhoneNumber"]}
            touched={formik.touched["subPhoneNumber"]}
            label="Số phụ"
            size={2}
          >
            <TextBoxComponent
              placeholder="Không bắt buộc"
              change={({ value }) =>
                formik.setFieldValue("subPhoneNumber", value)
              }
              name="subPhoneNumber"
              value={formik.values.subPhoneNumber}
              disabled={state.showLoading}
            />
          </FieldComponent>
          {state.profileInfo && (
            <React.Fragment>
              <FieldComponent
                error={formik.errors["idNumber"]}
                touched={formik.touched["idNumber"]}
                label="CMND số"
                size={3}
              >
                <TextBoxComponent
                  name="idNumber"
                  placeholder="Ex: 285188288"
                  value={formik.values.idNumber}
                  change={({ value }) =>
                    formik.setFieldValue("idNumber", value)
                  }
                  disabled={state.showLoading}
                />
              </FieldComponent>
              <FieldComponent
                error={formik.errors["idIssueDate"]}
                touched={formik.touched["idIssueDate"]}
                label="Cấp ngày"
                size={3}
              >
                <DatePickerComponent
                  name="idIssueDate"
                  placeholder=""
                  value={formik.values.idIssueDate}
                  change={({ value }) =>
                    formik.setFieldValue("idIssueDate", value)
                  }
                  max={new Date()}
                  disabled={state.showLoading}
                />
              </FieldComponent>
              <FieldComponent
                error={formik.errors["idIssuePlace"]}
                label="Nơi cấp"
                touched={formik.touched["idIssuePlace"]}
                size={3}
              >
                <TextBoxComponent
                  name="idIssuePlace"
                  placeholder=""
                  value={formik.values.idIssuePlace}
                  change={({ value }) =>
                    formik.setFieldValue("idIssuePlace", value)
                  }
                  disabled={state.showLoading}
                />
              </FieldComponent>
              <FieldComponent
                error={formik.errors["address"]}
                touched={formik.touched["address"]}
                label="Địa chỉ"
                size={1}
              >
                <TextBoxComponent
                  name="address"
                  placeholder="Nhập địa chỉ"
                  change={({ value }) => formik.setFieldValue("address", value)}
                  value={formik.values.address}
                  disabled={state.showLoading}
                />
              </FieldComponent>
            </React.Fragment>
          )}
        </div>

        {formik.values._id && (
          <div className="form__group">
            <div className="switch__container">
              <SwitchComponent
                change={() =>
                  setState({ ...state, editPassword: !state.editPassword })
                }
                checked={state.editPassword}
              />
              <label className="switch__label">Sửa mật khẩu</label>
            </div>
          </div>
        )}

        <ButtonComponent
          type="submit"
          style={{ marginRight: "1rem" }}
          isPrimary
          content="Lưu lại"
        />
        <ButtonComponent onClick={closeForm} type="button" content="Huỷ bỏ" />
      </form>
    </DialogComponent>
  );
};
export default UserFormComponent;
