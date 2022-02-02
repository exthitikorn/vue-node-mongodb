<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Username</div>
      <input
        type="text"
        placeholder="Enter Username..."
        v-model="user.username"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>Password</div>
      <input
        type="password"
        placeholder="Enter Password..."
        v-model="user.password"
      />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class=""></i>LINE ID</div>
      <input
        type="text"
        placeholder="Enter LINE ID..."
        v-model="user.Line_id"
      />
    </div>
    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "user-form",
  props: {
    user: {
      type: Object,
      require: false,
      default: () => {
        return {
          username: "",
          password: "",
          Line_id: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
    };
  },
  methods: {
    onSubmit: function () {
      if (
        this.user.username === "" ||
        this.user.password === "" ||
        this.user.Line_id === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("createOrUpdate", this.user);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>