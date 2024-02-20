<template>
  <div>
    <ul class="nav nav-tabs mt-2 mb-4" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
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
          class="nav-link bg-white active"
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
                <form class="row" @submit.prevent="getFilteredCashIn(1)">
                  <div class="col-md-1">
                    <button
                      @click.prevent="showCashInModal"
                      class="mt-4 btn btn-warning pull-right"
                    >
                      <i class="fa fa-plus-circle"></i> Add
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
                  <div class="col-md-1 col-12 pl-0 pt-2">
                    <button class="btn btn-primary mt-4">
                      <i class="fa fa-search" aria-hidden="true"></i> Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-header bg-transparent border-bottom-0">
                <h4 class="card-title text-dark">Cash In</h4>
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
                              ? result.branch.username : "Not Available"
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
                            :class="result.status == 1 ? 'btn-success' : result.status == 1 ? 'btn-danger' : 'btn-secondary' "
                            >{{
                              result.status == 1 ? 'Approved' : result.status == 2 ? 'Rejected' : 'Pending'
                            }}</span
                          >
                        </td>
                        <td>
                          <a
                            @click="updateCashIn(result.id, 'approve', result)"
                            v-if="result.status == 0"
                            id=""
                            class="btn btn-success btn-sm small p-1"
                            style="font-size: 12px"
                            href="#"
                            role="button"
                            ><i class="fa fa-check"></i>Approve</a
                          >
                          <a
                            @click="updateCashIn(result.id,'reject', result)"
                            v-if="result.status == 0"
                            id=""
                            class="btn btn-warning btn-sm small p-1"
                            style="font-size: 12px"
                            href="#"
                            role="button"
                            ><i class="fa fa-times"></i>Reject</a
                          >
                          <a
                            @click="deleteCashIn(result.id)"
                            id=""
                            class="btn btn-danger btn-sm small p-1"
                            style="font-size: 12px"
                            href="#"
                            role="button"
                            ><i class="fa fa-trash"></i>Delete</a
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
        <new-cash-in-modal></new-cash-in-modal>
      </div>
    </div>
  </div>
</template>

<script>
import NewCashInModal from "../../components/NewCashInModal";
import CashIn from "../../services/cashflows";
export default {
  name: "cash_in",
  layout: "main",
  components: {
    NewCashInModal,
  },
  data() {
    return {
      title: "Cash In",
      filterData: {
        start_date: this.$moment().format("DD-MM-YYYY"),
        end_date: this.$moment().format("DD-MM-YYYY"),
        status: "",
        branch_id: "",
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      loading: false,
      results: [],
      agents: [],
    };
  },
  methods: {
    showCashInModal() {
      this.$bvModal.show("modal-1");
    },
    getAgentList() {
      this.loading = true;
      CashIn.getAgentList().then((res) => {
        this.agents = res.data.data;
        this.loading = false;
      });
    },
    getCashIn() {
      this.loading = true;
      CashIn.getCashIn().then((res) => {
        if (res.success) {
          this.results = res.data;
          this.loading = false;
        } else {
          this.$swal("Unable to fetch!", "error");
        }
      });
    },
    getFilteredCashIn(page) {
      this.loading = true;
      CashIn.getCashIn().then((res) => {
        if (res.success) {
          this.results = res.data;
          this.loading = false;
        } else {
          this.$swal("Unable to fetch!", "error");
        }
      });
      // CashIn.getCashInFilter(this.filterData, page).then((res) => {
      //   if (res.success) {
      //     this.results = res.data;
      //     this.loading = false;
      //   } else {
      //     this.$swal("Unable to fetch!", "error");
      //   }
      // });
    },
    updateCashIn(id, status, data){
      this.loading = true;
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to undo this action",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No, keep item",
        })
        .then(
          (result) => {
            if (result.value) {
              this.$axios.post(`api/cash-in/update/${id}/${status}`, data).then((res) => {
                if (res.success) {
                  this.results = res.data;
                  this.loading = false;
                  self.$swal("Success!", "Item has been updated", "success");
                }else {
                  this.$swal("Unable to fetch!", "error");
                }
              }).catch(err => {
                console.log(err)
                this.$swal("Error!","An Error Occurred!",'error' );
              });
            }
          },
          function (dismiss) {}
        );
    },
    deleteCashIn(e, id) {
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
              CashIn.deleteCashInId(id).then((res) => {
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
    store.dispatch("setTitle", "Cash In");
  },
  mounted() {
    this.getCashIn();
    this.getAgentList();

    this.$nuxt.$on("refresh_cashin", () => {
      this.getCashIn();
    });
  },
};
</script>

<style></style>
