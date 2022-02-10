<template>
    <div>
        <h1>Users : {{ users.length }}</h1>
        <a href="/users/new" class="positive ui button">New</a>
        <flash-message></flash-message>
    <br />
    <div v-if="users.length > 0">
      <table id="users" class="ui celled compact table">
        <thead>
          <tr>
            <th><i class=""></i>Username</th>
            <th><i class=""></i>Password</th>
            <th><i class=""></i>LINE ID</th>
            <th><i class="info circle icon"></i></th>
            <th><i class="edit icon"></i></th>
            <th><i class="trash icon"></i></th>
          </tr>
        </thead>
        <tr v-for="(user, i) in users" :key="i">
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.Line_id }}</td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show-user', params: { id: user._id } }"> Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit-user', params: { id: user._id } }"> Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(user._id)">
            <a :href="`/users/${user._id}`">Delete</a>
          </td>
        </tr>
      </table>
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
