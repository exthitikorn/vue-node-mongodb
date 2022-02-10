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
      const res = await api.createpon(pon);
      if(res.code === 11000){
        this.flash("Duplicate PON Name, Rack, Shelf, Slot, Port, OLT name cannot create", "warning")
        this.$router.push('/pons/')
      }else{
        this.flash("PON created", "success");
        this.$router.push(`/pons/`);
      }
      
    },
  },
};
</script>