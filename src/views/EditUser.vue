<template>
    <div>
        <h1>Edit User</h1>
        <user-form @createOrUpdate="createOrUpdate" :user=this.user></user-form>
    </div>
</template>

<script>
import user from '../components/FormUser.vue'
import { api } from '../helpers/Helpers';
export default {
  name: 'edit-user',
  components: {
    'user-form': user,
  },
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    createOrUpdate: async function(user) {
      await api.updateuser(user);
      this.flash('User updated sucessfully!', 'success');
      this.$router.push(`/users/`);
    }
  },
  async mounted() {
    this.user = await api.getuser(this.$route.params.id);
  }
};
</script>