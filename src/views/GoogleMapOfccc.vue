<template>
  <div>
    <h1>Google Map {{ ofccc.ofccc_Name }}</h1>
    <p class="groove">
      <GmapMap
        :center="center"
        :zoom="16"
        :options="mapOptions"
        map-style-id="roadmap"
        style="width: 100%; height: 550px"
      >
        <GmapMarker
          :position="marker.position"
          :clickable="false"
          :draggable="false"
        />
      </GmapMap>
    </p>

    <div class="container6">
      <a onclick="history.back()" class="negative ui button">Back</a>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "google-map",
  data() {
    return {
      ofccc: "",
      marker: { position: { lat: 0, lng: 0 } },
      center: { lat: 0, lng: 0 },

      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },
  methods: {
    setPositionAndCenter(e) {
      this.marker.position.lat = this.ofccc.ofccc_Lat;
      this.marker.position.lng = this.ofccc.ofccc_Lng;
      this.center.lat = this.ofccc.ofccc_Lat;
      this.center.lng = this.ofccc.ofccc_Lng;
      console.log(e);
    },
  },
  async mounted() {
    this.ofccc = await api.getofccc(this.$route.params.id);
    this.setPositionAndCenter();
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
p.groove {
  border-style: groove;
}
</style>