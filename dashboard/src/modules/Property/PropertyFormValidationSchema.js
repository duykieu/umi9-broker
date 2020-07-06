import * as yup from "yup";

const PropertyFormValidationSchema = yup.object().shape({
  categorySlug: yup.string("Chưa chọn danh mục").required("Chưa chọn danh mục"),
  state: yup.string("Chưa chọn tỉnh/thành ?").required("Chưa chọn tỉnh thành"),
  city: yup.string("Chưa chọn Quận/huyện ?").required("Chưa chọn Quận/huyện"),
  ward: yup.string("Chưa chọn Phường/xã ?").required("Chưa chọn Phường/xã"),
  street: yup.string("Chưa chọn đường/phố ?").required("Chưa chọn đường/phố"),
  address: yup.string("Address").nullable(),
  price: yup.number().min(0).nullable(),
  priceModelCode: yup.string("Chưa chọn đơn vị tính").required(),
  priceOnSize: yup.number().min(0).nullable(),
  width: yup.number().min(0).nullable(),
  long: yup.number().min(0).nullable(),
  behindWidth: yup.number().min(0).nullable(),
  landSize: yup.number().min(0).nullable(),
  gfa: yup.number().min(0).nullable(),
  structure: yup.string("Thiếu thông tin kết cấu").required("Thiếu thông tin kết cấu"),
  numOfBeds: yup.number().min(0).nullable(),
  numOfWcs: yup.number().min(0).nullable(),
  direction: yup.string("Hướng không đúng").nullable(),
  paperModel: yup.string("Pháp lý không đúng").nullable(),
  username: yup.string("Thiếu thông tin nhân viên").required("Thiếu thông tin nhân viên"),
  firstContactUsername: yup.string("Thiếu thông tin liên hệ").nullable(),
  secondContactUsername: yup.string("Thiếu thông tin liên hệ").nullable(),
  commission: yup.string("Thiếu thông tin hoa hồng").required("Thiếu thông tin hoa hồng"),
  description: yup.string("Mô tả không đúng định dạng").nullable(),
});

export default PropertyFormValidationSchema;
