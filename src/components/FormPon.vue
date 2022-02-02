<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>PON Name</div>
      <input
        type="text"
        placeholder="Enter PON Name..."
        v-model="pon.pon_Name"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Rack</div>
      <input type="text" placeholder="Enter Rack..." v-model="pon.pon_Rack" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Shelf</div>
      <input type="text" placeholder="Enter Shelf..." v-model="pon.pon_Shelf" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Slot</div>
      <input type="text" placeholder="Enter Slot..." v-model="pon.pon_Slot" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Port</div>
      <input type="text" placeholder="Enter Port..." v-model="pon.pon_Port" />
    </div>
    <!-- Semantic 01 -->
    <!-- <div class="ui fluid search selection dropdown">
      <i class="dropdown icon"></i>
      <div class="menu" v-for="(olt, i) in olts" :key="i">
        <div class="item" :data-value="olt._id">{{olt.olt_Name}}</div>
      </div>
    </div> -->

    <!-- V-SELECT -->
    <!-- <v-select :options="olts" label="olt_Name" v-model="pon.olt" ></v-select> -->

    <!-- Vue -->
    <select class="ui search dropdown" v-model="pon.olt">
      <option value="">OLT Name</option>
      <option v-for="(olt, i) in olts" :key="i" v-bind:value="olt._id">{{ olt.olt_Name }}</option>
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
  name: "pon-form",
  props: {
    pon: {
      type: Object,
      require: false,
      default: () => {
        return {
          pon_Name: "",
          pon_Rack: "",
          pon_Shelf: "",
          pon_Slot: "",
          pon_Port: "",
          olt: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      olts: []
    };
  },
  async mounted() {
    this.olts = await api.getolts();
  },
  methods: {
    onSubmit: function () {
      if (
        this.pon.pon_Name === "" ||
        this.pon.pon_Rack === "" ||
        this.pon.pon_Shelf === "" ||
        this.pon.pon_Slot === "" ||
        this.pon.pon_Port === "" ||
        this.pon.olt === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.pon);
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