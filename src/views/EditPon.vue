<template>
  <div>
    <h1>Edit PON</h1>
    <flash-message></flash-message>
    <pon-form @createOrUpdate="createOrUpdate" :pon="this.pon"></pon-form>
  </div>
</template>

<script>
import pon from "../components/FormPon.vue";
import { api } from "../helpers/Helpers";
export default {
  name: "edit-pon",
  components: {
    "pon-form": pon,
  },
  data: function () {
    return {
      pon: {},
    };
  },
  methods: {
    createOrUpdate: async function (pon) {
      const res = await api.updatepon(pon);
      if (res.code === 11000) {
        this.flash(
          "Duplicate PON Name, Rack, Shelf, Slot, Port, OLT name cannot update",
          "warning"
        );
        // this.$router.push("/pons/")
      } else {
        this.flash("PON updated sucessfully!", "success");
        this.$router.push(`/pons/`);
      }
    },
  },
  async mounted() {
    this.pon = await api.getpon(this.$route.params.id);
  },
};
</script>