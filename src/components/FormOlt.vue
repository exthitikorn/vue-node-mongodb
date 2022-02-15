<template>
  <div class="row">
    <form action="#" @submit.prevent="onSubmit">
      <div class="column">
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
        <div class="ui labeled input fluid">
          <div class="ui label"><i class=""></i>Name</div>
          <input
            type="text"
            placeholder="Enter Name..."
            v-model="olt.olt_Name"
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">Latitude</div>
          <input
            type="number"
            step="any"
            v-model="olt.olt_Lat"
            placeholder="Enter Latitude..."
            readonly
          />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">Longitude</div>
          <input
            type="number"
            step="any"
            v-model="olt.olt_Lng"
            placeholder="Enter Longitude..."
            readonly
          />
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
export default {
  name: "olt-form",
  props: {
    olt: {
      type: Object,
      require: false,
      default: () => {
        return {
          olt_Name: "",
          olt_Lat: "",
          olt_Lng: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      currentLocation: { lat: null, lng: null },
      marker: { position: { lat: null, lng: null } },
      center: { lat: 13.736717, lng: 100.523186 },
      zoom: 5,

      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  methods: {
    onSubmit: function () {
      if (
        this.olt.olt_Name === "" ||
        this.olt.olt_Lat === "" ||
        this.olt.olt_Lng === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.olt);
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
        this.olt.olt_Lat = this.currentLocation.lat;
        this.olt.olt_Lng = this.currentLocation.lng;
        this.zoom = 18;

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.olt.olt_Lat = this.marker.position.lat;
      this.olt.olt_Lng = this.marker.position.lng;
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(5);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.olt.olt_Lat = this.marker.position.lat;
      this.olt.olt_Lng = this.marker.position.lng;
      console.log(e);
    },
  },
  mounted() {
    // this.geolocate();
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
