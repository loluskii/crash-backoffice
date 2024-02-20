<template>
  <b-modal
    hide-footer
    id="top-categories"
    :no-close-on-backdrop="true"
    title="Manage Top Categories"
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
            v-model="formData.name"
          />
        </div>
        <div class="col-md-4">
          <button
            class="button btn btn-primary mr-2"
            type="submit"
            id="saveCategory"
            name="button"
          >
            <i class="fa fa-check"></i>
          </button>

        </div>
      </div>
      <table class="table mt-2">
        <!-- {{ top_categories }} -->
        <thead>
          <th>s/n</th>
          <th>Name</th>
        </thead>
        <tr v-for="(category, index) in top_categories" :key="category.id">
          <td>{{ index+1 }}</td>
          <td>{{ category.name ? category.name : 'N/A' }}</td>
        </tr>
      </table>
    </form>
  </b-modal>
</template>
<script>
import Casino from "../../services/casino.js";
export default {
  name: "category-form",
  props: ["top_categories"],
  data() {
    return {
      sport: "",
      formData: {
        name: "",
      },
    };
  },
  methods: {
    async saveCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.formData.sport = this.sport.provider_id;
          $("#saveCategory").attr("disabled", true).text("Saving...");
          Casino.createTopCategory(this.formData)
            .then((res) => {
              $("#saveCategory").attr("disabled", false).text("Save");
              if (res.success) {
                this.notify({
                  message: "Saved",
                  title: "Success",
                  type: "success",
                });
              }
              this.formData.name = "";
              Casino.getTopCategories().then((res) => {
                this.top_categories = res;
              })
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
  },
  mounted() {
    this.$nuxt.$on("OPEN_TOP_CAT_MODAL", (id) => {
      this.$bvModal.show("top-categories");
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
