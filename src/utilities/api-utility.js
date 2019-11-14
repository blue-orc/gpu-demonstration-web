import axios from "axios";
import Store from "../store/index";

import { Notify } from "quasar";
// Request has controller, action, queryParameters, body

export default {
  async del(request) {
    await addAuthorization();
    var uri = buildUri(request);
    try {
      var response = await axios.delete(uri);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async get(request) {
    await addAuthorization();
    var uri = buildUri(request);
    try {
      var response = await axios.get(uri);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async getNoAuth(request) {
    var uri = buildUri(request);
    try {
      var response = await axios.get(uri);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async getFile(request) {
    await addAuthorization();
    var uri = buildUri(request);
    var config = { responseType: "blob" };
    try {
      var response = await axios.get(uri, config);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", request.queryParameters[0].value); //or any other extension
      document.body.appendChild(link);
      link.click();
      return;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async post(request, body) {
    await addAuthorization();
    console.log("request body", body);
    var uri = buildUri(request);
    if (request.accept) {
      var config = {
        headers: {
          accept: request.accept
        }
      };
    }
    try {
      var response = await axios.post(uri, body, config);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async postNoAuth(request, body) {
    console.log("request body", body);
    var uri = buildUri(request);
    if (request.accept) {
      var config = {
        headers: {
          accept: request.accept
        }
      };
    }
    try {
      var response = await axios.post(uri, body, config);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async postForm(request, formObject) {
    await addAuthorization();
    var entries = Object.entries(formObject);
    var bodyFormData = new FormData();
    for (var entry of entries) {
      bodyFormData.set(entry[0], entry[1]);
    }
    var uri = buildUri(request);
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    try {
      var response = await axios.post(uri, bodyFormData, config);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async postFormNoAuth(request, formObject) {
    var entries = Object.entries(formObject);
    var params = new URLSearchParams();
    for (var entry of entries) {
      params.append(entry[0], entry[1]);
    }
    console.log("request body", params);
    var uri = buildUri(request);
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    try {
      var response = await axios.post(uri, params, config);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async postImage(request, body) {
    await addAuthorization();
    var config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    var uri = buildUri(request);
    try {
      var response = await axios.post(uri, body, config);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  },
  async put(request, body) {
    await addAuthorization();
    var uri = buildUri(request);
    try {
      console.log("request body", body);
      var response = await axios.put(uri, body);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error.response);
      Notify.create(error.response.status + ": " + error.response.data);
      return error.response;
    }
  }
};

function buildUri(request) {
  var uri = process.env.VUE_APP_API_URI;
  uri = uri + "/" + request.controller;
  if (request.action !== undefined) {
    uri = uri + "/" + request.action;
  }
  if (request.queryParameters !== undefined) {
    uri = uri + "?";
    var entries = Object.entries(request.queryParameters);
    for (var i = 0; i < entries.length; i++) {
      if (i == entries.length - 1) {
        uri = uri + entries[i][0] + "=" + entries[i][1];
      } else {
        uri = uri + entries[i][0] + "=" + entries[i][1] + "&";
      }
    }
  }
  console.log(uri);
  return uri;
}

async function addAuthorization() {
  var milliseconds = new Date().getTime() / 1000;
  var exp = Store.state.authentication.tokens.expiration - 1000;
  console.log(exp);
  if (milliseconds >= exp) {
    await Store.dispatch("authentication/refresh");
  }
  var at = Store.state.authentication.tokens.authToken;
  axios.defaults.headers.common.Authorization = "Bearer " + at;
}
