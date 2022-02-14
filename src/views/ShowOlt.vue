<template>
  <div>
    <h1>PON : {{ pons.length }}</h1>
    <flash-message></flash-message>
    <div v-if="pons.length > 0">
      <table id="pons" class="ui celled table">
        <thead>
          <tr>
            <th><i class=""></i>PON Name</th>
            <th><i class=""></i>Rack</th>
            <th><i class=""></i>Shelf</th>
            <th><i class=""></i>Slot</th>
            <th><i class=""></i>Port</th>
          </tr>
        </thead>
        <tr v-for="(pon, i) in pons" :key="i">
          <td>{{ pon.pon_Name }}</td>
          <td>{{ pon.pon_Rack }}</td>
          <td>{{ pon.pon_Shelf }}</td>
          <td>{{ pon.pon_Slot }}</td>
          <td>{{ pon.pon_Port }}</td>
        </tr>
      </table>
      <div class="container6">
        <a onclick="history.back()" class="negative ui button">Back</a>
      </div>
    </div>
    <div v-else>You don't have any PON!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show",
  data() {
    return {
      pons: "",
    };
  },
  async mounted() {
    this.pons = await api.getponsInolt(this.$route.params.id);
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