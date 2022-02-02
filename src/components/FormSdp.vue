<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>SDP Name</div>
      <input type="text" placeholder="Enter SDP Name..." v-model="sdp.sdp_Name" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Type</div>
      <input type="text" placeholder="Enter Type..." v-model="sdp.sdp_Type" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Latitude</div>
      <input
        type="number"
        step="0.000000000000001"
        placeholder="Enter Latitude..."
        v-model="sdp.sdp_Lat"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Longitude</div>
      <input
        type="number"
        step="0.000000000000001"
        placeholder="Enter Longitude..."
        v-model="sdp.sdp_Lng"
      />
    </div>

    <select class="ui search dropdown" v-model="sdp.ofccc">
      <option value="">ofccc Name</option>
      <option v-for="(ofccc, i) in ofcccs" :key="i" v-bind:value="ofccc._id">{{ ofccc.ofccc_Name }}</option>
    </select>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);
import { api } from "../helpers/Helpers";

export default {
  name: "sdp-form",
  props: {
    sdp: {
      type: Object,
      require: false,
      default: () => {
        return {
          sdp_Name: "",
          sdp_Type: "",
          sdp_Lat: "",
          sdp_Lng: "",
          ofccc: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      ofcccs: []
    };
  },
  async mounted() {
    this.ofcccs = await api.getofcccs();
  },
  methods: {
    onSubmit: function () {
      if (
        this.sdp.sdp_Name === "" ||
        this.sdp.sdp_Type === "" ||
        this.sdp.sdp_Lat === "" ||
        this.sdp.sdp_Lng === "" ||
        this.sdp.ofccc === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.sdp);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
