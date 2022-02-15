<template>
  <div class="row">
    <form action="#" @submit.prevent="onSubmit">
      <div class="column">
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>ofccc name</div>
          <input
            type="text"
            placeholder="Enter ofccc Name..."
            v-model="ofccc.ofccc_Name"
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>ofccc type</div>
          <model-list-select
            :list="options"
            v-model="ofccc.ofccc_Type"
            option-value="value"
            option-text="value"
            placeholder="Select ofccc type"
          >
          </model-list-select>
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>Latitude</div>
          <input
            type="number"
            step="0.000000000000001"
            placeholder="Enter Latitude..."
            v-model="ofccc.ofccc_Lat"
            readonly
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>Longitude</div>
          <input
            type="number"
            step="0.000000000000001"
            placeholder="Enter Longitude..."
            v-model="ofccc.ofccc_Lng"
            readonly
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>PON name</div>
          <!-- Model-List-Select -->
          <model-list-select
            :list="pons"
            v-model="ofccc.pon"
            option-value="_id"
            option-text="pon_Name"
            placeholder="Select PON name"
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
              :zoom="15"
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
  name: "ofccc-form",
  props: {
    ofccc: {
      type: Object,
      require: false,
      default: () => {
        return {
          ofccc_Name: "",
          ofccc_Type: "",
          ofccc_Lat: "",
          ofccc_Lng: "",
          pon: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      pons: [],
      options: [
        { value: "4 Port" },
        { value: "8 Port" },
        { value: "16 Port" },
        { value: "32 Port" },
      ],
      objectItem: {},
      marker: { position: { lat: 0, lng: 0 } },
      center: { lat: 0, lng: 0 },

      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  async mounted() {
    this.pons = await api.getpons();
    this.geolocate();
  },
  methods: {
    onSubmit: function () {
      if (
        this.ofccc.ofccc_Name === "" ||
        this.ofccc.ofccc_Type === "" ||
        this.ofccc.ofccc_Lat === "" ||
        this.ofccc.ofccc_Lng === "" ||
        this.ofccc.pon === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.ofccc);
      }
    },
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.center.lat = this.marker.position.lat;
        this.center.lng = this.marker.position.lng;

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.ofccc.ofccc_Lat = this.marker.position.lat;
      this.ofccc.ofccc_Lng = this.marker.position.lng;
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(5);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.ofccc.ofccc_Lat = this.marker.position.lat;
      this.ofccc.ofccc_Lng = this.marker.position.lng;
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
p.groove {
  border-style: groove;
}
</style>