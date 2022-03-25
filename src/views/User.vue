<template>
  <div>
    <h1>Users : {{ users.length }}</h1>
    <a href="/users/new" class="ui blue button">New</a>
    <flash-message></flash-message>
    <br />
    <div v-if="users.length > 0">
      <div class="tableresponsive" style="overflow-x: auto">
        <table id="users" class="ui celled compact table">
          <thead>
            <tr>
              <th class="center aligned">Username</th>
              <th class="center aligned">Password</th>
              <th class="center aligned">LINE ID</th>
              <th class="center aligned"><i class="info circle icon"></i></th>
              <th class="center aligned"><i class="edit icon"></i></th>
              <th class="center aligned"><i class="trash icon"></i></th>
            </tr>
          </thead>
          <tr v-for="(user, i) in users" :key="i">
            <td class="center aligned" data-title="ชื่อ">{{ user.username }}</td>
            <td class="center aligned" data-title="รหัสผ่าน">{{ user.password }}</td>
            <td class="center aligned" data-title="LINE ID">{{ user.Line_id }}</td>
            <td class="center aligned" data-title="รายละเอียด">
              <router-link
                class="ui green button width-120px"
                :to="{ name: 'show-user', params: { id: user._id } }"
              >
                Show</router-link
              >
            </td>
            <td class="center aligned" data-title="แก้ไข">
              <router-link
                class="ui orange button width-120px"
                :to="{ name: 'edit-user', params: { id: user._id } }"
              >
                Edit</router-link
              >
            </td>
            <td class="center aligned" data-title="ลบ" @click.prevent="onDestroy(user._id)">
              <a class="ui red button width-120px" :href="`/users/${user._id}`"
                >Delete</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>You don't have any User!.</div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "users",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteuser(id);
      this.flash("User deleted sucessfully!", "error");
      const newusers = this.users.filter((user) => user._id !== id);
      this.users = newusers;
    },
  },
  async mounted() {
    this.users = await api.getusers();
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
