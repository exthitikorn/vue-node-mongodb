<template>
  <div id="app">
    <div class="ui inverted blue segment menu">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted menu">
          <router-link to="/olts" exact class="item">
            <i class="table icon"></i> OLT
          </router-link>
          <router-link to="/pons" exact class="item">
            <i class="table icon"></i> PON
          </router-link>
          <router-link to="/ofcccs" exact class="item">
            <i class="table icon"></i> ofccc
          </router-link>
          <router-link to="/sdps" exact class="item">
            <i class="table icon"></i> SDP
          </router-link>
          <router-link to="/users" exact class="item">
            <i class="table icon"></i> Users
          </router-link>
        </div>
      </div>
    </div>
    <div class="ui text container">
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
    <!-- footer
    <footer>
      <div class="ui inverted blue vertical footer segment">
        <div class="ui center aligned container">
          Exthitikorn(This.X) 2022.
        </div>
      </div>
    </footer> -->
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