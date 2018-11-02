import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    cart: [],
    orders: [],
    isLoggedIn: false,
    currentUser:{
        roles:[]
    },
    isAdmin: false
  },
    getters: {
        userIsAdmin: (state) => {
            let isadmin = false
            console.log(state.currentUser.roles)
            if( state.currentUser.roles.length > 0) { 
            state.currentUser.roles.forEach( val => {
                if (val == 'admin') {
                    isadmin = true
                }
            }) }

            return isadmin
        }
    },
  mutations: {
      ADD_ITEM: (state, items) => {
          items.CheckoutTime = new Date();
          state.cart.push(items)
          console.log(state.cart)
      },
      REMOVE_ALL: async (state) => {
       await state.orders.push(state.cart)
       state.orders = state.orders.flat()
       console.log(state.cart[0])
           state.cart=[]
      },
      ASSUMING_DIRECT_CONTROL: (state,pl) => {
          state.isLoggedIn=pl.userIsLoggedIn
      },
      ORDER_66: (state) => {
         state.isLoggedIn=false
         state.currentUser= {
            roles:[]
        }
      },
      FOR_THE_EMPORER: (state,pl) => {
          console.log( pl)
        state.currentUser.roles=pl.roles
    },
  },
  actions: {
      addItem:(context, items) => {
          context.commit("ADD_ITEM", items)
      },
      removeAll({commit}) {
          return new Promise ((resolve,reject) => {
              setTimeout(()=>{commit('REMOVE_ALL')
                resolve()
            },0)
          }) 
      },
      logOn({commit},pl) {
          commit('ASSUMING_DIRECT_CONTROL',pl)
      },
      setUser({commit},pl) {
          commit('FOR_THE_EMPORER', pl)
      },
      logOff({commit}) {
          commit('ORDER_66')
      }
}
})
