<template>
  <div>
    <h1>Customers : {{ customers.length }}</h1>
    <a href="/customers/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="customers.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="customers" class="ui celled compact table">
          <thead>
            <tr>
              <th class="center aligned">Fullname</th>
              <th class="center aligned">Tel.</th>
              <th class="center aligned">SDP name</th>
              <th class="center aligned"><i class="edit icon"></i></th>
              <th class="center aligned"><i class="trash icon"></i></th>
            </tr>
          </thead>
          <tr v-for="(customers, i) in customers" :key="i">
            <td class="center aligned" data-title="ชื่อ">{{ customers.fullname }}</td>
            <td class="center aligned" data-title="เบอร์โทร">{{ customers.tel }}</td>
            <td class="center aligned" data-title="sdp">{{ customers.sdp.sdp_Name }}</td>
            <td class="center aligned" data-title="แก้ไข">
              <router-link
                class="ui orange button width-120px"
                :to="{ name: 'edit-customers', params: { id: customers._id } }"
                >Edit</router-link
              >
            </td>
            <td
              class="center aligned" data-title="ลบ"
              @click.prevent="onDestroy(customers._id)"
            >
              <a
                class="ui red button width-120px"
                :href="`/customers/${customers._id}`"
                >Delete</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any Customer!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "customers",
  data() {
    return {
      customers: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deletecus(id);
      this.flash("Customer deleted sucessfully!", "error");
      const newCus = this.customers.filter((cus) => cus._id !== id);
      this.customers = newCus;
    },
  },
  async mounted() {
    this.customers = await api.getcuss();
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
