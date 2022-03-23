<template>
  <div id="app">
    <div class="ui compact large six blue item inverted menu">
      <router-link to="/olts" exact class="blue item">
        <i class="table icon"></i> OLT
      </router-link>
      <router-link to="/pons" exact class="blue item">
        <i class="table icon"></i> PON
      </router-link>
      <router-link to="/ofcccs" exact class="blue item">
        <i class="table icon"></i> ofccc
      </router-link>
      <router-link to="/sdps" exact class="blue item">
        <i class="table icon"></i> SDP
      </router-link>
      <router-link to="/customers" exact class="blue item">
        <i class="table icon"></i> Customer
      </router-link>
      <router-link to="/users" exact class="blue item">
        <i class="table icon"></i> Users
      </router-link>
    </div>

    <div class="ui text container">
      <div class="ui one column grid">
        <div class="column">
          <br>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding-top: 2px;
  padding-bottom: 20px;
  margin-top: 0;
  margin-bottom: 0;
}
</style>