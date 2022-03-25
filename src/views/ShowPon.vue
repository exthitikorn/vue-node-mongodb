<template>
  <div>
    <h1>ofccc : {{ ofcccs.length }}</h1>
    <flash-message></flash-message>
    <div v-if="ofcccs.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="ofcccs" class="ui celled table">
          <thead>
            <tr>
              <th class="center aligned">ofccc Name</th>
              <th class="center aligned">Type</th>
              <th class="center aligned">Latitude</th>
              <th class="center aligned">Longitude</th>
              <th class="center aligned">
                <i class="map marker alternate icon"></i>Location
              </th>
            </tr>
          </thead>
          <tr v-for="(ofccc, i) in ofcccs" :key="i">
            <td class="center aligned" data-title="ชื่อ">{{ ofccc.ofccc_Name }}</td>
            <td class="center aligned" data-title="ประเภท">{{ ofccc.ofccc_Type }}</td>
            <td class="center aligned" data-title="ละติจูด">{{ ofccc.ofccc_Lat }}</td>
            <td class="center aligned" data-title="ลองจิจูด">{{ ofccc.ofccc_Lng }}</td>
            <td class="center aligned" data-title="ตำแหน่ง">
              <router-link
                class="ui teal button width-120px"
                :to="{ name: 'google-map-ofccc', params: { id: ofccc._id } }"
                >Location</router-link
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any ofccc!.</div>
    <div class="container6">
      <a onclick="history.back()" class="negative ui button">Back</a>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show",
  data() {
    return {
      ofcccs: "",
    };
  },
  async mounted() {
    this.ofcccs = await api.getofcccInpon(this.$route.params.id);
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
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
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