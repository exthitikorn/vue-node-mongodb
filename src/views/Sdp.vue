<template>
  <div>
    <h1>SDP : {{ sdps.length }}</h1>
    <a href="/sdps/new" class="ui blue button">New</a>
    <router-link
      class="ui yellow button"
      :to="{ name: 'distance', params: { lng: loc.lng, lat: loc.lat } }"
      >SDP around me</router-link
    >
    <flash-message></flash-message>
    <br />
    <div v-if="sdps.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="sdps" class="ui celled compact table">
          <thead>
            <tr>
              <th class="center aligned">SDP Name</th>
              <th class="center aligned">Type</th>
              <th class="center aligned">ofccc Name</th>
              <th class="center aligned">
                <i class="map marker alternate icon"></i>
              </th>
              <th class="center aligned"><i class="info circle icon"></i></th>
              <th class="center aligned"><i class="edit icon"></i></th>
              <th class="center aligned"><i class="trash icon"></i></th>
            </tr>
          </thead>
          <tr v-for="(sdp, i) in sdps" :key="i">
            <td class="center aligned" width="250px" data-title="ชื่อ">{{ sdp.sdp_Name }}</td>
            <td class="center aligned" data-title="ประเภท">{{ sdp.sdp_Type }}</td>
            <td class="center aligned" width="200px" data-title="ofccc">{{ sdp.ofccc.ofccc_Name }}</td>
            <td class="center aligned" data-title="ตำแหน่ง">
              <router-link
                class="ui teal button width-120px"
                :to="{ name: 'google-map-sdp', params: { id: sdp._id } }"
                >Location</router-link
              >
            </td>
            <td class="center aligned" data-title="รายการลูกค้า">
              <router-link
                class="ui green button width-120px"
                :to="{ name: 'show-sdp-customer', params: { id: sdp._id } }"
                >Customer</router-link
              >
            </td>
            <td class="center aligned" data-title="แก้ไข">
              <router-link
                class="ui orange button width-120px"
                :to="{ name: 'edit-sdp', params: { id: sdp._id } }"
                >Edit</router-link
              >
            </td>
            <td class="center aligned" data-title="ลบ"
              @click.prevent="onDestroy(sdp._id)"
            >
              <a class="ui red button width-120px" :href="`/sdps/${sdp._id}`">Delete</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any SDP!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "sdps",
  data() {
    return {
      sdps: [],
      loc: {
        lng: null,
        lat: null,
      },
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deletesdp(id);
      this.flash("SDP deleted sucessfully!", "error");
      const newsdps = this.sdps.filter((sdp) => sdp._id !== id);
      this.sdps = newsdps;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
  async mounted() {
    this.sdps = await api.getsdps();
    this.geolocate();
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
</style>
