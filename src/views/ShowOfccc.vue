<template>
  <div>
    <h1>Show SDP</h1>
    <flash-message></flash-message>
    <div v-if="sdps.length > 0">
      <table id="sdps" class="ui celled table">
        <thead>
          <tr>
            <th>SDP Name</th>
            <th>Type</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tr v-for="(sdp, i) in sdps" :key="i">
          <td>{{ sdp.sdp_Name }}</td>
          <td>{{ sdp.sdp_Type }}</td>
          <td>{{ sdp.sdp_Lat }}</td>
          <td>{{ sdp.sdp_Lng }}</td>
        </tr>
      </table>
    </div>
    <div v-else>You don't have any SDP!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show-sdp",
  data() {
    return {
      sdps: "",
    };
  },
  async mounted() {
    this.sdps = await api.getsdpInofccc(this.$route.params.id);
  },
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>