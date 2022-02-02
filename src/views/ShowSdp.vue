<template>
  <div>
    <h1>Show SDP</h1>
    <flash-message></flash-message>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> SDP</div>
      <input type="text" readonly :value="sdp.sdp_Name" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> SDP ID</div>
      <input type="text" readonly :value="sdp._id" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> Type</div>
      <input type="text" readonly :value="sdp.sdp_Type" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> Latitude</div>
      <input
        type="number"
        step="0.000000000000001"
        readonly
        :value="sdp.sdp_Lat"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> Longitude</div>
      <input
        type="number"
        step="0.000000000000001"
        readonly
        :value="sdp.sdp_Lng"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> ofccc ID</div>
      <input type="text" readonly :value="sdp.ofccc_id" />
    </div>
    <div class="actions">
      <router-link :to="{ name: 'edit-sdp', params: { id: this.$route.params.id } }"> Edit SDP</router-link>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show-sdp",
  data() {
    return {
      sdp: "",
    };
  },
  async mounted() {
    this.sdp = await api.getsdp(this.$route.params.id);
  },
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>