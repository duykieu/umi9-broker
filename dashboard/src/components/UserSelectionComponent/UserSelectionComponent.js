import React from "react";
import uniqueId from "uniqid";
import { connect } from "react-redux";
import {
  ComboBoxComponent,
  AutoCompleteComponent,
} from "@syncfusion/ej2-react-dropdowns";
import {
  Query,
  DataManager,
  WebApiAdaptor,
  WebMethodAdaptor,
  UrlAdaptor,
} from "@syncfusion/ej2-data";

import * as mockData from "../../mockData.json";
import UserFormComponent from "../UserFormComponent/UserFormComponent";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import UserService from "../../services/UserService";
import { dataSourceChanged } from "@syncfusion/ej2-react-grids";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import "./UserSelectionComponent.scss";
import { CloseOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import { setErrorNotification } from "../../actions/NotificationAction";

const UserSelectionComponent = ({ listUsers, groups, change, inputValue, dispatch }) => {
  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const [users, setUsers] = React.useState([]);

  const [value, setValue] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  let dom = React.useRef();

  // const [text, setText] = React.useState(null);

  React.useEffect(() => {
    if (!value || value.length < 3) {
      return;
    }
    setLoading(true);
    UserService.get({ type: "internal", search: value })
      .then(({ data }) => {
        if (data.success) {
          return setUsers(
            data.entries.users
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
        return false;
      })
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        dispatch(setErrorNotification(error));
      });
  }, [value]);

  React.useEffect(() => {
    if (value && value.length >= 3) {
      setOpen(true);
    }

    if (value.indexOf("|") > -1) {
      setOpen(false);
    }
  }, [value]);

  // const onSuccess = ({ username, userGroup, fullName, displayName, phoneNumber }) => {
  //   setValue(username);
  //   setText(
  //     `${userGroup.toUpperCase()} | ${
  //       fullName || displayName || "Chưa rõ"
  //     } |${phoneNumber}`
  //   );
  // };

  // const noRecordsTemplate = () => (
  //   <div>
  //     <p>Không tìm thấy người dùng nào!</p>
  //     <ButtonComponent onClick={() => setIsOpenForm(true)} content="Thêm mới" />
  //   </div>
  // );

  // const closeForm = () => {
  //   setIsOpenForm(false);
  // };

  // const formFail = () => {};

  const handleClickOutside = ({ target }) => {
    if (dom && !dom.current.contains(target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onFocus = ({ target }) => {
    if (target.value && target.value.length >= 3 && target.value.indexOf("|") === -1) {
      setOpen(true);
    }
  };

  const onValueChange = e => {
    setValue(e.target.value);
  };

  const data = new DataManager({
    url: process.env.REACT_APP_MAIN_API + "/user/autoComplete",
    adaptor: new WebMethodAdaptor(),
  });

  const foundUser = users.find(user => user.value === inputValue);

  return (
    <div ref={dom} className="auto__complete">
      <input
        value={value}
        // onBlur={() => setOpen(false)}
        onChange={onValueChange}
        onFocus={onFocus}
        className="e-control e-textbox e-lib e-input"
        onKeyUp={onValueChange}
        placeholder="Nhập số điện thoại"
      />
      <div
        onClick={() => {
          setValue("");
          change({ value: "" });
        }}
        className={`auto__complete--icon ${value && "visible"}`}
      >
        {loading ? <Loading3QuartersOutlined /> : <CloseOutlined />}
      </div>
      <ul className={`auto__complete--dropdown ${open && "visible"}`}>
        {!users.length && (
          <li className="auto__complete--no__content">
            <span className="auto__complete--no__content--content">
              Không tìm thấy đối tượng{" "}
            </span>
            <span>
              <ButtonComponent content="Thêm mới" />
            </span>
          </li>
        )}
        {users.map((user, index) => {
          return (
            <li
              onClick={() => {
                change({ value: user.value });
                setValue(user.text);
                setOpen(false);
              }}
              key={index}
            >
              {user.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default connect()(UserSelectionComponent);
