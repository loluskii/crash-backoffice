<template>
  <div class="row">
    <div class="col-md-10">
      <card :title="title">
        <form @submit.prevent="saveCasino" style="padding: 10px">
          <div class="form-group">
            <label for="">Provider</label>
            <select class="form-control" v-model="formData.provider_id">
              <option value="c27">C27</option>
            </select>
          </div>
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
            <label for="">Game ID</label>
            <input
              type="text"
              class="form-control"
              name=""
              v-model="formData.game_id"
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
              <label for="">Select Image</label>
              <div class="row">
                  <div class="col-md-4">
                      <img :src="formData.image_path" class="img-fluid mb-3">
                  </div>
              </div>
              <input type="file" v-on:change="onFileChange" id='fileInput' style="display: none">
              <button type="reset" class="btn btn-effect-ripple btn-default reset_btn" align="center" @click="selectFile">
                  Choose File
              </button>
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
              <option value="0">Inactive</option>
              <option value="1">Active</option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Game Description</label>
            <wysiwyg v-model="formData.description" />
          </div>
          <div class="row marginTop">
            <div class="col-6 col-md-6">
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
  name: "add-casino",
  layout: "main",
  components: {
    card,
  },
  data() {
    return {
      title: "Add New Casino Game",
      categories: [],
      formData: {
        title: "Fat Rabbit",
        game_id: "fatrabbit1_pg",
        description: "4x5 Reels, 25 Lines, Freespin, Freespin Buy",
        casino_category_id: null,
        provider_id: 'c27',
        type: "slots",
        status: '0',
        image_path: null,
      },
    };
  },
  methods: {
    saveCasino() {
      Casino.saveGame(this.formData).then((res) => {
        if (res.success) {
          this.$toast.success("Casino game has been saved!", { icon: "times" });
          this.$router.push("/Casino/Games");
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
      reader.onload = (e) => {
        this.formData.image_path = e.target.result;
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
  },
  head() {
    return {
      title: "Add New Casino Game",
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Add New Casino Game");
  },
};
</script>
