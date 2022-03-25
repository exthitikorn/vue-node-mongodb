<template>
  <div>
    <h1>ofccc : {{ ofcccs.length }}</h1>
    <a href="/ofcccs/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="ofcccs.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="ofcccs" class="ui celled compact table">
          <thead>
            <tr>
              <th class="center aligned">ofccc Name</th>
              <th class="center aligned">Type</th>
              <th class="center aligned">PON Name</th>
              <th class="center aligned">
                <i class="map marker alternate icon"></i>
              </th>
              <th class="center aligned"><i class="info circle icon"></i></th>
              <th class="center aligned"><i class="edit icon"></i></th>
              <th class="center aligned"><i class="trash icon"></i></th>
            </tr>
          </thead>
          <tr v-for="(ofccc, i) in ofcccs" :key="i">
            <td class="center aligned" data-title="ชื่อ">{{ ofccc.ofccc_Name }}</td>
            <td class="center aligned" data-title="ประเภท">{{ ofccc.ofccc_Type }}</td>
            <td class="center aligned" data-title="PON">{{ ofccc.pon.pon_Name }}</td>
            <td class="center aligned" data-title="ตำแหน่ง">
              <router-link
                class="ui teal button width-120px"
                :to="{ name: 'google-map-ofccc', params: { id: ofccc._id } }"
                >Location</router-link
              >
            </td>
            <td class="center aligned" data-title="รายการ SDP">
              <router-link
                class="ui green button width-120px"
                :to="{ name: 'show-ofccc-sdp', params: { id: ofccc._id } }"
                >Show SDP</router-link
              >
            </td>
            <td class="center aligned" data-title="แก้ไข">
              <router-link
                class="ui orange button width-120px"
                :to="{ name: 'edit-ofccc', params: { id: ofccc._id } }"
                >Edit</router-link
              >
            </td>
            <td class="center aligned" data-title="ลบ" @click.prevent="onDestroy(ofccc._id)">
              <a
                class="ui red button width-120px"
                :href="`/ofcccs/${ofccc._id}`"
                >Delete</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any ofccc!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "ofcccs",
  data() {
    return {
      ofcccs: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteofccc(id);
      this.flash("ofccc deleted sucessfully!", "error");
      const newofcccs = this.ofcccs.filter((ofccc) => ofccc._id !== id);
      this.ofcccs = newofcccs;
    },
  },
  async mounted() {
    this.ofcccs = await api.getofcccs();
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