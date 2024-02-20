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
          class="nav-link bg-white active"
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
        <div class="row">
          <div class="col-12">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-body">
                <form class="row" @submit.prevent="getCashOutFilter">
                  <div class="col-1 my-2">
                    <button
                      @click.prevent="showCashOutModal"
                      class="btn mt-4 btn-warning pull-right"
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i> Add
                    </button>
                  </div>
                  <div class="col-md-2 col-12">
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
                  <div class="col-md-3 mb-3">
                    <label for="">From</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white"
                          ><i class="fa fa-fw ti-calendar"></i
                        ></span>
                      </div>
                      <flat-pickr
                        v-model="filterData.start_date"
                        :config="config"
                        class="form-control"
                      ></flat-pickr>
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="">To</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white"
                          ><i class="fa fa-fw ti-calendar"></i
                        ></span>
                      </div>
                      <flat-pickr
                        v-model="filterData.end_date"
                        :config="config"
                        class="form-control"
                      ></flat-pickr>
                    </div>
                  </div>

                  <div class="col-md-2 col-12">
                    <div class="form-group mb-0">
                      <label class="font-weight-bold" for="exampleInputEmail1"
                        >Status</label
                      >
                      <select class="form-control" v-model="filterData.status">
                        <option value="">All</option>
                        <option value="1">Approved</option>
                        <option value="0">Pending</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-1 col-12 pt-2">
                    <button type="submit" class="btn btn-primary btn-sm mt-4">
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-header bg-transparent border-bottom-0">
                <h4 class="card-title text-dark">Cash Out</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Branch</th>
                        <!-- <th>Initiator</th> -->
                        <th>Amount</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(result, index) in results"
                        :key="index"
                        v-if="!loading"
                      >
                        <td>{{ formatDate(result.created_at, 'DD/MM/YYYY') }}</td>
                        <td>
                          {{
                            result.branch
                              ? result.branch.username: "Not Available"
                          }}
                        </td>
                        <!-- <td>{{ user }}</td> -->
                        <td>{{ result.amount }}</td>
                        <td>
                          {{ result.comment ? result.comment : "No Comment" }}
                        </td>
                        <td>
                          <span
                            class="btn btn-sm font-weight-bold"
                            style="font-size: 10px"
                            :class="
                              result.status == 1 ? 'btn-success' : 'btn-info'
                            "
                            >{{
                              result.status == 1 ? "Approved" : "Pending"
                            }}</span
                          >
                        </td>
                        <td>
                          <a
                            @click="deleteCashOut($event, result.id)"
                            v-if="!result.status"
                            id=""
                            class="btn btn-secondary btn-sm small p-1"
                            style="font-size: 12px"
                            href="#"
                            role="button"
                            ><i class="fa fa-trash"></i> Delete</a
                          >
                        </td>
                      </tr>
                      <tr v-if="!results.length && !loading">
                        <td colspan="7" align="center">No record found</td>
                      </tr>
                      <tr v-if="loading">
                        <td colspan="8" class="text-center">
                          <i class="fa fa-2x fa-spin fa-spinner"></i>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <new-cash-out-modal></new-cash-out-modal>
      </div>
    </div>
  </div>
</template>

<script>
import NewCashOutModal from "../../components/NewCashOutModal";
import CashOut from "../../services/cashflows";
export default {
  name: "cash_out",
  layout: "main",
  components: { NewCashOutModal },
  data() {
    return {
      title: "Cash Out",
      filterData: {
        status: "",
        branch_id: "",
        start_date: this.$moment().format("DD-MM-YYYY"),
        end_date: this.$moment().format("DD-MM-YYYY"),
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      results: [],
      agents: [],
      loading: false,
    };
  },
  methods: {
    showCashOutModal() {
      this.$bvModal.show("modal-1");
    },
    getAgentList() {
      this.loading = true;
      CashOut.getAgentList().then((res) => {
        this.agents = res.data.data;
        this.loading = false;
      });
    },

    getCashOut(page) {
      this.loading = true;
      CashOut.getCashOut(page).then((res) => {
        this.results = res.data;
        this.loading = false;
      });
    },

    getCashOutFilter(page) {
      this.loading = true;
      CashOut.getCashOutFilter(this.filterData, page).then((res) => {
        this.results = res.data;
        this.loading = false;
      });
    },
    deleteCashOut(e, id) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this item",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete item!",
          cancelButtonText: "No, keep item",
        })
        .then(
          (result) => {
            if (result.value) {
              CashOut.deleteCashOutId(id).then((res) => {
                if (res.success) {
                  $(e.target).closest("tr").remove();
                  self.$swal("Deleted!", "Item has been removed", "success");
                }
              });
            }
          },
          function (dismiss) {}
        );
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Cash Out");
  },
  mounted() {
    this.getCashOut(1);
    this.getAgentList();
    this.$nuxt.$on("refresh_cashout", () => {
      this.getCashOut(1);
    });
  },
};
</script>

<style></style>
