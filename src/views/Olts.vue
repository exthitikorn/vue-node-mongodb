<template>
  <div>
    <h1>OLT</h1>
    <a href="/olts/new" class="positive ui button">New</a>
    <flash-message></flash-message>
    <br>
    <div v-if="olts.length > 0">
      <table id="olts" class="ui celled table">
        <thead>
          <tr>
            <th><i class=""></i>OLT Name</th>
            <th><i class="info circle icon"></i></th>
            <th><i class="edit icon"></i></th>
            <th><i class="trash icon"></i></th>
          </tr>
        </thead>
        <tr v-for="(olt, i) in olts" :key="i">
          <td>{{ olt.olt_Name }}</td>
          <td width="120" class="center aligned">
            <router-link :to="{ name: 'show-pon-olt', params: { id: olt._id } }"
              >Show PON</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit-olt', params: { id: olt._id } }"
              >Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(olt.olt_Name)">
            <a :href="`/olts/${olt.olt_Name}`">Delete</a>
          </td>
        </tr>
      </table>
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
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteolt(id);
      this.flash("olt deleted sucessfully!", "success");
      const newolts = this.olts.filter((olt) => olt.olt_Name !== id);
      this.olts = newolts;
    },
  },
  async mounted() {
    this.olts = await api.getolts();
  },
};
</script>