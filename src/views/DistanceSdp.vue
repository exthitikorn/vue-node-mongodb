<template>
  <div>
    <h1>SDP around me</h1>
    <div v-if="dataDist.length > 0">
      <table class="ui celled compact table">
        <thead>
          <tr>
            <th><i class=""></i>SDP name</th>
            <!-- <th><i class=""></i>Distance</th> -->
            <th class="center aligned">
              <i class="map marker alternate icon"></i>
            </th>
          </tr>
        </thead>
        <tr v-for="(dataDist, i) in dataDist" :key="i">
          <td>{{ dataDist.sdp_Name }}</td>
          <!-- <td>{{ dataDist.dist }} Meter</td> -->
          <td width="120" class="center aligned">
            <router-link
              :to="{ name: 'google-map-sdp', params: { id: dataDist._id } }"
              >Location</router-link
            >
          </td>
        </tr>
      </table>
    </div>
    <div v-else>Don't any have a SDP in distance of 500 meters</div>
    <div class="container6">
      <a onclick="history.back()" class="negative ui button">Back</a>
    </div>
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
      dataDist: [],
      // loc: [],
    };
  },
  methods: {
    //detects location from browser & calculate distance
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // this.loc.push(this.currentLocation.lng);
        // this.loc.push(this.currentLocation.lat);

        // for (let i = 0; i < this.sdps.length; i++) {
        //   var lat1 = position.coords.latitude;
        //   var lng1 = position.coords.longitude;
        //   var lat2 = this.sdps[i].loc[1];
        //   var lng2 = this.sdps[i].loc[0];
        //   if (lat1 == lat2 && lng1 == lng2) {
        //     this.dataDist.push({
        //       _id: this.sdps[i]._id,
        //       name: this.sdps[i].sdp_Name,
        //       lat: lat1,
        //       lng: lng1,
        //       dist: 0,
        //     });
        //   } else {
        //     var radlat1 = (Math.PI * lat1) / 180;
        //     var radlat2 = (Math.PI * lat2) / 180;
        //     var theta = lng1 - lng2;
        //     var radtheta = (Math.PI * theta) / 180;
        //     var dist =
        //       Math.sin(radlat1) * Math.sin(radlat2) +
        //       Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        //     if (dist > 1) {
        //       dist = 1;
        //     } else {
        //       dist = Math.acos(dist);
        //       dist = (dist * 180) / Math.PI;
        //       dist = dist * 60 * 1.1515;
        //       dist = dist * 1609.344;
        //       if (dist < 500) {
        //         this.dataDist.push({
        //           _id: this.sdps[i]._id,
        //           name: this.sdps[i].sdp_Name,
        //           lat: lat1,
        //           lng: lng1,
        //           dist: dist.toFixed(0),
        //         });
        //       }
        //     }
        //   }
        // }
      });
    },
  },
  async mounted() {
    // this.sdps = await api.getsdps();
    this.geolocate();
    this.dataDist = await api.distance(100.56997312394256, 14.356020071160074);
  },
};
</script>

<style scoped>
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