<template>
  <div class="text md-theme-default-dark">
    <md-toolbar md-elevation="1">
      <h3 component={router-link} to="/" class="md-title, none" style="flex: 1">Ryley Inc.</h3>
      <div v-if="isLoggedIn==false">
      <md-button component={router-link} to="/register" class="none">Register</md-button>
      <md-button component={router-link} to="/login" class="none">Log in</md-button>
      </div>
      <div v-else>
      <md-button v-on:click="logOut" class="none" >Log Out</md-button>
      <md-button component={router-link} to="/products" class="none" >Products</md-button>
      <md-button component={router-link} to="/orders" class="none" >Past Orders</md-button>
      <md-button component={router-link} to="/cart" class="none"><md-icon>shopping_cart</md-icon></md-button>
      </div>
    </md-toolbar>
    <div class="blueboi">
    <router-view/>
    </div>
        <div class="phone-viewport bottom">
      <md-bottom-bar class="none" :md-theme="'bottom-bar-'">
        <md-bottom-bar-item class="none md-layout-item" component={router-link} to="/" md-label="Home">Home</md-bottom-bar-item>
        <md-bottom-bar-item class="none md-layout-item"  component={router-link} to="/about" md-label="Pages" >About</md-bottom-bar-item>
        <md-bottom-bar-item class="none md-layout-item"  component={router-link} to="/name" md-label="Posts" >Contact</md-bottom-bar-item>
        <md-bottom-bar-item v-if="userIsAdmin" class="none md-layout-item"  component={router-link} to="/ContentManager" md-label="Posts">Manager</md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions,mapGetters} from 'vuex'
import store from '../store'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['userIsAdmin']),
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logOff']),

      async logOut () {
        await this.logOff()
        this.$router.push('/login')
      }
  },

}
</script>


<style lang="scss" >
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: light // This can be dark or light
));


@import "~vue-material/dist/theme/all";

@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("dark", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: dark // This can be dark or light
));


@import "~vue-material/dist/theme/all";
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
  .text {
    font-family: 'Raleway', sans-serif;
  }
  .none { 
    color: #77ccfc;
    text-shadow: .05em .05em #dbdbdb
  }
  .bottom {
    bottom: 1em;
    width: 100%;
  }
  .space{
padding-top: 10px;
  }
  .md-toolbar{
    position: sticky;
    top: 1px;
    color: #77ccfc;
  }
  .md-button{
    color: #77ccfc;
  }
  .md-bottom-bar{
    color: #77ccfc;
  }
    .phone-viewport {
    width: 100%;
    display: inline-flex;
    align-items: space-between;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    }
</style>
