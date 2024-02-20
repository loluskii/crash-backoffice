<template>
  <div>
    <ul class="nav nav-tabs mt-2 mb-4" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          data-target="#home"
          to="/Cashflows/CashBooks"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          CashBooks
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="profile-tab"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
          to="/Cashflows/CashIn"
        >
          Cash In
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/CashOut"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Cash Out
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Expenses"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Expenses
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Deductions"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Deductions
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Standings"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Standings
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Settings"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Settings
        </router-link>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="row mt-3">
          <div class="col-12">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-body">
                <form class="row" @submit.prevent="getResults(1)">
                  <div class="col-md-3 col-12">
                    <div class="form-group mb-0">
                      <label class="font-weight-bold" for="exampleInputEmail1"
                        >Branch</label
                      >
                      <select
                        class="form-control"
                        v-model="filterData.branch_id"
                      >
                        <option value="">Select ...</option>
                        <option
                          v-for="(agent, index) in agents"
                          :value="agent.id"
                          :key="index"
                        >
                          {{ agent.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <div class="form-group mb-0">
                      <label class="font-weight-bold" for="exampleInputEmail1"
                        >Date</label
                      >
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-white"
                            ><i class="fa fa-fw ti-calendar"></i
                          ></span>
                        </div>
                        <flat-pickr
                          v-model="filterData.date"
                          :config="config"
                          class="form-control"
                        ></flat-pickr>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <div class="form-group mb-0">
                      <label class="font-weight-bold" for="exampleInputEmail1"
                        >Status</label
                      >
                      <select class="form-control">
                        <option value=""></option>
                        <option value="1">Pending</option>
                        <option value="2">Approved</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3 col-12 pt-1">
                    <button type="submit" class="btn btn-primary btn-lg mt-4">
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary">
            <h4 class="card-title text-white">Cashbooks</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Branch</th>
                    <th>Normal Sales</th>
                    <th>Normal Payout</th>
                    <th>Virtual Sales</th>
                    <th>Virtual Payout</th>
                    <th>Live Sales</th>
                    <th>Live Payout</th>
                    <th>Cash In</th>
                    <th>Cash Out</th>
                    <th>Expenses</th>
                    <th>Closing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, index) in results" :key="index">
                    <td>{{ filterData.date }}</td>
                    <td>{{ result.username }}</td>
                    <td>{{ result.report.normal_sales }}</td>
                    <td>{{ result.report.normal_payout }}</td>
                    <td>{{ result.report.virtual_sales }}</td>
                    <td>{{ result.report.virtual_payout }}</td>
                    <td>{{ result.report.casino_sales }}</td>
                    <td>{{ result.report.casino_payout }}</td>
                    <td>{{ result.report.cash_in }}</td>
                    <td>{{ result.report.cash_out }}</td>
                    <td>{{ result.report.expenses }}</td>
                    <td>{{ result.report.closing_balance }}</td>
                  </tr>
                  <tr v-if="!results.length && !loading">
                    <td colspan="12" align="center">No record found</td>
                  </tr>
                  <tr v-if="loading">
                    <td colspan="10" class="text-center">
                      <i class="fa fa-2x fa-spin fa-spinner"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cashflows from "../../services/cashflows";
export default {
  name: "cash_books",
  layout: "main",
  data() {
    return {
      title: "Cash Books",
      filterData: {
        date: this.$moment().format("DD-MM-YYYY"),
        branch_id: "",
        status: "",
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      loading: false,
      agents: [],
      results: [],
    };
  },
  methods: {
    getAgentList(page) {
      this.loading = true;
      Cashflows.getAgentList(page).then((res) => {
        this.agents = res.data.data;
        this.loading = false;
        console.log(res.data);
      });
    },
    getResults() {
      this.loading = true;
      this.$axios.get('shop/cashbook/all-shops').then((res) => {
        this.results = res.data.data;
        this.loading = false;
        console.log(res1);
      });
    },
  },
  mounted() {
    this.getResults();
    this.getAgentList();
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Cash Books");
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style></style>
