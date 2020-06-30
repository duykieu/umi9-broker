import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import "./LoginPage.scss";
import FieldComponent from "../../components/FieldComponent/FieldComponent";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { authLoginAction } from "../../actions/AuthAction";
import GeoReducer from "../../reducers/GeoReducer";

const LoginPage = ({ AuthReducer, location, history, dispatch }) => {
  const [state, setState] = React.useState({
    credentials: {
      username: "",
      password: "",
    },
    loading: false,
  });

  const loadingOn = () => setState((state) => ({ ...state, loading: true }));
  const loadingOff = () => setState((state) => ({ ...state, loading: false }));

  const onSubmit = (values) => {
    loadingOn();

    setTimeout(() => {
      dispatch(authLoginAction(values)).then((success) => {
        if (success) {
          let redirect = "/";
          if (
            location.state &&
            location.state.from &&
            location.state.from.pathname
          ) {
            redirect = location.state.from.pathname;
          }
          history.push(redirect);
        } else {
          loadingOff();
        }
      });
    }, 300);
  };

  const formik = useFormik({
    initialValues: state.credentials,
    enableReinitialize: true,
    onSubmit,
    validationSchema: yup.object().shape({
      username: yup.string().required("Bạn phải nhập tên đăng nhập hoặc email"),
      password: yup.string().required("Bạn phải nhập mật khẩu"),
    }),
  });

  return (
    <div className="login__page">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1>Đăng nhập</h1>
        <div className="row">
          <FieldComponent
            error={formik.errors["username"]}
            touched={formik.touched["username"]}
            size={1}
            label="Email/Tên đăng nhập"
          >
            <TextBoxComponent
              disabled={state.loading}
              change={({ value }) => formik.setFieldValue("username", value)}
            />
          </FieldComponent>
          <FieldComponent
            size={1}
            error={formik.errors["password"]}
            touched={formik.touched["password"]}
            label="Mật khẩu"
          >
            <TextBoxComponent
              disabled={state.loading}
              type="password"
              change={({ value }) => formik.setFieldValue("password", value)}
            />
          </FieldComponent>
        </div>
        <ButtonComponent
          disabled={state.loading}
          type="submit"
          content={state.loading ? "Đang đăng nhập..." : "Tiếp tục"}
        />
      </form>
    </div>
  );
};

const mapStateToProps = ({ AuthReducer }) => ({ AuthReducer });

export default withRouter(connect(mapStateToProps)(LoginPage));
