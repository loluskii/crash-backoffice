<template>
  <div class="row mt-2">
    <div class="col-lg-8 masonry-item">
      <card title="User Roles" :padding="false">
        <table class="table table-striped">
          <thead>
            <th>Name</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(role, index) in roles" :key="index" v-if="roles.length">
              <td>{{ role.name }}</td>
              <td>
                <a href="javascript:;" @click="edit(role)">Edit</a> |
                <!-- <a href="javascript:;" @click="openPermission(role)"
                  >Permissions</a
                > -->

                <a href="javascript:;" @click="deletRole($event, role.id)"
                  >Delete</a
                >
              </td>
            </tr>
            <tr v-if="!roles.length" v-show="!loading">
              <td colspan="4" class="text-center">
                <h4>No record found</h4>
              </td>
            </tr>
            <tr v-if="loading">
              <td colspan="4" class="text-center">
                Loading Please wait....
              </td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
    <!-- End Panel Tickets -->
    <div class="col-lg-4 masonry-item">
      <!-- Panel Subscribe -->
      <card title="Add/Edit Role" :padding="true">
        <form @submit.prevent="saveRole" id="form">
          <div class="form-group form-material">
            <input
              type="text"
              name="name"
              v-validate="'required'"
              class="form-control"
              v-model="formData.name"
              :class="{ input: true, 'is-danger': errors.has('name') }"
              autocomplete="off"
              placeholder="Name"
            />
            <i
              v-show="errors.has('name')"
              class="fa fa-warning text-danger"
            ></i>
            <span
              v-show="errors.has('name')"
              class="help is-danger text-danger"
              >{{ errors.first("name") }}</span
            >
          </div>
          <div class="form-group">
            <input type="hidden" v-model="formData.id" value="" />
            <button type="submit" class="btn btn-primary mr-2" id="save">
              Save
            </button>
            <button type="reset" class="btn btn-default" @click="resetForm">
              Cancel
            </button>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: "site_menu",
  layout: "main",
  scrollToTop: true,
  props: ["roles", "loading"],
  data() {
    return {
      scrollToTop: true,
      formData: {
        name: "",
      },
    };
  },
  methods: {
    openPermission(role) {
      this.$nuxt.$emit("MANAGE_PERMISSION", role);
    },
    saveRole: function saveRole() {
      $("#save").attr("disabled", true);
      this.$axios
        .post("/roles", this.formData)
        .then((res) => {
          if (res.data.success) {
            $("#save").attr("disabled", false);
            if (this.formData.id == "") {
              this.$toast.success("New role has been added successfully.", {
                icon: "check",
              });
              this.$nuxt.$emit("NEW_ROLE", res.data.role);
              this.resetForm();
            } else {
              this.$toast.success("Role has been updated.", {
                icon: "check",
              });
              // this.$nuxt.$emit("UPDATE_ROLE", res.data.roles);
            }
          } else {
            $("#save").attr("disabled", false);
            this.$toast.error("An error occured", { icon: "times" });
          }
        })
        .catch((err) => {
          $("#save").attr("disabled", false);
          this.$toast.error("An error occured", { icon: "times" });
        });
    },
    edit(role) {
      this.formData.name = role.name;
      this.formData.id = role.id;
    },
    deletRole(e, id) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this item",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete role!",
          cancelButtonText: "No, keep role",
        })
        .then((result) => {
          if (result.value) {
            this.$axios
              .delete("/roles/" + id)
              .then((res) => {
                if (res.data.success) {
                  $(e.target).closest("tr").remove();
                  self.$swal("Deleted!", "Role has been removed", "success");
                }
              });
          } else {
          }
        });
    },
    resetForm() {
      this.formData = {
        name: "",
        discription: "",
        role_type: "",
        id: "",
      };
    },
  },
};
</script>

<style lang="css"></style>
