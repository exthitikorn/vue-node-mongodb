<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Name</div>
      <input type="text" placeholder="Enter Name..." v-model="olt.olt_Name" />
    </div>
    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "olt-form",
  props: {
    olt: {
      type: Object,
      require: false,
      default: () => {
        return {
          olt_Name: "",
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
  methods: {
    onSubmit: function() {
      if (this.olt.olt_Name === "" || this.olt.olt_Name === this.olts.olt_Name) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.olt);
      }
    },
  },
  async mounted() {
    this.olts = await api.getolts();
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
