<template>
<div>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>Modify a User!</md-dialog-title>
      <md-dialog-content class="interiorDia"> 

        <form id="createProduct"  @submit="clickHandler">
            <md-field>
              <label>Username</label>
              <md-input required v-model="named"></md-input>
            </md-field>

            <md-field>
              <label>EmailAddress</label>
              <md-input required v-model="email"></md-input>
            </md-field> 

            <md-field>
          <label>Password</label>
          <md-input required v-model="pass" type="password"></md-input>
            </md-field>

            <md-field>
          <label>social security</label>
          <md-input v-model="social"></md-input> 
          </md-field>

           <md-field>
          <label>Mother's Maiden</label>
          <md-input v-model="mothersmaiden"></md-input> 
          </md-field>

           <md-field>
                <label for="roles">User Roles</label>
                <md-select v-model="roles" name="roles" id="roles" multiple>
                  <md-option id="adminrole" value="admin">Admin</md-option>
                  <md-option id="userrole" value="user">User</md-option>
                </md-select>
           </md-field>

          
          <md-dialog-actions>
            <md-button class="md-primary md-raised" @click="showDialog = false">Cancel</md-button>
            <md-button class="md-primary md-raised" type="submit">Create</md-button>
          </md-dialog-actions>

        </form>  
          </md-dialog-content>
  </md-dialog>
      
      <md-button class="md-icon-button" @click="showDialog = true">
        <md-icon>build</md-icon>
      </md-button>
</div>
</template>

<script>
import { API_URL } from '../../main.js'
export default {
  name: 'UpdateCard',
    props: {
    user: Object,
  },
  data() { return{ 
    showDialog: false,
    named:this.user.username,
    email:this.user.emailaddress,
    pass:this.user.password,
    social:this.user.social,
    mothersmaiden:this.user.mothersmaiden,
    roles:this.user.roles
    }
  },
  methods: {
   async clickHandler() {
        const myURL = `${API_URL}/users/${this.user._id}`
        const reqContent = {
          method: "PUT",
          headers: {"Content-Type": "application/json; charset=utf-8"},
          body: JSON.stringify({username: this.named, 
                                emailaddress: this.email, 
                                password: this.pass, 
                                socialsecurity: this.social,
                                mothersmaiden:this.mothersmaiden,
                                roles:this.roles})
        }
        let theReq = new Request(myURL, reqContent)
     await fetch(theReq) 
            .then(res => {return res.json()})
            .then ( res => {
              res})
            .catch ()
    this.$emit('pleaserefresh')
    //reset
    this.named =''
    this.descd =''
    this.priced =''
    this.imaged = ''
      
    // setTimeout( () => this.$emit('pleaserefresh'), 500)
    this.showDialog = false
    }
  },
}
</script>


<style scoped>
.md-dialog {
  width: 80%;
}
</style>