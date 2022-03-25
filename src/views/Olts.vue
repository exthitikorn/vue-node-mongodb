<template>
  <div>
    <h1>OLT : {{ olts.length }}</h1>
    <a href="/olts/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="olts.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="olts" class="ui celled table">
          <thead>
            <tr>
              <th class="center aligned" scope="col">OLT Name</th>
              <th class="center aligned" scope="col">
                <i class="map marker alternate icon"></i>
              </th>
              <th class="center aligned" scope="col">
                <i class="info circle icon"></i>
              </th>
              <th class="center aligned" scope="col">
                <i class="edit icon"></i>
              </th>
              <th class="center aligned" scope="col">
                <i class="trash icon"></i>
              </th>
            </tr>
          </thead>
          <tr v-for="(olt, i) in olts" :key="i">
            <td class="center aligned" data-title="ชื่อ" width="500px">
              {{ olt.olt_Name }}
            </td>
            <td class="center aligned" data-title="ตำแหน่ง">
              <router-link
                class="ui teal button width-120px"
                :to="{ name: 'google-map-olt', params: { id: olt._id } }"
                >Location</router-link
              >
            </td>
            <td class="center aligned" data-title="รายการ PON">
              <router-link
                class="ui green button width-120px"
                :to="{ name: 'show-pon-olt', params: { id: olt._id } }"
                >Show PON</router-link
              >
            </td>
            <td class="center aligned" data-title="แก้ไข">
              <router-link
                class="ui orange button width-120px"
                :to="{ name: 'edit-olt', params: { id: olt._id } }"
                >Edit</router-link
              >
            </td>
            <td
              class="center aligned"
              @click.prevent="onDestroy(olt._id)"
              data-title="ลบ"
            >
              <a class="ui red button width-120px" :href="`/olts/${olt._id}`">Delete</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any OLT!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "olts",
  data() {
    return {
      olts: [],
      search: "",
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteolt(id);
      this.flash("OLT deleted sucessfully!", "error");
      const newolts = this.olts.filter((olt) => olt._id !== id);
      this.olts = newolts;
    },
  },
  async mounted() {
    this.olts = await api.getolts();
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