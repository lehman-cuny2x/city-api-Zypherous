import axios from "axios";

export default axios.create({
  baseURL: "http://ctp-zip-api.herokuapp.com/zip/",
  responseType: "json"
});