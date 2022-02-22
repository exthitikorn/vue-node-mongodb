<template>
  <div>
    <h1>New Customer</h1>
    <cus-form @createOrUpdate="createOrUpdate"></cus-form>
  </div>
</template>

<script>
import cus from "../components/FormCustomer.vue";
import { api } from "../helpers/Helpers";

export default {
  name: "new-cus",
  components: {
    "cus-form": cus,
  },
  methods: {
    createOrUpdate: async function (cus) {
      const res = await api.createcus(cus);
      if (res.code === 11000) {
        this.flash(
          "Cannot create",
          "warning"
        );
        this.$router.push("/customers/");
      } else {
        this.flash("Customer created", "success");
        this.$router.push(`/customers/`);
      }
    },
  },
};
</script>