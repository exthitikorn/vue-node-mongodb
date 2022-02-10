<template>
    <div>
        <h1>New User</h1>
        <user-form @createOrUpdate="createOrUpdate"></user-form>
    </div>
</template>

<script>
import user from "../components/FormUser.vue"
import { api } from "../helpers/Helpers";

export default {
  name: "new-user",
  components: {
    "user-form": user,
  },
  methods: {
    createOrUpdate: async function (user) {
      const res = await api.createuser(user);
      if(res.code === 11000){
        this.flash('Duplicate username cannot create', 'warning')
        this.$router.push(`/users/`);
      }else{
        this.flash("User created", "success");
        this.$router.push(`/users/`);
      }
      
    },
  },
};
</script>