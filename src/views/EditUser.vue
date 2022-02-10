<template>
    <div>
        <h1>Edit User</h1>
        <flash-message></flash-message>
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
      const res = await api.updateuser(user);
      if(res.code === 11000){
        this.flash('Duplicate username cannot update', 'warning')
        // this.$route.push('/users/')
      }else{
        this.flash('User updated sucessfully!', 'success');
        this.$router.push(`/users/`);
      }
      
    }
  },
  async mounted() {
    this.user = await api.getuser(this.$route.params.id);
  }
};
</script>