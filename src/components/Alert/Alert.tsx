import React from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const alertMessage = (message: string, alertShowFunction: Function) => {
  alertShowFunction(true);
  alertify.success(message);
  setTimeout(() => {
    alertShowFunction(false);
  }, 5300);
};

export default alertMessage;
