<template>
  <div>
    <h1>PON : {{ pons.length }}</h1>
    <a href="/pons/new" class="positive ui button">New</a>
    <flash-message></flash-message>
    <br>
    <div v-if="pons.length > 0">
      <table id="pons" class="ui celled table">
        <thead>
          <tr>
            <th><i class=""></i>PON Name</th>
            <th><i class=""></i>Rack</th>
            <th><i class=""></i>Shelf</th>
            <th><i class=""></i>Slot</th>
            <th><i class=""></i>Port</th>
            <th><i class=""></i>OLT Name</th>
            <th><i class="info circle icon"></i></th>
            <th><i class="edit icon"></i></th>
            <th><i class="trash icon"></i></th>
          </tr>
        </thead>
        <tr v-for="(pon, i) in pons" :key="i">
          <td>{{ pon.pon_Name }}</td>
          <td>{{ pon.pon_Rack }}</td>
          <td>{{ pon.pon_Shelf }}</td>
          <td>{{ pon.pon_Slot }}</td>
          <td>{{ pon.pon_Port }}</td>
          <td>{{ pon.olt.olt_Name}}</td>
          <td width="120" class="center aligned">
            <router-link :to="{ name: 'show-pon-ofccc', params: { id: pon._id } }"
              >Show ofccc</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit-pon', params: { id: pon._id } }"
              >Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(pon._id)">
            <a :href="`/pons/${pon._id}`">Delete</a>
          </td>
        </tr>
      </table>
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