<template>
    <div class="row">
        <b-col cols="6">
            <b-card no-body>
              <b-tabs pills card vertical nav-wrapper-class="w-40" v-if="!loading">
                <b-tab v-for="(paymentMethod, index) in paymentMethods" :key="index" :title="paymentMethod.provider" active>
                  <payment-method-details :settings="paymentMethod" />
                </b-tab>
              </b-tabs>
              <div style="width: 100%" v-if="loading" class="text-center">
                <i class="fa fa-spin fa-spinner fa-4x"></i>
              </div>
              <div style="width: 100%" v-if="!loading && !paymentMethods.length" class="text-center">
                <h3>No Payment Methods Available</h3>
              </div>
            </b-card>
        </b-col>
        <b-col cols="6">
          <card title="Add New Payment Method" :padding="true">
            <payment-methods-form />
          </card>
        </b-col>
    </div>
</template>
<script>
import PaymentMethodsForm from '../../components/PaymentMethodsForm';
import PaymentMethodDetails from '../../components/PaymentMethodDetails';
import Api from '../../services/settings';

export default {
    layout: 'main',
    scrollToTop: true,
    components: {
      PaymentMethodDetails,
      PaymentMethodsForm
    },
    data() {
        return {
            paymentMethods: [],
            loading: true,
        }
    },
    methods: {
      async getPaymentMethods() {
        this.loading = true;
        await Api.getPaymentMethods().then(res => {
          this.loading = false;
          if(res.success) {
            this.paymentMethods = res.data;
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
        this.getPaymentMethods();
        this.$nuxt.$on('saved_payment_method', () => {
          this.getPaymentMethods();
        })
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Payment Methods Management');
    },
}
</script>
