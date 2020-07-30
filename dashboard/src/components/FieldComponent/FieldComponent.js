import React from "react";
import "./FieldComponent.scss";

const FieldComponent = ({ label, children, size, isRequired, error, touched }) => {
  let cellClass;

  switch (size) {
    case 6:
      cellClass = "col-sm-4 col-md-3 col-lg-2";
      break;
    case 3:
      cellClass = "col-sm-4";
      break;
    case 2:
      cellClass = "col-sm-6";
      break;
    case 1:
      cellClass = "col-12";
      break;
    default:
      cellClass = "col-sm-6 col-md-4 col-lg-3";
  }

  return (
    <div className={cellClass}>
      <div className="form-group">
        <label>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        {children}
        {error && touched && <div className="form__error">{error}</div>}
      </div>
    </div>
  );
};

export default FieldComponent;
