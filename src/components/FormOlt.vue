<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Name</div>
      <input type="text" placeholder="Enter Name..." v-model="olt.olt_Name" />
    </div>
    <div>
      <GmapMap
        :center="center"
        :zoom="5"
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
    </div>
    <br />
    <!-- {{ marker.position.lat }} {{ marker.position.lng }} -->
    <div class="ui labeled input fluid">
      <div class="ui label">Latitude</div>
      <input
        type="number"
        step="any"
        v-model="olt.olt_Lat"
        :placeholder="marker.position.lat"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label">Longitude</div>
      <input
        type="number"
        step="any"
        v-model="olt.olt_Lng"
        :placeholder="marker.position.lng"
      />
    </div>
    <button class="positive ui button">Submit</button>
  </form>
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
      marker: { position: { lat: 0, lng: 0 } },
      center: { lat: 14.355836188695562, lng: 100.56920170783997 },

      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  methods: {
    onSubmit: function() {
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
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(5);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },
  },
  mounted() {
    this.geolocate();
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
