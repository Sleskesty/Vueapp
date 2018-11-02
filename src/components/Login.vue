<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Login Here</div>
      </div>

      <div class="form">
        <md-field>
          <label>Username</label>
          <md-input required v-model="login.username" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input required v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="onSubmit">Log in</md-button>
      </div>


      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "App",
  computed: {
    ...mapState(['isLoggedIn'])
  },
  data() {
    return {
      loading: false,
      login: {
        username: "",
        password: "",
        userIsLoggedIn: false
      }
    };
  },
  methods: {
    ...mapActions(['logOn', 'setUser']),
    auth() {
      // your code to login user
      // this is only for example of loading
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
    async onSubmit () {
          let myURL = `https://storeapiexpress-ogmfmfnhzk.now.sh/users/login`
          const reqContent = {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({username: this.login.username, password: this.login.password})
          }
          let theReq = new Request(myURL, reqContent)
          await fetch(theReq) 
              .then(res => {return res.json()})
              .then ( res => {
               this.logOn(res)})
              .catch ()

              myURL = `https://storeapiexpress-ogmfmfnhzk.now.sh/users/${this.login.username}`

          await fetch(myURL) 
              .then(res => {return res.json()})
              .then ( res => {
               this.setUser(res.msg)})
               .then (this.$router.push('/'))
              .catch ()

    }
  }
};
</script>

<style lang="scss">
.centered-container {
  font-family: 'Raleway', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    color: #77ccfc;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
      color: #77ccfc;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
     position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
    color: #77ccfc;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>