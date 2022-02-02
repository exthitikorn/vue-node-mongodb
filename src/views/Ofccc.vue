<template>
  <div>
    <h1>ofccc</h1>
    <a href="/ofcccs/new" class="positive ui button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="ofcccs.length > 0">
      <table id="ofcccs" class="ui celled compact table">
        <thead>
          <tr>
            <th><i class=""></i>ofccc Name</th>
            <th><i class=""></i>Type</th>
            <th><i class=""></i>Latitude</th>
            <th><i class=""></i>Longitude</th>
            <th><i class=""></i>PON Name</th>
            <th><i class="info circle icon"></i></th>
            <th><i class="edit icon"></i></th>
            <th><i class="trash icon"></i></th>
          </tr>
        </thead>
        <tr v-for="(ofccc, i) in ofcccs" :key="i">
          <td>{{ ofccc.ofccc_Name }}</td>
          <td>{{ ofccc.ofccc_Type }}</td>
          <td>{{ ofccc.ofccc_Lat }}</td>
          <td>{{ ofccc.ofccc_Lng }}</td>
          <td>{{ ofccc.pon.pon_Name }}</td>
          <td width="120" class="center aligned">
            <router-link :to="{ name: 'show-ofccc-sdp', params: { id: ofccc._id } }"
              >Show SDP</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit-ofccc', params: { id: ofccc._id } }"
              >Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(ofccc._id)">
            <a :href="`/ofcccs/${ofccc._id}`">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>You don't have any ofccc!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "ofcccs",
  data() {
    return {
      ofcccs: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteofccc(id);
      this.flash("ofccc deleted sucessfully!", "success");
      const newofcccs = this.ofcccs.filter((ofccc) => ofccc._id !== id);
      this.ofcccs = newofcccs;
    },
  },
  async mounted() {
    this.ofcccs = await api.getofcccs();
  },
};
</script>