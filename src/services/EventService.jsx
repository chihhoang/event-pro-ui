import HttpService from "./HttpService";
import { endPoint } from "../config.json";

export function createEvent() {
  const token = localStorage.getItem("idToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.get(endPoint + "/events/list", config);
}

export function getEvents() {
  const token = localStorage.getItem("idToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.get(endPoint + "/events/list", config);
}

export function deleteEvent(id) {
  const token = localStorage.getItem("idToken");

  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.delete(endPoint + "/events/" + id, config);
}

export function getPurchaseHistory() {
  const token = localStorage.getItem("idToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.get(endPoint + "/Order/history", config);
}
