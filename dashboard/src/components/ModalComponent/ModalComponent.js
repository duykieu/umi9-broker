import React from "react";

import "./ModalComponent.scss";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ModalComponent = ({ visible, children, header, showCloseIcon, close, buttons }) => {
  return (
    <div className={`modal__backdrop  ${visible && "visible"}`}>
      <div className="modal__content">
        <div className="modal__header">
          {header && <div className="modal__title">{header}</div>}
          {showCloseIcon && (
            <div className="modal__close__button" onClick={close}>
              <CloseOutlined />
            </div>
          )}
        </div>
        <div className="modal__main">{children}</div>
        {buttons && (
          <div className="modal__footer">
            {buttons.map(({ buttonModel, click }, index) => (
              <ButtonComponent
                cssClass="modal__footer__button"
                key={index}
                content={buttonModel.content}
                isPrimary={buttonModel.isPrimary}
                onClick={click}
                type={buttonModel.type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
