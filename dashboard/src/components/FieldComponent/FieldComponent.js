import React from "react";

const FieldComponent = ({ label, children, size }) => {
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
      cellClass = "col";
      break;
    default:
      cellClass = "col-sm-6 col-md-4 col-lg-3";
  }

  return (
    <div className={cellClass}>
      <div className="form__group">
        <label>{label}</label>
        {children}
      </div>
    </div>
  );
};

export default FieldComponent;
