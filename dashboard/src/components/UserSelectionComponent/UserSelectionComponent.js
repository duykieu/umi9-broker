import React from "react";
import uniqueId from "uniqid";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Query } from "@syncfusion/ej2-data";

import * as mockData from "../../mockData.json";
import UserFormComponent from "../UserFormComponent/UserFormComponent";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const UserSelectionComponent = ({ listUsers, groups, onChange }) => {
  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const [users, setUsers] = React.useState([]);

  const [noData] = React.useState({
    button: uniqueId(),
    wrapper: uniqueId(),
  });

  React.useEffect(() => {
    if (listUsers instanceof Array) {
      setUsers(
        listUsers
          .filter((user) => user.userGroup)
          .map((item) => {
            const text = `${item.fullName || item.displayName} | ${
              item.phoneNumber
            }`;
            return {
              text,
              value: item.username,
            };
          })
      );
    }
  }, [listUsers]);

  const template = `<div id="${noData.wrapper}"> 
    Không tìm thấy người dùng nào? <div></div> <button id="${noData.button}" class="e-control e-btn">Thêm mới</button></div> 
    `;

  let listObj = React.useRef();

  const onFiltering = (e) => {
    let query = new Query();
    // frame the query based on search string with filter type.
    query = e.text !== (users, query);
    if (document.getElementById(noData.wrapper)) {
      document.getElementById(noData.button).onclick = function () {
        console.log({ noDataButton: noData.button });
        setIsOpenForm(true);
        // let newItem = { Name: "Duy", Code: "Duy" };
        // listObj.dataSource.push(newItem);
        // listObj.hidePopup();
        // listObj.addItem(newItem);
        // listObj.value = "Duy";
      };
    }
  };

  const noRecordsTemplate = () => (
    <div>
      <p>Không tìm thấy người dùng nào!</p>
      <ButtonComponent onClick={() => setIsOpenForm(true)} content="Thêm mới" />
    </div>
  );

  const closeForm = () => {
    setIsOpenForm(false);
  };

  const formFail = () => {};

  const formSuccess = () => {};

  return (
    <React.Fragment>
      <ComboBoxComponent
        id="customvalue"
        ref={(c) => (listObj = c)}
        dataSource={users}
        filtering={onFiltering}
        allowFiltering={true}
        fields={{ text: "text", value: "value" }}
        noRecordsTemplate={noRecordsTemplate}
        placeholder="Select"
        popupHeight="270px"
        filterType="Contains"
        ignoreAccent
        change={onChange}
      />
      <UserFormComponent
        visible={isOpenForm}
        closeForm={closeForm}
        formFail={formFail}
        formSuccess={formSuccess}
        groups={groups}
      />
    </React.Fragment>
  );
};
export default UserSelectionComponent;
