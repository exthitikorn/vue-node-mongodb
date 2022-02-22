<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Fullname</div>
      <input
        type="text"
        placeholder="Enter Fullname..."
        v-model="cus.fullname"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Tel.</div>
      <input type="text" oninput="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Enter Telephone number..." v-model="cus.tel" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>SDP name</div>
      <!-- Model-List-Select -->
      <model-list-select
        :list="sdps"
        v-model="cus.sdp"
        option-value="_id"
        option-text="sdp_Name"
        placeholder="Select SDP name"
      >
      </model-list-select>
    </div>
    <table>
      <td><button class="positive ui button">Submit</button></td>
      <td><a onclick="history.back()" class="negative ui button">Back</a></td>
    </table>
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
  name: "cus-form",
  props: {
    cus: {
      type: Object,
      require: false,
      default: () => {
        return {
          fullname: "",
          tel: "",
          sdp: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      sdps: [],
    };
  },
  async mounted() {
    this.sdps = await api.getsdps();
  },
  methods: {
    onSubmit: function () {
      if (
        this.cus.fullname === "" ||
        this.cus.tel === "" ||
        this.cus.sdp === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.cus);
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