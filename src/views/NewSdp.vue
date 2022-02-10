<template>
    <div>
        <h1>New SDP</h1>
        <sdp-form @createOrUpdate="createOrUpdate"></sdp-form>
    </div>
</template>

<script>
import sdp from '../components/FormSdp.vue'
import { api } from "../helpers/Helpers";

export default {
  name: "new-sdp",
  components: {
    "sdp-form": sdp,
  },
  methods: {
    createOrUpdate: async function (sdp) {
      const res = await api.createsdp(sdp);
      if(res.code === 11000){
        this.flash('Duplicate SDP name cannot create', 'warning')
        this.$router.push('/sdps/')
      }else{
        this.flash("SDP created", "success");
        this.$router.push(`/sdps/`);
      }
      
    },
  },
};
</script>
