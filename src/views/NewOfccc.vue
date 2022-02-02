<template>
    <div>
        <h1>New ofccc</h1>
        <ofccc-form @createOrUpdate="createOrUpdate"></ofccc-form>
    </div>
</template>

<script>
import ofccc from '../components/FormOfccc.vue';
import { api } from "../helpers/Helpers";

export default {
  name: "new-ofccc",
  components: {
    "ofccc-form": ofccc,
  },
  methods: {
    createOrUpdate: async function (ofccc) {
      await api.createofccc(ofccc);
      this.flash("ofccc created", "success");
      this.$router.push(`/ofcccs/`);
    },
  },
};
</script>
