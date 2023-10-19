import { message } from "antd";
// import { clearToken } from "/@/utils/local";
// import { useNavigate } from "react-router-dom";
export function checkStatus(status: number, msg = "") {
  // const navigate = useNavigate();
  let errMessage = msg;
  switch (status) {
    case 400:
      errMessage = "Parameter is not correct!";
      break;
    case 401:
      errMessage =
        "You are not logged in, or login has timed out, please log in first!";
      break;
    case 403:
      errMessage = "You do not have permission to operate!";
      break;
    case 404:
      errMessage = `Error requesting address!`;
      break;
    case 408:
      errMessage = "Request timed out!";
      break;
    case 409:
      errMessage = "The same data already exists in the system!";
      break;
    case 500:
      errMessage = "Server internal error!";
      break;
    case 501:
      errMessage = "Service not realized!";
      break;
    case 502:
      errMessage = "Gateway error!";
      break;
    case 503:
      errMessage = "Service unavailable!";
      break;
    case 504:
      errMessage =
        "Service is temporarily unavailable, please try again later!";
      break;
    case 505:
      errMessage = "HTTP version not supported!";
      break;
    default:
      errMessage = "Abnormal problem, please contact the administrator!";
      break;
  }

  if (errMessage) {
    message.error({
      content: errMessage,
    });
    // if (status == 401) {
    //   clearToken();
    //   navigate("/login", { replace: true });
    // }
  }
}
