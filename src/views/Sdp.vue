<template>
  <div>
    <h1>SDP : {{ sdps.length }}</h1>
    <a href="/sdps/new" class="ui blue button">New</a>
    <!-- <a href="/distance" class="ui orange button">SDP around me</a> -->
    <router-link class="ui yellow button" :to="{ name: 'distance', params: { lng: loc.lng, lat: loc.lat } }">SDP around me</router-link>
    <flash-message></flash-message>
    <br />
    <div v-if="sdps.length > 0">
      <table id="sdps" class="ui celled compact table">
        <thead>
          <tr>
            <th><i class=""></i>SDP Name</th>
            <th><i class=""></i>Type</th>
            <!-- <th><i class=""></i>Lattitude</th>
            <th><i class=""></i>Longitude</th> -->
            <th><i class=""></i>ofccc Name</th>
            <th class="center aligned"><i class="map marker alternate icon"></i></th>
            <th class="center aligned"><i class="info circle icon"></i></th>
            <th class="center aligned"><i class="edit icon"></i></th>
            <th class="center aligned"><i class="trash icon"></i></th>
          </tr>
        </thead>
        <tr v-for="(sdp, i) in sdps" :key="i">
          <td>{{ sdp.sdp_Name }}</td>
          <td>{{ sdp.sdp_Type }}</td>
          <!-- <td>{{ sdp.loc[1] }}</td>
          <td>{{ sdp.loc[0] }}</td> -->
          <td>{{ sdp.ofccc.ofccc_Name }}</td>
          <!-- ***********************add tel. user*********************** -->
          <td width="75" class="center aligned">
            <router-link class="ui teal button" :to="{ name: 'google-map-sdp', params: { id: sdp._id } }"
              >Location</router-link>
          </td>
          <td width="120" class="center aligned">
            <router-link class="ui green button" :to="{ name: 'show-sdp-customer', params: { id: sdp._id } }"
              >Show Customer</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link class="ui orange button" :to="{ name: 'edit-sdp', params: { id: sdp._id } }"
              >Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(sdp._id)">
            <a class="ui red button" :href="`/sdps/${sdp._id}`">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>You don't have any SDP!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "sdps",
  data() {
    return {
      sdps: [],
      loc: {
        lng: null,
        lat: null
      }
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deletesdp(id);
      this.flash("SDP deleted sucessfully!", "error");
      const newsdps = this.sdps.filter((sdp) => sdp._id !== id);
      this.sdps = newsdps;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
  async mounted() {
    this.sdps = await api.getsdps();
    this.geolocate();
  },
};
</script>
