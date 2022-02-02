<template>
  <div>
    <h1>Edit ofccc</h1>
    <ofccc-form @createOrUpdate="createOrUpdate" :ofccc="this.ofccc"></ofccc-form>
  </div>
</template>

<script>
import ofccc from "../components/FormOfccc.vue";
import { api } from "../helpers/Helpers";
export default {
  name: "edit-ofccc",
  components: {
    "ofccc-form": ofccc,
  },
  data: function () {
    return {
      ofccc: {},
    };
  },
  methods: {
    createOrUpdate: async function (ofccc) {
      await api.updateofccc(ofccc);
      this.flash("ofccc updated sucessfully!", "success");
      this.$router.push(`/ofcccs/`);
    },
  },
  async mounted() {
    this.ofccc = await api.getofccc(this.$route.params.id);
  },
};
</script>
