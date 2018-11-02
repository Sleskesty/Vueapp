<template>
  <div id="productlist">
    <md-table v-model="productLine" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
    <md-table-toolbar>
        <h1 class="md-title">User Manager</h1>

        <CreateCard v-on:pleaserefresh="Clicked" />
        
        <md-field md-clearable class="md-toolbar-section-end">
          <md-icon>search</md-icon>
          <md-input placeholder="Search by name..." v-model="valfriend" @input="Clicked" />
        </md-field>

    </md-table-toolbar>

     
       <md-table-row slot="md-table-row" slot-scope="{ item }">
         <md-table-cell md-label="Username" md-sort-by="name" md-numeric>{{ item.username }}</md-table-cell>
         <md-table-cell md-label="Email Address" md-sort-by="name">{{ item.emailaddress }}</md-table-cell>
             <md-table-cell class="buttoncell"> 

                 <UpdateCard :user='item' v-on:pleaserefresh="Clicked"/>

             </md-table-cell>  
             <md-table-cell class="buttoncell"> 

                     <DeleteCard :prodname='item._id' v-on:pleaserefresh="Clicked"/>

             </md-table-cell>  
      </md-table-row>
    </md-table>

  </div>

  
</template>

<script>
import { API_URL } from '../../main.js'
import CreateCard from './CreateUser.vue'
import DeleteCard from './DeleteUser.vue'
import UpdateCard from './UpdateUser.vue'
export default {
  name: 'user-list',
  components: {
    CreateCard,
    UpdateCard,
    DeleteCard,
  },
  data() {
   return { productLine: [], valfriend:""}
  },
  methods: {
   async Clicked () {
        const myURL = `${API_URL}/users/`
      await  fetch(myURL) 
            .then(res => {return res.json()})
            .then ( res => {
                this.productLine = res.msg
            })
            .catch (this.productLine = [])
    },
  },
  mounted () {
    const myURL = `${API_URL}/users/`
    fetch(myURL) 
        .then(res => {return res.json()})
        .then ( res => {
            this.productLine = res.msg
        })
        .catch ();
  }
}
</script>