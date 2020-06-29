import * as yup from "yup";
import RegexLib from "../../libs/regex";

class UserValidationSchema {
  constructor() {}

  generate = () => {
    return yup.object().shape({
      fullName: yup
        .string()
        .min(5, "Họ tên quá ngắn")
        .max(32, "Họ tên quá dài"),
      displayName: yup
        .string()
        .min(5, "Tên hiển thị quá ngắn")
        .max(32, "Tên hiển thị quá dài"),
      username: yup
        .string()
        .required("Bạn phải nhập tên truy cập")
        .min(5, "Tên truy cập quá ngắn")
        .max(32, "Tên truy cập quá dài"),
      email: yup
        .string()
        .required("Hãy nhập địa chỉ email")
        .email("Địa chỉ email không đúng định dạng")
        .required("Bạn chưa nhập địa chỉ email"),
      phoneNumber: yup
        .string()
        .required("Bạn phải nhập số điện thoại")
        .matches(RegexLib.phoneNumber, "Số điện thoại không đúng định dạng"),
      subPhoneNumber: yup
        .string()
        .matches(RegexLib.phoneNumber, "Số điện thoại không đúng định dạng")
        .nullable(),
      password: yup
        .string()
        .min(6, "Mật khẩu ngắn hơn 6 ký tự")
        .max(255, "Mật khẩu vượt quá 255 ký tự"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      address: yup
        .string()
        .min(10, "Địa chỉ phải dài hơn 10 ký tự")
        .max(255, "Địa chỉ phải ít hơn 255 ký tự")
        .nullable(),
      idNumber: yup.number().min(99999999).max(999999999999999).nullable(),
      idIssueDate: yup.date().nullable(),
      idIssuePlace: yup
        .string()
        .min(10, "Nơi cấp phải dài hơn 10 ký tự")
        .max(255, "Nơi cấp phải ít hơn 255 ký tự")
        .nullable(),
    });
  };
}

export default UserValidationSchema;
