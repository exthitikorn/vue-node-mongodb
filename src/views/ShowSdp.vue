<template>
  <div>
    <h1>Customer : {{ customers.length }}</h1>
    <flash-message></flash-message>
    <div v-if="customers.length > 0">
      <table id="customers" class="ui celled table">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Telephone</th>
          </tr>
        </thead>
        <tr v-for="(customers, i) in customers" :key="i">
          <td>{{ customers.fullname }}</td>
          <td>{{ customers.tel }}</td>
        </tr>
      </table>
      <div class="container6">
        <a onclick="history.back()" class="negative ui button">Back</a>
      </div>
    </div>
    <div v-else>You don't have any customer!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show",
  data() {
    return {
      customers: "",
    };
  },
  async mounted() {
    this.customers = await api.getcusInsdp(this.$route.params.id);
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