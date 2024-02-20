<template>
  <div class="container-fluid">
    <div
      class="d-flex flex-lg-row flex-md-row flex-column justify-content-between align-items-center"
    >
      <div>
        <a
          href="#"
          @click.prevent="showAddModal"
          class="btn btn-success btn-sm"
          style="margin-right: 10px"
        >
          <i class="fa fa-fw fa-plus"></i>
          Add New Currency
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <card title="All Currencies" :padding="false">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Country</th>
                <th>Rate</th>
                <th>Decimal</th>
                <th>Update Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in currencies" :key="index">
                <td scope="row">{{ index + 1 }}</td>
                <td>{{ row.country.currencyCode }}</td>
                <td>{{ row.country.name }}</td>
                <td>{{ row.exchange_rate }}</td>
                <td>{{ row.decimals }}</td>
                <td>{{ row.update_type }}</td>
                <td>{{ row.status ? "Active" : "Inactive" }}</td>
                <td>
                  <button
                    class="btn-info btn-sm"
                    @click.prevent="showEditModal(row)"
                  >
                    <i class="fa fa-pencil fa-fw"></i>
                  </button>
                  <button class="btn-danger btn-sm">
                    <i class="fa fa-trash-o fa-fw"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </card>
      </div>
    </div>
    <EditCurrency></EditCurrency>
    <b-modal hide-footer id="currency-add" title="Add New Currency">
      <form @submit.prevent="saveCurrency">
        <div class="row gx-2">
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Country</label>
              <select
                name="country"
                id="country"
                v-model="formData.countryId"
                class="form-control"
              >
                <option
                  :value="country.id"
                  v-for="(country, index) in countries"
                  :key="index"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Exchange Rate</label>
              <input
                type="number"
                v-model="formData.exchange_rate"
                class="form-control"
                aria-describedby="helpId"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Decimal</label>
              <input
                type="text"
                value="2"
                v-model="formData.decimals"
                id=""
                class="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Update Type</label>
              <select
                name=""
                v-model="formData.update_type"
                class="form-control"
                id=""
              >
                <option value="MANUAL">Manual</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  v-model="formData.status"
                  type="checkbox"
                  name=""
                  id=""
                  value="checkedValue"
                />
                Active
              </label>
            </div>
          </div>
        </div>

        <b-button
          class="pull-right"
          variant="success"
          id="submitBtn"
          type="submit"
          >Submit</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import EditCurrency from "../../components/currency/edit-currency.vue";

import {
  getRates,
  getCountries,
  createRate,
  editRate,
} from "../../plugins/queries";

export default {
  name: "sports_menu",
  layout: "main",
  scrollToTop: true,
  components: { EditCurrency },
  data() {
    return {
      currencies: [],
      countries: [],
      formData: {
        countryId: "",
        exchange_rate: null,
        status: false,
        decimals: 2,
        update_type: "",
      },
    };
  },
  methods: {
    showEditModal(row) {
      this.$bvModal.show("currency-add");
      this.formData = row;
    },
    showAddModal() {
      this.$bvModal.show("currency-add");
    },
    async getCurrencies() {
      await getRates().then((res) => {
        this.currencies = res.data;
      });
    },
    async saveCurrency() {
      this.formData.exchange_rate = parseFloat(this.formData.exchange_rate);
      if (this.formData.id) {
        await editRate(this.formData.id, this.formData).then((res) => {
          this.$bvModal.hide("currency-add");
          this.formData = {
            countryId: "",
            exchange_rate: null,
            status: false,
            decimals: 2,
            update_type: "",
          };
          this.getCurrencies();
        });
      } else {
        await createRate(this.formData).then((res) => {
          this.$bvModal.hide("currency-add");
          this.formData = {
            countryId: "",
            exchange_rate: null,
            status: false,
            decimals: 2,
            update_type: "",
          };
          this.getCurrencies();
        });
      }
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  async mounted() {
    await getRates().then((res) => {
      this.currencies = res.data;
    });
    await getCountries().then((res) => {
      this.countries = res.data;
    });
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Currency Settings");
  },
  components: { EditCurrency },
};
</script>
<style scoped>
.tab-content {
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
}
</style>
