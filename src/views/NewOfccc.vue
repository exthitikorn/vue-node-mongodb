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
      const res = await api.createofccc(ofccc);
      if(res.code === 11000){
        this.flash('Duplicate ofccc name, PON name cannot create', 'warning')
        this.$router.push('/ofcccs/')
      }else{
        this.flash("ofccc created", "success");
        this.$router.push(`/ofcccs/`);
      }
    },
  },
};
</script>
