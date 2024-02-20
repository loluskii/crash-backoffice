<template>
    <b-modal hide-footer id="edit_user"
    :no-close-on-backdrop="true" size="lg" title="Edit Details" ref="editUserModal">
      <edit-user v-if="data" :data="data" />
    </b-modal>
</template>
<script>
    import EditUser from './player-info/edit.vue'

    export default {
      components: {EditUser},
      data(){
        return {
          data: null
        }
      },

      methods:{
        closeModal(){
          this.$refs.editUserModal.hide();
        },
      },
      mounted(){
          this.$nuxt.$on('edit_user_modal', (data) => {
            console.log(data);
              this.$refs.editUserModal.show();
              this.data = data;
          })
      }
    }
</script>
