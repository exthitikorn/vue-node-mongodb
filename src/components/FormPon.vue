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
    <!-- Model-List-Select -->
    <model-list-select
      :list="olts"
      v-model="pon.olt"
      option-value="_id"
      option-text="olt_Name"
      placeholder="Select OLT name"
    >
    </model-list-select>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ModelListSelect } from "vue-search-select";

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
      olts: [],
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
  components: {
    ModelListSelect,
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>