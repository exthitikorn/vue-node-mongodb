<template>
  <div>
    <h1>Show User</h1>
    <flash-message></flash-message>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> Username</div>
      <input type="text" readonly :value="user.username" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> Password</div>
      <input type="password" readonly :value="user.password" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i> LINE ID</div>
      <input type="text" readonly :value="user.Line_id" />
    </div>
    <div class="actions">
      <router-link :to="{ name: 'edit-user', params: { id: this.$route.params.id } }"> Edit User</router-link>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/Helpers";
export default {
  name: "show-user",
  data() {
    return {
      user: "",
    };
  },
  async mounted() {
    this.user = await api.getuser(this.$route.params.id);
  },
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>