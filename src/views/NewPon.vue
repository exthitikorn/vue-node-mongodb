<template>
  <div>
    <h1>New PON</h1>
    <pon-form @createOrUpdate="createOrUpdate"></pon-form>
  </div>
</template>

<script>
import pon from '../components/FormPon.vue';
import { api } from "../helpers/Helpers";

export default {
  name: "new-pon",
  components: {
    "pon-form": pon,
  },
  methods: {
    createOrUpdate: async function (pon) {
      await api.createpon(pon);
      this.flash("PON created", "success");
      this.$router.push(`/pons/`);
    },
  },
};
</script>