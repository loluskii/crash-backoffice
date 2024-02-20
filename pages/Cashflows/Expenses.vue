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
          class="nav-link bg-white active"
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
                <form class="row">
                  <div class="col-md-1 pt-2">
                    <button
                      @click.prevent="showExpensesModal"
                      class="btn btn-warning mt-4 pull-right"
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i> Add
                    </button>
                  </div>
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
                      <select class="form-control" v-model="filterData.status">
                        <option value="">Select...</option>
                        <option value="1">Approved</option>
                        <option value="2">Pending</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2 col-12 pt-1">
                    <button class="btn btn-primary btn-lg mt-4">Apply</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div class="card-header bg-transparent border-bottom-0">
                <h4 class="card-title text-dark">Expense</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <!-- <th>Date</th> -->
                        <th>Expense</th>
                        <th>Branch</th>
                        <th>User</th>
                        <th>Amount</th>

                        <th>Status</th>
                        <th>Approved By</th>
                        <th>Approved At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(expense, index) in expenses" :key="index">
                        <!-- <td>{{ expense.date }}</td> -->
                        <!-- <td></td> -->
                        <td>
                          {{
                            expense.expense_type
                              ? expense.expense_type.title
                              : expense.expense_type_id
                          }}
                        </td>
                        <td>
                          <span v-if="expense.branch"
                            >{{ expense.branch.email }}</span
                          >
                          <!-- <span v-else>{{ expense.branch_id }}</span> -->
                        </td>
                        <td>
                          {{
                            expense.branch
                              ? expense.branch.username
                              : "Not Available"
                          }}
                        </td>
                        <td>{{ expense.amount }}</td>

                        <td>
                          {{ expense.status === 0 ? "Pending" : expense.status === 1 ? "Approved" : "Rejected"  }}
                        </td>
                        <td>
                          {{
                            expense.approved_by
                              ? expense.approved_by.username
                              : "Not Available"
                          }}
                        </td>
                        <td>
                          {{
                            expense.approved_at
                              ? expense.approved_at
                              : "Not Approved"
                          }}
                        </td>
                        <td>
                          <a
                            href="javascript:;"
                            @click="deleteExpense($e, expense.id)"
                            class="btn btn-warning btn-sm"
                            ><i class="fa fa-trash"></i
                          ></a>
                          <a
                            href="javascript:;"
                            @click="updateExpense(expense.id,'approve',expense)"
                            v-if="expense.status == 0"
                            class="btn btn-success btn-sm"
                            ><i class="fa fa-check"></i
                          ></a>
                          <a
                            href="javascript:;"
                            @click="updateExpense(expense.id,'reject',expense)"
                            v-if="expense.status == 0"
                            class="btn btn-danger btn-sm"
                            ><i class="fa fa-times"></i
                          ></a>
                        </td>
                      </tr>
                      <tr v-if="!expenses.length && !loading">
                        <td colspan="9" class="text-center">
                          No Data Available
                        </td>
                      </tr>
                      <tr v-if="loading">
                        <td colspan="9" class="text-center">
                          <i class="fa fa-2x fa-spin fa-spinner"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <new-expense-modal></new-expense-modal>
      </div>
    </div>
  </div>
</template>

<script>
import NewExpenseModal from "../../components/NewExpenseModal.vue";
import Expenses from "../../services/cashflows";
export default {
  name: "expenses",
  layout: "main",
  components: { NewExpenseModal },
  data() {
    return {
      title: "Expenses",
      filterData: {
        branch_id: "",
        status: "",
        date: this.$moment().format("DD-MM-YYYY"),
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      expenses: [],
      agents: [],
      loading: false,
    };
  },
  methods: {
    showExpensesModal() {
      this.$bvModal.show("expenseModal");
    },
    getAgentList() {
      this.loading = true;
      Expenses.getAgentList().then((res) => {
        this.agents = res.data.data;
        this.loading = false;
        // console.log(res.data.data);
      });
    },
    getExpenses() {
      this.loading = true;
      Expenses.getExpense().then((res) => {
        this.expenses = res.data;
        this.loading = false;
      });
    },
    updateExpense(id,status, expense) {
      const payload = {
        expense_type_id: expense.expense_type_id,
        branch_id: expense.branch_id,
        amount: expense.amount,
        comment: expense.comment,
      }
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes!",
          cancelButtonText: "No ",
        })
        .then((result) => {
          if (result.value) {
            Expenses.updateExpenseStatus(id,status, payload).then((res) => {
              console.log(res);
              if (res.success) {
                // $(e.target).closest("tr").remove();
                self.$swal("Updated!", "Item has been updated", "success");
                this.$nuxt.$emit("refresh_expenses");
              }
            });
          } else {
          }
        });
    },
    deleteExpense(e, id) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete!",
          cancelButtonText: "No, keep ",
        })
        .then((result) => {
          if (result.value) {
            Expenses.deleteExpense(id).then((res) => {
              console.log(res);
              if (res.success) {
                // $(e.target).closest("tr").remove();
                self.$swal("Deleted!", "Item has been removed", "success");
                this.$nuxt.$emit("refresh_expenses");
              }
            });
          } else {
          }
        });
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Expenses");
  },
  mounted() {
    this.getExpenses();
    this.getAgentList();
    this.$nuxt.$on("refresh_expenses", () => {
      this.getExpenses();
    });
  },
};
</script>

<style></style>
