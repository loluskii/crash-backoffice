<template>
    <div class="row">
        <b-col cols="6">
            <b-card no-body>
              <b-tabs pills card vertical nav-wrapper-class="w-40" v-if="!loading">
                <b-tab v-for="(item, index) in items" :key="index" :title="item.display_name" active>
                  <sms-gateway :settings="item" />
                </b-tab>
              </b-tabs>
              <div style="width: 100%" v-if="loading" class="text-center">
                <i class="fa fa-spin fa-spinner fa-4x"></i>
              </div>
              <div style="width: 100%" v-if="!loading && !items.length" class="text-center">
                <h3>No SMS Gateway has been setup</h3>
              </div>
            </b-card>
        </b-col>
        <b-col cols="6">
          <card title="Add New Payment Method" :padding="true">
            <sms-gateway-form />
          </card>
        </b-col>
    </div>
</template>
<script>
import SmsGatewayForm from '../../components/SmsGatewayForm';
import SmsGateway from '../../components/SmsGateway';
import Api from '../../services/settings';

export default {
    layout: 'main',
    scrollToTop: true,
    components: {
      SmsGateway,
      SmsGatewayForm
    },
    data() {
        return {
            items: [],
            loading: true,
        }
    },
    methods: {
      async getData() {
        this.loading = true;
        await Api.getSMSGateways().then(res => {
          this.loading = false;
          if(res.success) {
            this.items = res.data;
          } else {
            toastr['error'](res.message, 'Error');
          }
        }).catch(err => {
          this.loading = false;
          toastr['error']('An error occured.', 'Error')
        });
      }
    },
    async mounted() {
        this.getData();
        this.$nuxt.$on('saved_sms_gateway', () => {
          this.getData();
        })
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'SMS Gateway Settings');
    },
}
</script>
