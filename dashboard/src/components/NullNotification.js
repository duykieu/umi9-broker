import React from "react";
import { connect } from "react-redux";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { clearNotificationAction } from "../actions/NotificationAction";

const NullNotificationComponent = ({ dispatch, NotificationReducer }) => {
  let Toast = React.createRef();
  React.useEffect(() => {
    if (NotificationReducer.type) {
      Toast.show();
    }
  }, [NotificationReducer]);

  return (
    <ToastComponent
      ref={(ref) => (Toast = ref)}
      timeOut={5000}
      position={{ X: "Right", Y: "Top" }}
      content={NotificationReducer.message}
      title={NotificationReducer.title}
      close={() => dispatch(clearNotificationAction())}
    />
  );
};

export default connect(({ NotificationReducer }) => ({ NotificationReducer }))(
  NullNotificationComponent
);
