<template>
  <div>
          <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{name.name}}</div>
          <div class="md-subhead">{{name.price}}</div>
        </md-card-header>
               
                <md-card-media>
          <img v-bind:src="name.img"> 
        </md-card-media>

        <md-card-content>
            {{name.desc}}
        </md-card-content>

        <md-card-actions>
          <md-button v-on:click="addItem(name)"> <md-icon>add_shopping_cart</md-icon></md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
    
    </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex'
export default {
  name: 'productcard',
  props: {
    name: Object
  },
  methods: {
      ...mapActions(['addItem'])
      }
  }

</script>
<style lang="scss" scoped>
  .md-icon-button  {
    overflow-x:auto;
    border: 1px solid black 
  }
  .md-card {
    width: 320px;
    height: 470px;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
  img {
    height: 15em;
    width: 100%;
  }
  </style>