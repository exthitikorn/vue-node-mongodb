<template>
  <div>
    <h1>Edit OLT</h1>
    <flash-message></flash-message>
    <olt-form @createOrUpdate="createOrUpdate" :olt="this.olt"></olt-form>
  </div>
</template>

<script>
import olt from "../components/FormOlt.vue";
import { api } from "../helpers/Helpers";
export default {
  name: "edit-olt",
  components: {
    "olt-form": olt,
  },
  data: function () {
    return {
      olt: {},
    };
  },
  methods: {
    createOrUpdate: async function (olt) {
      await api.updateolt(olt);
      this.flash("OLT updated sucessfully!", "success");
      this.$router.push(`/olts/`);
    },
  },
  async mounted() {
    this.olt = await api.getolt(this.$route.params.id);
  },
};
</script>