<template>
  <div>
    <h1>SDP around me</h1>
    <!-- <a v-on:click="distance(14.7226624,100.8041984,14.358356676700055,100.56877255439758,'K')" class="ui orange button">Distance</a> -->
    <p>Distance : {{ dist.distance }} : {{ dist.lat1 }} : {{ dist.lng1 }} : {{ dist.lat2 }} : {{ dist.lng2 }}</p>
    <p>Latitude: {{ currentLocation.lat }} Longitude: {{ currentLocation.lng }}</p>
    <ul>
      <li v-for="(sdp, i) in sdps" :key="i">{{ sdp.sdp_Name }}, {{ sdp.sdp_Lat }}, {{ sdp.sdp_Lng }}</li>
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
      currentLocation:{ lat: null, lng: null },
      dist: { distance: null, lat1: null, lng1: null, lat2: null, lng2: null },
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
    distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        this.dist.distance = 0
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="M") { dist = dist * 1609.344 }
        if (unit=="N") { dist = dist * 0.8684 }
        this.dist.lat1 = lat1
        this.dist.lng1 = lon1
        this.dist.lat2 = lat2
        this.dist.lng2 = lon2
        this.dist.distance = dist
    }
}
  },
  async mounted() {
    this.sdps = await api.getsdps();
    this.geolocate();
    this.distance(14.7226624, 100.8041984, 14.358356676700055, 100.56877255439758, 'M')
  },
};
</script>

<style>
</style>