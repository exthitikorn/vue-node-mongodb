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
      const res = await api.createolt(olt);
      if(res.code === 11000) {
        this.flash('Duplicate OLT name cannot create', "warning");
        this.$router.push(`/olts/`);
      }else{
        this.flash("OLT created", "success");
        this.$router.push(`/olts/`);
      }
    },
  },
};
</script>