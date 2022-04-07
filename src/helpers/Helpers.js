import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});
const vm = new Vue();
const baseURL = "https://fca1-182-52-58-27.ngrok.io/";        //http://localhost:3000/  ***** URL API *****
// const oltURL = "https://a8c9-182-52-58-27.ngrok.io/olts/";
// const ponURL = "https://a8c9-182-52-58-27.ngrok.io/pons/"
// const ofcccURL = "https://a8c9-182-52-58-27.ngrok.io/ofcccs/";
// const sdpURL = "https://a8c9-182-52-58-27.ngrok.io/sdps/";
// const userURL = "https://a8c9-182-52-58-27.ngrok.io/users/";
// const customerURL = 'https://a8c9-182-52-58-27.ngrok.io/customers/'

const handleError = (fn) => (...params) =>
  fn(...params).catch((error) => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, "error");
  });
export const api = {
  //OLT api
  getolt: handleError(async (id) => {
    const res = await axios.get(baseURL + 'olts/' + id);
    return res.data;
  }),
  getponsInolt: handleError(async (id) => {
    const res = await axios.get(baseURL + 'olts/pons/' + id);
    return res.data;
  }),
  getolts: handleError(async () => {
    const res = await axios.get(baseURL + 'olts/');
    return res.data;
  }),
  deleteolt: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'olts/' + id);
    return res.data;
  }),
  createolt: handleError(async (payload) => {
    const res = await axios.post(baseURL + 'olts/', payload);
    return res.data;
  }),
  updateolt: handleError(async (payload) => {
    const res = await axios.put(baseURL+ 'olts/' + payload._id, payload);
    return res.data;
  }),

  //PON api
  getofcccInpon: handleError(async (id) => {
    const res = await axios.get(baseURL + 'pons/' + 'ofcccs/' + id);
    return res.data;
  }),
  getpon: handleError(async (id) => {
    const res = await axios.get(baseURL + 'pons/' + id);
    return res.data;
  }),
  getpons: handleError(async () => {
    const res = await axios.get(baseURL + 'pons/');
    return res.data;
  }),
  deletepon: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'pons/' + id);
    return res.data;
  }),
  createpon: handleError(async (payload) => {
    const res = await axios.post(baseURL + 'pons/', payload);
    return res.data;
  }),
  updatepon: handleError(async (payload) => {
    const res = await axios.put(baseURL + 'pons/' + payload._id, payload);
    return res.data;
  }),

  //ofccc api
  getsdpInofccc: handleError(async (id) => {
    const res = await axios.get(baseURL + 'ofcccs/' + 'sdps/' + id);
    return res.data;
  }),
  getofccc: handleError(async (id) => {
    const res = await axios.get(baseURL + 'ofcccs/' + id);
    return res.data;
  }),
  getofcccs: handleError(async () => {
    const res = await axios.get(baseURL + 'ofcccs/');
    return res.data;
  }),
  deleteofccc: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'ofcccs/' + id);
    return res.data;
  }),
  createofccc: handleError(async (payload) => {
    const res = await axios.post(baseURL + 'ofcccs/', payload);
    return res.data;
  }),
  updateofccc: handleError(async (payload) => {
    const res = await axios.put(baseURL + 'ofcccs/' + payload._id, payload);
    return res.data;
  }),

  //SDP api
  distance: handleError(async (lng , lat) => {
    const res = await axios.get(baseURL + 'distance/' + lng + '/' + lat);
    return res.data;
  }),
  getcusInsdp: handleError(async (id) => {
    const res = await axios.get(baseURL + 'sdps/' + 'customers/' + id);
    return res.data;
  }),
  getsdp: handleError(async (id) => {
    const res = await axios.get(baseURL + 'sdps/' + id);
    return res.data;
  }),
  getsdps: handleError(async () => {
    const res = await axios.get(baseURL + 'sdps/');
    return res.data;
  }),
  deletesdp: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'sdps/' + id);
    return res.data;
  }),
  createsdp: handleError(async (payload) => {
    const res = await axios.post(baseURL + 'sdps/', payload);
    return res.data;
  }),
  updatesdp: handleError(async (payload) => {
    const res = await axios.put(baseURL + 'sdps/' + payload._id, payload);
    return res.data;
  }),
  //Customer api
  getcuss: handleError(async () => {
    const res = await axios.get(baseURL + 'customers/');
    return res.data;
  }),
  getcus: handleError(async (id) => {
    const res = await axios.get(baseURL + 'customers/' + id);
    return res.data;
  }),
  deletecus: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'customers/' + id);
    return res.data;
  }),
  createcus: handleError(async (payload) => {
    const res = await axios.post(baseURL + 'customers/', payload);
    return res.data;
  }),
  updatecus: handleError(async (payload) => {
    const res = await axios.put(baseURL + 'customers/' + payload._id, payload);
    return res.data;
  }),
  //User api
  getusers: handleError(async () => {
    const res = await axios.get(baseURL + 'users/');
    return res.data;
  }),
  getuser: handleError(async (id) => {
    const res = await axios.get(baseURL + 'users/' + id);
    return res.data;
  }),
  deleteuser: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'users/' + id);
    return res.data;
  }),
  createuser: handleError(async (payload) => {
    const res = await axios.post(baseURL + 'users/', payload);
    return res.data;
  }),
  updateuser: handleError(async (payload) => {
    const res = await axios.put(baseURL + 'users/' + payload._id, payload);
    return res.data;
  }),
};
