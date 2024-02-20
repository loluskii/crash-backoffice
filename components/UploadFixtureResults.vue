<template>
    <b-modal id="uploadResults"
     size="md" title="Upload Results">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button size="sm" variant="danger" @click="cancel">
          Cancel
        </b-button>
        <b-button :disabled="file.length === 0 && !loading" size="sm" variant="success" @click="submit">
          {{ !loading ? 'Submit' : 'Uploading' }}
        </b-button>
      </template>
    </b-modal>
</template>
<script>
import axios from '~/plugins/axios'

    export default {
      props: ['week'],
      data(){
        return{
          file: [],
          loading: false
        }
      },
      methods:{
        submit() {
          this.loading = true;
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('week', this.week);
          axios.post('/api/utilities/upload-pool-results', formData).then(response =>  {
            this.loading = false;
            console.log(response);
            if(response.data.success) {
              this.$nuxt.$emit('uploaded-results');
              this.cancel();
            } else {
              this.notify({message: 'Unable to upload results', title: 'Error', type: 'error'});
            }
            // this.sports = response.data
          }).catch(error => {
            this.loading = false;
            console.log(error.data)
          });
        },
        cancel() {
          this.$bvModal.hide('uploadResults');
          // this.file = [];
        }
      },
      mounted(){

      }
    }
</script>
