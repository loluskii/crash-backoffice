<template>
  <b-modal
    hide-footer
    id="categories"
    :no-close-on-backdrop="true"
    title="Manage Categories"
    ref="categories"
  >
    <form
      class="form-horizontal columns column is-multiline is-12"
      id="cat-form"
      role="form"
      @submit.prevent="saveCategory"
    >
      <div class="row form-group">
        <div class="col-md-4">
          <label
            for="category_name"
            class="control-label float-md-right txt_media1"
          >
            Name
            <span class="text-danger">*</span>
          </label>
        </div>
        <div class="col-md-4">
          <input
            type="text"
            v-validate="'required'"
            class="form-control"
            name="category_name"
            id="category_name"
            v-model="formData.category_name"
          />
          <i
            v-show="errors.has('category_name')"
            class="fa fa-warning text-danger"
          ></i>
          <span
            v-show="errors.has('category_name')"
            class="help is-danger text-danger"
            >Please enter a name</span
          >
        </div>
        <div class="col-md-4">
          <input
            type="hidden"
            value=""
            name="category_id"
            v-model="formData.id"
          />
          <button
            class="button btn btn-primary mr-2"
            type="submit"
            id="saveCategory"
            name="button"
          >
            <i class="fa fa-check"></i>
          </button>
          <button
            class="button btn btn-secondary"
            type="button"
            name="button"
            @click="resetForm"
          >
            <i class="fa fa-refresh"></i>
          </button>
        </div>
      </div>
      <table class="table mt-2">
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>
            <div class="btn-group btn-sm">
              <button
                type="button"
                class="btn btn-sm btn-info"
                @click="edit(category)"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="deleteCat(category.id, index)"
              >
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
          </td>
        </tr>
      </table>
    </form>
  </b-modal>
</template>
<script>
import Casino from "../../services/casino.js";
export default {
  name: "category-form",
  props: {
    categories: Array,
  },
  data() {
    return {
      sport: "",
      formData: {
        category_name: "",
      },
    };
  },
  methods: {
    resetForm() {
      this.formData.category_name = "";
      this.formData.id = "";
    },
    edit(category) {
      this.formData.category_name = category.name;
      this.formData.id = category.id;
    },
    async saveCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.formData.sport = this.sport.provider_id;
          $("#saveCategory").attr("disabled", true).text("Saving...");
          Casino.saveCategory(this.formData)
            .then((res) => {
              $("#saveCategory").attr("disabled", false).text("Save");
              if (res.success) {
                this.notify({
                  message: "Saved",
                  title: "Success",
                  type: "success",
                });
                if (this.formData.id !== "") {
                  this.$nuxt.$emit("CATEGORY_SAVED", res.category);
                } else {
                }
              }
              this.resetForm();
            })
            .catch((error) => {
              this.notify({
                message: error.message,
                title: "Error",
                type: "error",
              });
              $("#saveCategory").attr("disabled", false).text("Save");
            });
        }
      });
    },
    deleteCat(id, i) {
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
        .then((result) => {
          if (result.value) {
            Casino.deleteCategory(id).then((res) => {
              if (res.success) {
                // $(e.target).closest('tr').remove();
                this.$nuxt.$emit("CATEGORY_REMOVED", i);
                this.notify({
                  message: "Item has been removed",
                  title: "Deleted!",
                  type: "success",
                });
              } else {
                self.$swal("Error!", msg, "error");
              }
            });
          } else {
          }
        });
    },
  },
  mounted() {
    this.$nuxt.$on("OPEN_CAT_MODAL", (id) => {
      this.$bvModal.show("categories");
    });
  },
  notifications: {
    notify: {
      title: "",
      message: "",
      type: "",
    },
  },
};
</script>
