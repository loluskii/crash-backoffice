<template>
  <div class="row">
    <div class="col-md-10">
      <card :title="title">
        <form @submit.prevent="saveCasino" style="padding: 10px">
          <div class="form-group">
            <label for="">Title</label>
            <input
              type="text"
              class="form-control"
              name=""
              v-model="formData.title"
            />
          </div>
          <div class="form-group">
            <label for="">Category</label>
            <select class="form-control" v-model="formData.casino_category_id">
              <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Type</label>
            <select class="form-control" v-model="formData.type">
              <option value="slots">Slots</option>
              <option value="casino">Casino</option>
              <option value="live_casino">Live Casino</option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Status</label>
            <select class="form-control" v-model="formData.status">
              <option value="1">Active</option>
              <option value="0">Deactivate</option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Game Description</label>
            <wysiwyg v-model="formData.description" />
          </div>
          <div class="form-group">
            <label for="">Select Image</label>
            <div class="row">
              <div class="col-md-4">
                <img :src="formData.image_path" class="img-fluid" />
              </div>
            </div>
            <input
              type="file"
              v-on:change="onFileChange"
              id="fileInput"
              style="display: none"
            />
            <button
              type="reset"
              class="btn btn-effect-ripple btn-default reset_btn"
              align="center"
              @click="selectFile"
            >
              Choose File
            </button>
          </div>

          <div class="row marginTop">
            <div class="col-6 col-md-6">
              <input type="hidden" name="id" v-model="formData.id" />
              <button
                type="submit"
                id="saveBtn"
                class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                tabindex="7"
              >
                Save
              </button>
            </div>
            <div class="col-6 col-md-6">
              <router-link
                to="/Casino/Games"
                class="btn btn-default btn-block btn-md btn-responsive"
              >
                Cancel
              </router-link>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>
<script>
import Casino from "../../../services/casino.js";
import card from "../../../components/card.vue";
import axios from "~/plugins/axios";

export default {
  scrollToTop: true,
  name: "edit-casino",
  layout: "main",
  components: {
    card,
  },
  data() {
    return {
      title: "Edit Casino Game",
      categories: [],
      formData: {
        id: "",
        title: "",
        game_id: "",
        description: "",
        casino_category_id: null,
        provider_id: "C27",
        type: "",
        status: "",
        image_path: null,
      },
    };
  },
  methods: {
    saveCasino() {
      Casino.saveGame(this.formData).then((res) => {
        if (res.success) {
          this.$toast.success("Game has been saved!", { icon: "times" });
          this.$router.push({
            path: "/Casino/Games",
            query: { id: this.formData.casino_category_id },
          });
        } else {
          this.$toast.error("An error occured", { icon: "times" });
        }
      });
    },
    selectFile(e) {
      e.preventDefault();
      $("#fileInput").trigger("click");
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.formData.image_path = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    axios
      .get("/api/admin/casino/categories")
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error.data);
      });
    let id = this.$route.params.Game;
    if (id) {
      Casino.getGame(id).then((res) => {
        this.formData.title = res.data.title;
        this.formData.game_id = res.data.game_id;
        this.formData.status = res.data.status;
        this.formData.type = res.data.type;
        this.formData.description = res.data.description;
        this.formData.image_path = res.data.image_path;
        this.formData.casino_category_id = res.data.casino_category_id;
        this.formData.id = res.data.id;
      });
    }
  },
  head() {
    return {
      title: "Edit Casino Game",
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Edit Casino Game");
  },
};
</script>
