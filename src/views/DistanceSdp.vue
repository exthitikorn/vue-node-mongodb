<template>
  <div>
    <h1>SDP around me</h1>
    <div v-if="dataLoc.length > 0">
      <p class="groove">
        <GmapMap
          :center="currentLocation"
          :zoom="zoom"
          :options="mapOptions"
          map-style-id="roadmap"
          style="width: 100%; height: 550px"
        >
          <GmapMarker
            v-for="(markers, i) in setMarker()"
            :key="i"
            :position="markers.position"
          />
        </GmapMap>
      </p>
      <div class="tableresponsive" style="overflow-x: auto">
        <table class="ui celled compact table">
          <thead>
            <tr>
              <th class="center aligned">SDP name</th>
              <th class="center aligned">Distance</th>
              <th class="center aligned">
                <i class="map marker alternate icon"></i>
              </th>
            </tr>
          </thead>
          <tr v-for="(dataLoc, i) in sortedDataLoc(dataLoc)" :key="i">
            <td class="center aligned" data-title="ชื่อ">{{ dataLoc.name }}</td>
            <td class="center aligned" data-title="ระยะห่าง">{{ dataLoc.dist }} เมตร</td>
            <td class="center aligned" data-title="ตำแหน่ง">
              <a
                v-on:click="changeCenter(dataLoc.lat, dataLoc.lng)"
                class="ui teal button"
                >Location</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>Don't any have a SDP in distance of 300 meters</div>
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
      dataLoc: [],
      center: { lat: null, lng: null },
      zoom: 18,
      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  methods: {
    //Set center
    changeCenter(lat, lng) {
      this.currentLocation.lat = lat;
      this.currentLocation.lng = lng;
      this.zoom = 19;

      this.$refs.mapRef.panTo(this.currentLocation);
    },

    //Set marker
    setMarker() {
      var markers = [];
      for (let i = 0; i < this.dataDist.length; i++) {
        markers.push({
          position: {
            lat: this.dataDist[i].loc[1],
            lng: this.dataDist[i].loc[0],
          },
        });
      }
      return markers;
    },

    //Sort data
    sortedDataLoc: function (arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a.dist - b.dist;
      });
    },

    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
      this.center.lat = this.currentLocation.lat;
      this.center.lng = this.currentLocation.lng;
    },

    //Calculate distance
    distance() {
      for (let i = 0; i < this.dataDist.length; i++) {
        var lat1 = this.currentLocation.lat;
        var lng1 = this.currentLocation.lng;
        var lat2 = this.dataDist[i].loc[1];
        var lng2 = this.dataDist[i].loc[0];
        if (lat1 == lat2 && lng1 == lng2) {
          this.dataLoc.push({
            _id: this.dataDist[i]._id,
            name: this.dataDist[i].sdp_Name,
            lat: lat2,
            lng: lng2,
            dist: 0,
          });
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
          } else {
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1609.344;
            if (dist < 300) {
              this.dataLoc.push({
                _id: this.dataDist[i]._id,
                name: this.dataDist[i].sdp_Name,
                lat: lat2,
                lng: lng2,
                dist: dist.toFixed(0),
              });
            }
          }
        }
      }
      this.setMarker();
    },
  },
  async mounted() {
    this.geolocate();
    this.dataDist = await api.distance(
      this.$route.params.lng,
      this.$route.params.lat
    );
    this.distance();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.tableresponsive {
  margin: 15px auto;
}

@media only screen and (max-width: 770px) {
  .tableresponsive table,
  .tableresponsive thead,
  .tableresponsive tbody,
  .tableresponsive th,
  .tableresponsive td,
  .tableresponsive tr {
    display: block;
  }

  .tableresponsive thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .tableresponsive tr {
    border: 1px solid #ccc;
  }

  .tableresponsive td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 45% !important;
    white-space: normal;
    text-align: left;
  }

  .tableresponsive td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 50%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  .tableresponsive td:before {
    content: attr(data-title);
  }
}
.width-120px {
  width: 120px;
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