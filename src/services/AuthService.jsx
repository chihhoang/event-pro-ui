import HttpService from "./HttpService";
import { endPoint } from "../config.json";

export function authenticate(username, password) {
  console.log("authenticate ", username);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    username: username,
    password: password
  };

  return HttpService.post(endPoint + "/api/authenticate", body, config);
}

export function me(token) {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.get(endPoint + "/users/me", config);
}

export function env() {
  const config = {
    headers: {}
  };

  return HttpService.get(endPoint + "/env", config);
}
