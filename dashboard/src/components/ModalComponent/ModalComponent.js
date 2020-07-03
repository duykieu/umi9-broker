import React from "react";

import "./ModalComponent.scss";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { CloseCircleOutlined } from "@ant-design/icons";

const ModalComponent = ({
  visible,
  children,
  header,
  showCloseIcon,
  onClose,
  buttons,
}) => {
  return (
    <div className={`modal__backdrop + ${visible && "visible"}`}>
      <div className="modal__content">
        <div className="modal__header">
          {header && <div className="modal__title">{header}</div>}
          {showCloseIcon && (
            <div className="modal__close__button">
              <CloseCircleOutlined />
            </div>
          )}
        </div>
        <div className="modal__main">{children}</div>
        {buttons && <div className="modal__footer"></div>}
      </div>
    </div>
  );
};

export default ModalComponent;
