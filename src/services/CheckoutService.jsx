import HttpService from "./HttpService";
import { endPoint } from "../config.json";

export function checkout(checkoutData) {
  console.log("checkoutData Data :  ", checkoutData);

  const token = localStorage.getItem("idToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };


  return HttpService.post(endPoint + "/checkout", checkoutData, config);
}
