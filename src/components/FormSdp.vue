<template>
  <div class="row">
    <form action="#" @submit.prevent="onSubmit">
      <div class="column">
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>SDP name</div>
          <input
            type="text"
            placeholder="Enter SDP Name..."
            v-model="sdp.sdp_Name"
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>SDP type</div>
          <model-list-select
            :list="options"
            v-model="sdp.sdp_Type"
            option-value="value"
            option-text="value"
            placeholder="Select SDP type"
          >
          </model-list-select>
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>Latitude</div>
          <input
            type="number"
            step="0.000000000000001"
            placeholder="Enter Latitude..."
            v-model="sdp.sdp_Lat"
            readonly
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>Longitude</div>
          <input
            type="number"
            step="0.000000000000001"
            placeholder="Enter Longitude..."
            v-model="sdp.sdp_Lng"
            readonly
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>ofccc name</div>
          <!-- Model-List-Select -->
          <model-list-select
            :list="ofcccs"
            v-model="sdp.ofccc"
            option-value="_id"
            option-text="ofccc_Name"
            placeholder="Select ofccc name"
          >
          </model-list-select>
        </div>
        <table>
          <td><button class="positive ui button">Submit</button></td>
          <td>
            <a onclick="history.back()" class="negative ui button">Back</a>
          </td>
        </table>
      </div>
      <div class="column">
        <div>
          <p class="groove">
            <GmapMap
              :center="center"
              :zoom="zoom"
              map-style-id="roadmap"
              :options="mapOptions"
              style="width: 100%; height: 400px"
              ref="mapRef"
              @click="handleMapClick"
            >
              <GmapMarker
                :position="marker.position"
                :clickable="true"
                :draggable="true"
                @drag="handleMarkerDrag"
                @click="panToMarker"
              />
            </GmapMap>
          </p>
          <div class="container6">
            <a v-on:click="geolocate()" class="ui orange button"
              >Current Location</a
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ModelListSelect } from "vue-search-select";

Vue.component("v-select", vSelect);

import { api } from "../helpers/Helpers";

export default {
  name: "sdp-form",
  props: {
    sdp: {
      type: Object,
      require: false,
      default: () => {
        return {
          sdp_Name: "",
          sdp_Type: "",
          sdp_Lat: "",
          sdp_Lng: "",
          ofccc: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      ofcccs: [],
      options: [
        { value: "4 Port" },
        { value: "8 Port" },
        { value: "16 Port" },
        { value: "32 Port" },
      ],
      currentLocation: { lat: null, lng: null },
      marker: { position: { lat: 0, lng: 0 } },
      center: { lat: 13.736717, lng: 100.52318 },
      zoom: 5,

      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  async mounted() {
    this.ofcccs = await api.getofcccs();
    // this.geolocate();
  },
  methods: {
    onSubmit: function () {
      if (
        this.sdp.sdp_Name === "" ||
        this.sdp.sdp_Type === "" ||
        this.sdp.sdp_Lat === "" ||
        this.sdp.sdp_Lng === "" ||
        this.sdp.ofccc === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.sdp);
      }
    },
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.marker.position.lat = this.currentLocation.lat;
        this.marker.position.lng = this.currentLocation.lng;
        this.sdp.sdp_Lat = this.currentLocation.lat;
        this.sdp.sdp_Lng = this.currentLocation.lng;
        this.zoom = 18;

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.sdp.sdp_Lat = this.marker.position.lat;
      this.sdp.sdp_Lng = this.marker.position.lng;
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(5);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.sdp.sdp_Lat = this.marker.position.lat;
      this.sdp.sdp_Lng = this.marker.position.lng;
      console.log(e);
    },
  },
  components: {
    ModelListSelect,
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.column {
  float: left;
  width: 50%;
  padding: 5px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
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
p.groove {
  border-style: groove;
}
</style>
