import React from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Query } from "@syncfusion/ej2-data";

import * as mockData from "../../mockData.json";
import UserFormComponent from "../UserFormComponent/UserFormComponent";

const UserSelectionComponent = () => {
  const searchData = mockData["countries"];

  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const template =
    '<div id="nodata"> Không tìm thấy người dùng nào?</div> <button id="btn" class="e-control e-btn">Thêm mới</button>';

  let listObj = React.useRef();

  const fields = { text: "Name", value: "Code" };

  const onFiltering = (e) => {
    let query = new Query();
    // frame the query based on search string with filter type.
    query =
      e.text !== "" ? query.where("Name", "startswith", e.text, true) : query;
    e.updateData(searchData, query);
    if (document.getElementById("nodata")) {
      document.getElementById("btn").onclick = function () {
        setIsOpenForm(true);
        // let newItem = { Name: "Duy", Code: "Duy" };
        // listObj.dataSource.push(newItem);
        // listObj.hidePopup();
        // listObj.addItem(newItem);
        // listObj.value = "Duy";
      };
    }
  };

  const closeForm = () => {
    setIsOpenForm(false);
  };

  const formFail = () => {};

  const formSuccess = () => {};

  return (
    <React.Fragment>
      <ComboBoxComponent
        id="customvalue"
        ref={(ComboBox) => {
          listObj = ComboBox;
        }}
        dataSource={searchData}
        filtering={onFiltering}
        allowFiltering={true}
        fields={fields}
        noRecordsTemplate={template}
        placeholder="Select a country"
        popupHeight="270px"
      />
      <UserFormComponent
        visible={isOpenForm}
        closeForm={closeForm}
        formFail={formFail}
        formSuccess={formSuccess}
      />
    </React.Fragment>
  );
};
export default UserSelectionComponent;
