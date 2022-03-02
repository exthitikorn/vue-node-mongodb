<template>
  <div>
    <h1>Customers : {{ customers.length }}</h1>
    <a href="/customers/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="customers.length > 0">
      <table id="customers" class="ui celled compact table">
        <thead>
          <tr>
            <th><i class=""></i>Fullname</th>
            <th><i class=""></i>Tel.</th>
            <th><i class=""></i>SDP name</th>
            <th class="center aligned"><i class="edit icon"></i></th>
            <th class="center aligned"><i class="trash icon"></i></th>
          </tr>
        </thead>
        <tr v-for="(customers, i) in customers" :key="i">
          <td>{{ customers.fullname }}</td>
          <td>{{ customers.tel }}</td>
          <td>{{ customers.sdp.sdp_Name }}</td>
          <td width="75" class="center aligned">
            <router-link class="ui orange button" :to="{ name: 'edit-customers', params: { id: customers._id } }"
              >Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(customers._id)">
            <a class="ui red button" :href="`/customers/${customers._id}`">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>You don't have any Customer!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "customers",
  data() {
    return {
      customers: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deletecus(id);
      this.flash("Customer deleted sucessfully!", "error");
      const newCus = this.customers.filter((cus) => cus._id !== id);
      this.customers = newCus;
    },
  },
  async mounted() {
    this.customers = await api.getcuss();
  },
};
</script>
