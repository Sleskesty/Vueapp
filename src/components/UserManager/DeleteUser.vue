<template>
    <div>
        <md-dialog-confirm
        :md-active.sync="active"
        md-title="Are you sure you want to delete this user?"
        md-content='User will be deleted.'
        md-confirm-text="Confirm"
        md-cancel-text="Cancel"
        @md-cancel="onCancel"
        @md-confirm="onConfirm" />
    
    <md-button class="md-icon-button md-accent" @click="active = true">
        <md-icon>delete</md-icon>
    </md-button>

    </div>

</template>

<script>
import { API_URL } from '../../main.js'
export default {
  name: 'DeleteCard',
  props: {
    prodname: String,
    // onConfirm: function,
  },
  data() {
      return {active:false}
  },
  methods: {
    async  onConfirm () {
        const myURL = `${API_URL}/users/${this.prodname}/`
     await   fetch(myURL, {method:"delete"}).catch ();
       this.$emit('pleaserefresh')
      },
      onCancel () {
      }
  }
}
</script>