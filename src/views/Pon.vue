<template>
  <div>
    <h1>PON : {{ pons.length }}</h1>
    <a href="/pons/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="pons.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="pons" class="ui celled table">
          <thead>
            <tr>
              <th class="center aligned">PON Name</th>
              <th class="center aligned">Rack</th>
              <th class="center aligned">Shelf</th>
              <th class="center aligned">Slot</th>
              <th class="center aligned">Port</th>
              <th class="center aligned">OLT Name</th>
              <th class="center aligned"><i class="info circle icon"></i></th>
              <th class="center aligned"><i class="edit icon"></i></th>
              <th class="center aligned"><i class="trash icon"></i></th>
            </tr>
          </thead>
          <tr v-for="(pon, i) in pons" :key="i">
            <td class="center aligned" data-title="ชื่อ">{{ pon.pon_Name }}</td>
            <td class="center aligned" data-title="rack">{{ pon.pon_Rack }}</td>
            <td class="center aligned" data-title="shelf">{{ pon.pon_Shelf }}</td>
            <td class="center aligned" data-title="slot">{{ pon.pon_Slot }}</td>
            <td class="center aligned" data-title="port">{{ pon.pon_Port }}</td>
            <td class="center aligned" data-title="olt">{{ pon.olt.olt_Name }}</td>
            <td class="center aligned" data-title="รายการ ofccc">
              <router-link
                class="ui green button width-120px"
                :to="{ name: 'show-pon-ofccc', params: { id: pon._id } }"
                >Show ofccc</router-link
              >
            </td>
            <td class="center aligned" data-title="แก้ไข">
              <router-link
                class="ui orange button width-120px"
                :to="{ name: 'edit-pon', params: { id: pon._id } }"
                >Edit</router-link
              >
            </td>
            <td
              class="center aligned" data-title="ลบ"
              @click.prevent="onDestroy(pon._id)"
            >
              <a class="ui red button width-120px" :href="`/pons/${pon._id}`">Delete</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any pon!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "pons",
  data() {
    return {
      pons: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deletepon(id);
      this.flash("PON deleted sucessfully!", "error");
      const newpons = this.pons.filter((pon) => pon._id !== id);
      this.pons = newpons;
    },
  },
  async mounted() {
    this.pons = await api.getpons();
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