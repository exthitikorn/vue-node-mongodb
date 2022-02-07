<template>
  <div>
    <h1>ofccc : {{ ofcccs.length }}</h1>
    <flash-message></flash-message>
    <div v-if="ofcccs.length > 0">
      <table id="ofcccs" class="ui celled table">
        <thead>
          <tr>
            <th>ofccc Name</th>
            <th>Type</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <!-- <th>OLT Name</th> -->
          </tr>
        </thead>
        <tr v-for="(ofccc, i) in ofcccs" :key="i">
          <td>{{ ofccc.ofccc_Name }}</td>
          <td>{{ ofccc.ofccc_Type }}</td>
          <td>{{ ofccc.ofccc_Lat }}</td>
          <td>{{ ofccc.ofccc_Lng }}</td>
          <!-- <td>{{ ofccc.olt.olt_Name }}</td> -->
        </tr>
      </table>
    </div>
    <div v-else>You don't have any ofccc!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show",
  data() {
    return {
      ofcccs: "",
    };
  },
  async mounted() {
    this.ofcccs = await api.getofcccInpon(this.$route.params.id);
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