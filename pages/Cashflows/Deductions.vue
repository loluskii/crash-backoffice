<template>
  <div>
    <ul class="nav nav-tabs mt-2 mb-4" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="home-tab"
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
          class="nav-link bg-white active"
          id="contact-tab"
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
        <div class="row">
          <div class="col-12">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-body">
                <form class="row" @submit.prevent="getFilteredDeduction">
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
                          :key="index"
                          :value="agent.id"
                        >
                          {{ agent.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <label class="font-weight-bold" for="exampleInputEmail1"
                      >Month</label
                    >
                    <select
                      name="class"
                      id="class-type"
                      class="form-control"
                      v-model="filterData.month"
                    >
                      <option value="">Select...</option>
                      <option
                        :value="month.number"
                        v-for="(month, index) in months"
                        :key="index"
                      >
                        {{ month.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-3 col-12">
                    <label class="font-weight-bold" for="exampleInputEmail1"
                      >Year</label
                    >
                    <select
                      name="class"
                      id="class-type"
                      class="form-control"
                      v-model="filterData.year"
                    >
                      <option value="">Select...</option>
                      <option
                        :value="year"
                        v-for="(year, index) in years"
                        :key="index"
                      >
                        {{ year }}
                      </option>
                    </select>
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
        <div class="row mt-3">
          <div class="col-md-8">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-header bg-transparent border-bottom-0">
                <h4 class="card-title text-dark">Deductions</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped" id="deductions">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Branch</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="!loading">
                      <tr v-for="(result, index) in results" :key="index">
                        <td>
                          {{ formatDate(result.created_at, "DD/MM/YYYY") }}
                        </td>
                        <td>
                          {{
                            result.branch
                              ? result.branch.first_name +
                                " " +
                                result.branch.last_name
                              : "Not Available"
                          }}
                        </td>
                        <td>
                          {{
                            result.description
                              ? result.description
                              : "No Comment"
                          }}
                        </td>
                        <td>{{ formatNumber(result.amount) }}</td>
                        <td>
                          <a href="javascript:;" class="btn btn-info"
                            ><i class="fa fa-pencil"></i
                          ></a>
                        </td>
                      </tr>
                      <tr v-if="!results.length && !loading">
                        <td colspan="8" align="center">No record found</td>
                      </tr>
                      <tr v-if="loading">
                        <td colspan="8" class="text-center">
                          <i class="fa fa-4x fa-spin fa-spinner"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-header bg-transparent border-bottom-0">
                <h4 class="card-title text-dark">New Deduction</h4>
              </div>
              <div class="card-body">
                <form @submit.prevent="saveDeduction">
                  <div class="">
                    <div class="form-group">
                      <label class="font-weight-bold" for="exampleInputEmail1"
                        >Branch</label
                      >
                      <select class="form-control" v-model="formData.branch_id">
                        <option value="">Select ...</option>
                        <option
                          v-for="(agent, index) in agents"
                          :key="index"
                          :value="agent.id"
                        >
                          {{ agent.name }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="" for="exampleInputEmail1">Year</label>
                      <select
                        name="class"
                        id="class-type"
                        class="form-control"
                        v-model="formData.year"
                      >
                        <option
                          :value="year"
                          v-for="(year, index) in years"
                          :key="index"
                        >
                          {{ year }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="" for="exampleInputEmail1">Month</label>
                      <select
                        name="class"
                        id="class-type"
                        class="form-control"
                        v-model="formData.month"
                      >
                        <option
                          :value="month.number"
                          v-for="(month, index) in months"
                          :key="index"
                        >
                          {{ month.name }}
                        </option>
                      </select>
                    </div>

                    <b-form-group
                      id="input-group-2"
                      label="Amount:"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        placeholder="Enter amount"
                        v-model="formData.amount"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      id="input-group-2"
                      label="Description:"
                      label-for="input-2"
                    >
                      <b-form-textarea
                        id="textarea"
                        placeholder="Enter something..."
                        rows="2"
                        max-rows="6"
                        v-model="formData.description"
                      ></b-form-textarea>
                    </b-form-group>

                    <div class="row">
                      <div class="col-12">
                        <b-button
                          type="submit"
                          class="pull-right"
                          variant="primary"
                          >Submit</b-button
                        >
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cashflows from "../../services/cashflows";
export default {
  name: "deductions",
  layout: "main",
  data() {
    return {
      title: "Deductions",
      results: [],
      filterData: {
        // branch_id: "",
        // month: "",
        year: "",
      },
      formData: {
        branch_id: "",
        month: "",
        year: "",
        amount: "",
        description: "",
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      months: this.$store.state.months,
      years: this.$store.state.years,
      loading: false,
      pagination: {
        total: 0,
        per_page: 10,
        from: 1,
        to: 0,
        current_page: 1,
      },
      agents: [],
      loading: false,
    };
  },
  methods: {
    getAgentList() {
      this.loading = true;
      Cashflows.getAgentList().then((res) => {
        this.agents = res.data.data;
        this.loading = false;
        console.log(res.data.data);
      });
    },
    getDeductions(page) {
      this.loading = true;
      Cashflows.getDeductions(page).then((res) => {
        this.results = res.data;
        this.pagination = res;
        this.loading = false;
      });
    },
    saveDeduction() {
      console.log(this.formData);
      Cashflows.createDeductions(this.formData).then((res) => {
        if (res.success) {
          this.$swal("Success!", "Deduction added!", "success");
          this.$nuxt.$emit("refresh_deductions_list");
        } else {
          this.$swal("Error!", "An error occurred!", "error");
        }
      });
    },
    getFilteredDeduction() {
      this.loading = true;
      Cashflows.getDeductionsFilter(this.filterData).then((res) => {
        this.results = res;
        this.pagination = res;
        this.loading = false;
      });
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Deductions");
  },
  mounted() {
    this.getDeductions();
    this.getAgentList();
    this.$nuxt.$on("refresh_deductions_list", () => {
      this.getDeductions();
    });
  },
};
</script>

<style></style>
