<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>ofccc Name</div>
      <input
        type="text"
        placeholder="Enter ofccc Name..."
        v-model="ofccc.ofccc_Name"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Type</div>
      <input
        type="text"
        placeholder="Enter Type..."
        v-model="ofccc.ofccc_Type"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Latitude</div>
      <input
        type="number"
        step="0.000000000000001"
        placeholder="Enter Latitude..."
        v-model="ofccc.ofccc_Lat"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Longitude</div>
      <input
        type="number"
        step="0.000000000000001"
        placeholder="Enter Longitude..."
        v-model="ofccc.ofccc_Lng"
      />
    </div>

    <!-- vue dropdown pon -->
    <select class="ui search dropdown" v-model="ofccc.pon">
      <option value="" disabled selected hidden>Please PON Name</option>
      <option v-for="(pon, i) in pons" :key="i" v-bind:value="pon._id">{{ pon.pon_Name }}</option>
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
  name: "ofccc-form",
  props: {
    ofccc: {
      type: Object,
      require: false,
      default: () => {
        return {
          ofccc_Name: "",
          ofccc_Type: "",
          ofccc_Lat: "",
          ofccc_Lng: "",
          pon: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      pons:[]
    };
  },
  async mounted() {
    this.pons = await api.getpons();
  },
  methods: {
    onSubmit: function () {
      if (
        this.ofccc.ofccc_Name === "" ||
        this.ofccc.ofccc_Type === "" ||
        this.ofccc.ofccc_Lat === "" ||
        this.ofccc.ofccc_Lng === "" ||
        this.ofccc.pon === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.ofccc);
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