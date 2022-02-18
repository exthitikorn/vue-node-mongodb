<template>
  <div>
    <h1>SDP around me</h1>
    <p>
      Distance : {{ dist.distance }} Meter
    </p>
    <ul>
      <li v-for="(sdp, i) in sdps" :key="i">
        {{ sdp.sdp_Name }}, {{ sdp.sdp_Lat }}, {{ sdp.sdp_Lng }}
      </li>
    </ul>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "sdps",
  data() {
    return {
      sdps: [],
      currentLocation: { lat: null, lng: null },
      dist: { distance: null },
    };
  },
  methods: {
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },

    //Function to calculate distance between two coordinates
    distance(lat1, lng1, lat2, lng2) {
      if (lat1 == lat2 && lng1 == lng2) {
        this.dist.distance = 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lng1 - lng2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1609.344;
        this.dist.distance = dist.toFixed(0);
         
      }
    },
  },
  async mounted() {
    this.sdps = await api.getsdps();
    this.geolocate();
    this.distance(14.601231108288983,100.45742603251239,14.599656011676549,100.4624605178833);
  },
};
</script>

<style>
</style>