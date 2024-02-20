<template>
  <div>
    <nuxt-link
      to="/UserManagement/AddUser"
      class="btn btn-success text-white"
      style="margin-right: 10px"
    >
      <i class="fa fa-fw fa-plus"></i>
      New User
    </nuxt-link>
    <!-- <button class="btn btn-info">
            <i class="fa fa-fw fa-lock"></i>
            Permissions
        </button> -->
    <card title="Results" excel="true">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              v-if="users.length > 0"
              v-show="!loading"
            >
              <td>{{ user.username }}</td>
              <td>
                {{ user.first_name + " " + user.last_name }}
              </td>
              <td>{{ user.email }}</td>
              <td>Admin</td>
              <td>
                <nuxt-link :to="'/UserManagement/EditUser/' + user.id"
                  >Details</nuxt-link
                >
                |
                <a href="javascript:;" @click="openPermission(user)"
                  >Permissions</a
                >
                |
                <a href="javascript:;" @click="showPasswordModal(user.id)"
                  >Change Password</a
                >
              </td>
              <td class="text-center">
                <a href="javascript:;" @click="deleteUser($event, user.id)">
                  <i class="fa fa-fw fa-times text-danger"></i>
                </a>
              </td>
            </tr>
            <tr v-if="users.length < 1" v-show="!loading">
              <td colspan="6" class="text-center">
                <h4>No record found</h4>
              </td>
            </tr>
            <tr v-if="loading">
              <td colspan="6" class="text-center">
                <i class="fa fa-4x fa-spin fa-spinner"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
    <b-modal
      ref="permissions"
      hide-footer
      size="lg"
      title="Manage Permissions"
      no-close-on-backdrop
    >
      <div class="">
        <label for="">
          <input type="checkbox" v-model="selectAll" /> Select All
        </label>
      </div>
      <hr />
      <div class="row ml-0" v-if="permissions.length && !loading">
        <div
          class="col-md-4 p-2 mb-3"
          v-for="(permission, index) in permissions"
          :key="index"
        >
          <label for="">
            <input
              type="checkbox"
              name=""
              id=""
              :value="permission.id"
              v-model="selected"
            />
            <a href="javascript:;">{{ permission.name }}</a>
          </label>
        </div>
      </div>
      <b-button size="lg" id="save" variant="success" @click="savePermission">
        Save
      </b-button>
    </b-modal>
    <change-password></change-password>
  </div>
</template>
<script>
import users from "../../services/users";
import ChangePassword from "../../components/ChangePassword";
import { createUser, getUsers } from "../../plugins/queries.js";
export default {
  name: "usermanagement",
  layout: "main",
  data() {
    return {
      title: "User Management",
      users: [],
      roles: null,
      permissions: [],
      modalTitle: "",
      formData: {
        first_name: "",
        last_name: "",
        username: "",
        role_id: "",
        email: "",
        password: "",
        id: "",
      },
      loading: true,
      selected: [],
      user: null,
    };
  },
  components: {
    ChangePassword,
  },
  computed: {
    selectAll: {
      get: function () {
        return this.permissions
          ? this.selected.length == this.permissions.length
          : false;
      },
      set: function (value) {
        var selected = [];
        if (value) {
          this.permissions.forEach(function (permission) {
            selected.push(permission.id);
          });
        }
        this.selected = selected;
      },
    },
  },
  methods: {
    openPermission(user) {
      this.user = user;
      if (user.permissions.length) {
        user.permissions.forEach((permission) => {
          this.selected.push(permission.id);
        });
      }
      this.$refs.permissions.show();
    },
    showPasswordModal(user) {
      this.$nuxt.$emit("password_modal", user);
    },
    deleteUser(e, id) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this user",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete user!",
          cancelButtonText: "No, keep user",
        })
        .then((result) => {
          if (result.value) {
            users.deleteAdmin(id).then((res) => {
              if (res.success) {
                $(e.target).closest("tr").remove();
                self.$swal("Deleted!", "User has been removed", "success");
              }
            });
          } else {
          }
        });
    },
    savePermission() {
      if (this.selected.length) {
        $("#save").attr("disabled", true).text("Please wait...");
        this.$axios
          .post("/admin/settings/set-user-permissions", {
            user_id: this.user.id,
            permissions: this.selected,
          })
          .then((res) => {
            $("#save").attr("disabled", false).text("Save");
            if (res.data.success) {
              this.$toast.success("Permissions has been saved", {
                icon: "check",
              });
            } else {
              this.$toast.error("An error occured", { icon: "times" });
            }
          })
          .catch((err) => {
            $("#save").attr("disabled", false).text("Save");
            this.$toast.error("An error occured", { icon: "times" });
          });
      }
    },
    async getAllUsers() {
      await getUsers()
        .then((res) => {
          this.users = res.data;
          this.loading = false;
        })
        .catch(() => {
          this.users = [];
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
    store.dispatch("setTitle", "User Management");
  },
  async mounted() {
    await this.getAllUsers();
    // users
    //   .listAdmins()
    //   .then((res) => {
    //     this.users = res;
    //     this.loading = false;
    //   })
    //   .catch((err) => {
    //     this.loading = false;
    //     this.$toast.error("An error occured", { icon: "times" });
    //   });
    // $(this.$refs.userRef).on('hidden.bs.modal', () => {
    //     this.formData = {
    //         first_name: '',
    //         last_name: '',
    //         username: '',
    //         email: '',
    //         password: '',
    //         id: ''
    //     }
    // });
    // this.$axios.get("/admin/settings/permissions").then((res) => {
    //   this.permissions = res.data;
    // });
  },
};
</script>
