<template>
  <div class="centered-container">

    <form novalidate class="md-layout md-alignment-center-center" @submit="clickHandler">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">User Registration</div>
        </md-card-header>
                <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="first-name">Username</label>
                <md-input name="first-name" id="first-name" v-model="user" required />
              </md-field>
            </div>
                        <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="last-name">Email</label>
                <md-input type="email" required name="last-name" id="last-name" v-model="email" />
              </md-field>
            </div>
          </div>
                    <md-field >
            <label for="email">Password</label>
            <md-input type="password" required name="email" id="email"  v-model="password"/>
          </md-field>
        </md-card-content>
                <md-card-actions>
          <md-button type="submit" class="md-primary">Register</md-button>
        </md-card-actions>
      </md-card>
             <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{response.msg}}</span>
    </md-snackbar>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return ( {
    user: '',
    password: '',
    email: '',
    response:{msg:''},
        showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false
    })
  },
  methods: {
          async clickHandler() {
            event.preventDefault()
          const myURL = `https://storeapiexpress-ogmfmfnhzk.now.sh/users/`
          const reqContent = {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({username: this.user, emailaddress:this.email, password: this.password,})
          }
          let theReq = new Request(myURL, reqContent)
          await fetch(theReq) 
              .then(res => {return res.json()})
              .then ( res => {
               this.response = res})
               .then(this.showSnackbar=true)
              .catch ()

      this.user =''
      this.email =''
      this.password =''
          },
    checkForm: function (e) {
      this.errors = [];
      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
      
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
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
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button{
      margin: 0;
    }
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;bottom: 0;
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
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-title {
    color: #77ccfc;
  }
  .md-button {
    color: #77ccfc;
    margin: 0;
  }
  .md-card-content {
    color: #77ccfc;
  }
  .md-card {
    width: 100em;
    padding-left:50%em;
  }
</style>