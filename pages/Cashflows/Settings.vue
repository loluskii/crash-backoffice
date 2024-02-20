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
          class="nav-link bg-white active"
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
          <div class="col-md-6">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div
                class="card-header border-bottom-0 d-flex justify-content-between bg-transparent"
              >
                <h4 class="text-dark mb-0">Expense Type</h4>
                <button
                  @click="showExpenseTypeModal"
                  class="btn btn-sm btn-success mr-2"
                >
                  New Expense Type
                </button>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped table-borderless">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <!-- <th>Fixed</th> -->
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(type, index) in types" :key="index">
                        <td>{{ type.title }}</td>
                        <td>{{ type.category ? type.category.title : type.category_id }}</td>
                        <!-- <td>
                          <input
                            type="checkbox"
                            class=""
                            name="fixed"
                            id=""
                            disabled
                          />
                        </td> -->
                        <td>{{ type.amount }}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-info btn-dark btn-xs"
                          >
                            <i class="fa fa-edit"></i>
                          </button>
                        </td>
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
          <div class="col-md-6">
            <div class="card shadow-sm" style="border-top: 3px solid #d2d6de">
              <div
                class="card-header border-bottom-0 d-flex justify-content-between bg-transparent"
              >
                <h4 class="text-dark mb-0">Expense Category</h4>
                <button
                  @click="showExpenseCategoryModal"
                  class="btn btn-sm btn-success"
                >
                  New Expense Category
                </button>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped table-borderless">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-for="(category, index) in categories" :key="index">
                        <td>{{ category.title }}</td>
                        <td>{{ category.description }}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-info btn-dark btn-xs"
                          >
                            <i class="fa fa-edit"></i>
                          </button>
                        </td>
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
        </div>
        <expense-category-modal ></expense-category-modal>
        <expense-type-modal></expense-type-modal>
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseCategoryModal from "../../components/ExpenseCategoryModal";
import ExpenseTypeModal from "../../components/ExpenseTypeModal";
import Category from "../../services/cashflows";
export default {
  name: "settings",
  layout: "main",
  components: {
    ExpenseCategoryModal,
    ExpenseTypeModal,
  },
  data() {
    return {
      title: "Settings",
      categories: [],
      types: [],
      loading: false,
    };
  },
  methods: {
    getCategory() {
      this.loading = true;
      Category.getExpenseCategory().then((res) => {
        // console.log(res)
        this.categories = res.data;
        this.loading = false;
      });
    },
    getType() {
      this.loading = true;
      Category.getExpenseType().then((res) => {
        console.log(res)
        this.types = res.data;
        this.loading = false;
      });
    },
    showExpenseTypeModal() {
      this.$bvModal.show("expense-type");
    },
    showExpenseCategoryModal() {
      this.$bvModal.show("expense-category");
    },
  },
  mounted() {
    this.getCategory();
    this.getType();
    this.$nuxt.$on("refresh_category", () => {
      this.getCategory();
    });
    this.$nuxt.$on("refresh_type", () => {
      this.getType();
    });
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Settings");
  },
};
</script>

<style></style>
