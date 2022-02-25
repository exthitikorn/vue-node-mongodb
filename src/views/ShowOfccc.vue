<template>
  <div>
    <h1>SDP : {{ sdps.length }}</h1>
    <flash-message></flash-message>
    <div v-if="sdps.length > 0">
      <table id="sdps" class="ui celled table">
        <thead>
          <tr>
            <th>SDP Name</th>
            <th>Type</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Location</th>
          </tr>
        </thead>
        <tr v-for="(sdp, i) in sdps" :key="i">
          <td>{{ sdp.sdp_Name }}</td>
          <td>{{ sdp.sdp_Type }}</td>
          <td>{{ sdp.loc.sdp_Lat }}</td>
          <td>{{ sdp.loc.sdp_Lng }}</td>
          <td>
            <router-link :to="{ name: 'google-map-sdp', params: { id: sdp._id } }"
              >Location</router-link>
          </td>
        </tr>
      </table>
      <div class="container6">
        <a onclick="history.back()" class="negative ui button">Back</a>
      </div>
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
div.container6 {
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.container6 p {
  margin: 0;
}
</style>