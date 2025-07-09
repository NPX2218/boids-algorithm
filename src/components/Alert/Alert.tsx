/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

/////////////////////////////////////
// FUNCTION: ALERT MESSAGE
/////////////////////////////////////

export const alertMessage = (message: string, alertShowFunction: Function) => {
  alertShowFunction(true);
  alertify.success(message);

  setTimeout(() => {
    alertShowFunction(false);
  }, 5300);
};
