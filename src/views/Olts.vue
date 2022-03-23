<template>
  <div>
    <h1>OLT : {{ olts.length }}</h1>
    <a href="/olts/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="olts.length > 0">
      <div style="overflow-x: auto">
        <table id="olts" class="ui padded table" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th class="center aligned" role="columnheader">OLT Name</th>
              <th class="center aligned" role="columnheader"><i class="map marker alternate icon"></i></th>
              <th class="center aligned" role="columnheader"><i class="info circle icon"></i></th>
              <th class="center aligned" role="columnheader"><i class="edit icon"></i></th>
              <th class="center aligned" role="columnheader"><i class="trash icon"></i></th>
            </tr>
          </thead>
          <tr v-for="(olt, i) in olts" :key="i" role="row">
            <td width="600" role="cell">{{ olt.olt_Name }}</td>
            <td class="center aligned" role="cell">
              <router-link
                class="ui teal button"
                :to="{ name: 'google-map-olt', params: { id: olt._id } }"
                >Location</router-link
              >
            </td>
            <td class="center aligned" role="cell">
              <router-link
                class="ui green button"
                :to="{ name: 'show-pon-olt', params: { id: olt._id } }"
                >Show PON</router-link
              >
            </td>
            <td class="center aligned" role="cell">
              <router-link
                class="ui orange button"
                :to="{ name: 'edit-olt', params: { id: olt._id } }"
                >Edit</router-link
              >
            </td>
            <td class="center aligned" @click.prevent="onDestroy(olt._id)" role="cell">
              <a class="ui red button" :href="`/olts/${olt._id}`"
                >Delete</a
              >
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
/*
	Max width before this PARTICULAR table gets nasty. This query will take effect for any screen smaller than 760px and also iPads specifically.
	*/
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin: 0 0 1rem 0;
  }

  tr:nth-child(odd) {
    background: #ccc;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  /*
		Label the data
    You could also use a data-* attribute and content for this. That way "bloats" the HTML, this way means you need to keep HTML and CSS in sync. Lea Verou has a clever way to handle with text-shadow.
		*/
  
  td:nth-of-type(2):before {
    content: "Location";
  }
  td:nth-of-type(3):before {
    content: "Info";
  }
  td:nth-of-type(4):before {
    content: "Edit";
  }
  td:nth-of-type(5):before {
    content: "Delete";
  }
}
</style>