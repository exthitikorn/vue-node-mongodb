<template>
  <div>
    <h1>Customer : {{ customers.length }}</h1>
    <flash-message></flash-message>
    <div v-if="customers.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="customers" class="ui celled table">
          <thead>
            <tr>
              <th class="center aligned">Fullname</th>
              <th class="center aligned">Telephone</th>
            </tr>
          </thead>
          <tr v-for="(customers, i) in customers" :key="i">
            <td class="center aligned" data-title="ชื่อ">
              {{ customers.fullname }}
            </td>
            <td class="center aligned" data-title="เบอร์โทร">
              {{ customers.tel }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any customer!.</div>
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
      customers: "",
    };
  },
  async mounted() {
    this.customers = await api.getcusInsdp(this.$route.params.id);
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