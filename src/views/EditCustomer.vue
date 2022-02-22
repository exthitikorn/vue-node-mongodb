<template>
  <div>
    <h1>Edit Customer</h1>
    <flash-message></flash-message>
    <cus-form @createOrUpdate="createOrUpdate" :cus="this.cus"></cus-form>
  </div>
</template>

<script>
import cus from "../components/FormCustomer.vue";
import { api } from "../helpers/Helpers";
export default {
  name: "edit-cus",
  components: {
    "cus-form": cus,
  },
  data: function () {
    return {
      cus: {},
    };
  },
  methods: {
    createOrUpdate: async function (cus) {
      const res = await api.updatecus(cus);
      if (res.code === 11000) {
        this.flash("Cannot update", "warning");
      } else {
        this.flash("Customer updated sucessfully!", "success");
        this.$router.push(`/customers/`);
      }
    },
  },
  async mounted() {
    this.cus = await api.getcus(this.$route.params.id);
  },
};
</script>