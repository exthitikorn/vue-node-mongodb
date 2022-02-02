<template>
  <div>
    <h1>New OLT</h1>
    <olt-form @createOrUpdate="createOrUpdate"></olt-form>
  </div>
</template>

<script>
import olt from '../components/FormOlt.vue';
import { api } from "../helpers/Helpers";

export default {
  name: "new-olt",
  components: {
    "olt-form": olt,
  },
  methods: {
    createOrUpdate: async function (olt) {
      await api.createolt(olt);
      this.flash("OLT created", "success");
      this.$router.push(`/olts/`);
    },
  },
};
</script>