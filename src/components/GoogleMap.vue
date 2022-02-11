<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
    </div>
    <br>
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
</template>

<script>
export default {
  name: 'GoogleMap',
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
    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(5);
      this.$emit("addPosition", this.marker);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },
   },
}
</script>