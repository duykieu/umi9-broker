import React from "react";
import uniqueId from "uniqid";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Query } from "@syncfusion/ej2-data";

import * as mockData from "../../mockData.json";
import UserFormComponent from "../UserFormComponent/UserFormComponent";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const UserSelectionComponent = ({ listUsers, groups, change }) => {
  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const [users, setUsers] = React.useState([]);

  const [value, setValue] = React.useState(null);

  const [text, setText] = React.useState(null);

  React.useEffect(() => {
    if (listUsers instanceof Array) {
      setUsers(
        listUsers
          .filter(user => {
            if (!groups) return true;
            return groups.includes(user.userGroup);
          })
          .map(item => {
            const text = `${item.userGroup.toUpperCase()} | ${
              item.fullName || item.displayName || "Chưa rõ"
            } | ${item.phoneNumber}`;
            return {
              text,
              value: item.username,
            };
          })
      );
    }
  }, [listUsers]);

  const onSuccess = ({ username, userGroup, fullName, displayName, phoneNumber }) => {
    setValue(username);
    setText(
      `${userGroup.toUpperCase()} | ${
        fullName || displayName || "Chưa rõ"
      } |${phoneNumber}`
    );
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

  return (
    <React.Fragment>
      <ComboBoxComponent
        dataSource={users}
        allowFiltering={true}
        fields={{ text: "text", value: "value" }}
        noRecordsTemplate={noRecordsTemplate}
        placeholder="Select"
        filterType="Contains"
        ignoreAccent
        change={change}
        text={text}
        value={value}
      />
      <UserFormComponent
        visible={isOpenForm}
        closeForm={closeForm}
        formFail={formFail}
        onSuccess={onSuccess}
        groups={groups}
      />
    </React.Fragment>
  );
};
export default UserSelectionComponent;
