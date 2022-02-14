<template>
  <div>
    <h1>Google Map {{ olt.olt_Name }}</h1>
    <GmapMap
      :center="center"
      :zoom="16"
      :options="mapOptions"
      map-style-id="roadmap"
      style="width: 100%; height: 650px"
    >
      <GmapMarker
        :position="marker.position"
        :clickable="false"
        :draggable="false"
      />
    </GmapMap>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "google-map",
  data() {
    return {
      olt: "",
      marker: { position: { lat: 0, lng: 0 } },
      center: { lat: 0, lng: 0 },

      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  methods:{
    setPositionAndCenter(e) {
      this.marker.position.lat = this.olt.olt_Lat;
      this.marker.position.lng = this.olt.olt_Lng;
      this.center.lat = this.olt.olt_Lat;
      this.center.lng = this.olt.olt_Lng;
      console.log(e);
    }
  },
  async mounted() {
    this.olt = await api.getolt(this.$route.params.id);
    this.setPositionAndCenter();
  },
};
</script>

<style>
</style>