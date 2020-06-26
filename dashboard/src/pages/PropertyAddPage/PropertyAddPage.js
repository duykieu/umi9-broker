import React from "react";
import {
  TextBoxComponent,
  NumericTextBoxComponent,
  UploaderComponent,
} from "@syncfusion/ej2-react-inputs";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import LayoutComponent from "../../components/LayoutComponent/LayoutComponent";
import FieldComponent from "../../components/FieldComponent/FieldComponent";

//css
import "./PropertyAddPage.scss";

const PropertyAddPage = () => {
  const [state, setState] = React.useState({
    asyncSettings: {
      saveUrl: "/",
      removeUrl: "/",
    },
  });

  return (
    <LayoutComponent pageTitle="Thêm mới sản phẩm">
      <div className="page__form">
        <div className="row">
          <FieldComponent label="Danh mục">
            <ComboBoxComponent></ComboBoxComponent>
          </FieldComponent>
          <FieldComponent label="Tỉnh/thành phố">
            <ComboBoxComponent></ComboBoxComponent>
          </FieldComponent>
        </div>

        <div className="row">
          <FieldComponent label="Quận/huyện">
            <ComboBoxComponent></ComboBoxComponent>
          </FieldComponent>

          <FieldComponent label="Phường/xã">
            <ComboBoxComponent></ComboBoxComponent>
          </FieldComponent>

          <FieldComponent label="Đường phố">
            <ComboBoxComponent></ComboBoxComponent>
          </FieldComponent>

          <FieldComponent label="Số nhà">
            <TextBoxComponent />
          </FieldComponent>

          <FieldComponent label="Giá">
            <TextBoxComponent />
          </FieldComponent>

          <FieldComponent label="Đơn vị tính">
            <ComboBoxComponent></ComboBoxComponent>
          </FieldComponent>

          <FieldComponent label="Diện tích tính tiền">
            <TextBoxComponent />
          </FieldComponent>
        </div>
        <div className="divider" />
        <div className="row">
          <FieldComponent size={6} label="Ngang">
            <NumericTextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Dài">
            <NumericTextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Mặt hậu">
            <NumericTextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="DT đất">
            <NumericTextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="DTXD">
            <NumericTextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Kết cấu">
            <TextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Số phòng ngủ">
            <NumericTextBoxComponent />
          </FieldComponent>
          <FieldComponent size={6} label="Số WC">
            <NumericTextBoxComponent />
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
            <TextBoxComponent />
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

export default PropertyAddPage;
