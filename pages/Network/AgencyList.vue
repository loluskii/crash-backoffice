<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
        <select
          name=""
          class="form-control"
          id=""
          v-model="searchData.agent_type"
        >
          <option value="">All</option>
          <option :value="role.id" v-for="(role, index) in roles" :key="index">
            {{ role.name }}
          </option>
        </select>
      </div>
      <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
        <select
          name="country"
          id="country"
          v-model="searchData.state_id"
          class="form-control"
        >
          <option value="">All States</option>
          <option
            :value="state.id"
            v-for="(state, index) in states"
            :key="index"
          >
            {{ state.name }}
          </option>
        </select>
      </div>
      <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
        <div class="input-group input_height">
          <input
            type="text"
            class="form-control mr-3"
            v-model="searchData.search"
            placeholder="Search by First name or last name"
          />
          <span class="input-group-btn">
            <button
              class="btn btn-warning right_btn"
              @click="getResults(1)"
              type="button"
            >
              Go!
            </button>
          </span>
        </div>
      </div>
    </div>
    <card title="Results">
      <div class="table-responsive">
        <table class="table table-bordered table-striped" v-if="!loading">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Agent Type</th>
              <th>Status</th>
              <!-- <th>Trust User</th> -->
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index">
              <td>
                <nuxt-link :to="'/Network/Agent/' + result.id">
                  {{ result.user.username }}
                </nuxt-link>
              </td>
              <td>
                <nuxt-link :to="'/Network/Agent/' + result.id">
                  {{ result.first_name + " " + result.last_name }}
                </nuxt-link>
              </td>
              <td>{{ result.user_type }}</td>
              <td>{{ result.status === 1 ? "Active" : "Inactive" }}</td>
              <!-- <td>{{ formatNumber(result.trust_balance) }}</td> -->
              <td>
                <!-- top up user -->
                <a
                  href=""
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Top Up"
                  class="text-success"
                  @click.prevent="openTransferModal(result)"
                >
                  <i class="fa fa-dollar text-success"></i>
                </a>
                |

                <!-- edit user
                <a
                  href="javascript:;"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit User"
                  class="text-info"
                  @click="openEditModal(result, 2, index)"
                >
                  <i class="fa fa-pencil"></i>
                </a>
                | -->

                <!-- change password -->
                <a
                  href="javascript:;"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Change Password"
                  class="text-secondary"
                  @click="openPasswordModal(result, 2, index)"
                  v-if="result.status !== 2"
                >
                  <i class="fa fa-lock"></i>
                </a>
                |

                <!-- Deactivate user -->
                <a
                  href="javascript:;"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Deactivate"
                  class="text-danger"
                  @click="updateStatus(result, 1, index)"
                  v-if="result.status == 1"
                >
                  <i class="fa fa-times-circle"></i>
                </a>

                <!-- Activate user -->
                <a
                  href="javascript:;"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Activate"
                  class="text-success"
                  @click="updateStatus(result, 1, index)"
                  v-if="result.status !== 1"
                >
                  <i class="fa fa-check"></i>
                </a>
              </td>
              <transferModal :user="result"></transferModal>
            </tr>
          </tbody>
        </table>
        <div style="width: 100%" v-if="loading" class="text-center">
          <i class="fa fa-spin fa-spinner fa-4x"></i>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm-12 col-md-7">
          <div
            class="dataTables_paginate paging_simple_numbers pull-right"
            id="sample_1_paginate"
          >
            <paginate
              v-bind:pagination="pagination"
              v-on:click.native="getResults(pagination.current_page)"
              :offset="4"
            >
            </paginate>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import card from "../../components/card.vue";
import Agents from "../../services/agents";
import transferModal from "../../components/modals/transfer-funds";
import { getAgents } from "../../plugins/queries";

export default {
  name: "agents",
  layout: "main",
  components: {
    card,
    transferModal,
  },
  data() {
    return {
      title: "Agency List",
      results: [],
      searchData: {
        search: "",
        agent_type: "",
        state_id: "",
      },
      data: {
        username: "",
        opening_balance: "",
        id: "",
      },
      roles: [],
      row_index: "",
      loading: false,
      currency: this.$store.state.currencySymbol,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      },
      offset: 4,
      selected: [],
      states: [],
    };
  },
  methods: {
    formatNumber(number) {
      return this.numberFormat(this.currency, number);
    },
    openEditModal() {
      console.log("sdfsdf");
      this.$refs.edit_user.show();
    },
    openTransferModal(user) {
      console.log(user);
      this.$bvModal.show("transfer_funds" + user.id);
    },
    showForm(id, i) {
      this.data.id = id;
      this.row_index = i;
      this.$refs.activate.show();
    },
    activate() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          $("#saveBtn").attr("disabled", true).text("Activating...");
          this.$axios
            .post("/admin/agent-management/activate", this.data)
            .then((res) => {
              $("#saveBtn").attr("disabled", false).text("Save");
              if (res.data.success) {
                this.results.splice(this.row_index, 1);
                this.$toast.success(res.data.message, { icon: "check" });
              } else {
                this.$toast.error(
                  "Something went wrong. Unable to activate agent!",
                  { icon: "check" }
                );
              }
            })
            .catch((err) => {
              $("#saveBtn").attr("disabled", false).text("Save");
              this.$toast.error("Internal server error!", { icon: "check" });
            });
        }
      });
    },
    async getResults() {
      this.loading = true;
      await getAgents()
        .then((res) => {
          this.results = res.data;
          this.loading = false;
        })
        .catch(() => {
          this.results = [];
          this.loading = false;
          // alert('an err')
        });
    },
    updateStatus(agent, action, index) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          // text: 'You will not be able to recover this item',
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes!",
          cancelButtonText: "No",
        })
        .then(
          (result) => {
            if (result.value) {
              Agents.updateStatus(agent.id, action).then((res) => {
                if (res.success) self.results[index].status = action;
              });
            }
          },
          function (dismiss) {}
        );
    },
    deleteAgent(e, agent_id) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this agent",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete item!",
          cancelButtonText: "No, keep item",
        })
        .then(
          (result) => {
            if (result.value) {
              self.$axios
                .get("/agent-management/agent/" + agent_id + "/delete")
                .then((res) => {
                  if (res.data.success) {
                    $(e.target).closest("tr").remove();
                    self.$swal("Deleted!", "Agent has been removed", "success");
                  }
                });
            }
          },
          function (dismiss) {}
        );
    },
    calculateAvailability(n1, n2) {
      return this.formatNumber(parseFloat(n1) - parseFloat(n2));
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Agency List");
  },
  async mounted() {
    await this.getResults();
    // this.$axios.get("/admin/settings/agent-roles").then((res) => {
    //   this.roles = res.data;
    // });
    // this.$axios.get("/admin/utilities/get-country-states").then((res) => {
    //   this.states = res.data.states;
    // });
  },
};
</script>
