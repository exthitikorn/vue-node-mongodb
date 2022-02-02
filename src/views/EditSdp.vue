<template>
  <div>
    <h1>Edit SDP</h1>
    <sdp-form @createOrUpdate="createOrUpdate" :sdp="this.sdp"></sdp-form>
  </div>
</template>

<script>
import sdp from "../components/FormSdp.vue";
import { api } from "../helpers/Helpers";
export default {
  name: "edit-sdp",
  components: {
    "sdp-form": sdp,
  },
  data: function () {
    return {
      sdp: {},
    };
  },
  methods: {
    createOrUpdate: async function (sdp) {
      await api.updatesdp(sdp);
      this.flash("SDP updated sucessfully!", "success");
      this.$router.push(`/sdps/`);
    },
  },
  async mounted() {
    this.sdp = await api.getsdp(this.$route.params.id);
  },
};
</script>