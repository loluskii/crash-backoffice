<template>
  <div class="row">
    <div class="col-lg-6 masonry-item">
      <card title="Top Casino Games" :padding="true">
        <ul class="list-group list-group-dividered list-group-full h-350">
          <div data-role="container">
            <div data-role="content" v-if="!loading">
              <li
                class="list-group-item"
                v-for="(top, index) in filteredTopGames"
                :key="index"
              >
                <p>
                  <a class="hightlight" href="javascript:void(0)">{{
                    top.casino_category.name + " -> " + top.title
                  }}</a>
                </p>
                <small>
                  <a
                    class="hightlight text-danger"
                    href="javascript:void(0)"
                    @click="destroy($event, top.id)"
                  >
                    <span><i class="icon md-delete"></i>Remove</span>
                  </a>
                </small>
              </li>
            </div>
          </div>
          <div class="text-center" v-if="loading">
            <i class="fa fa-spin fa-spinner fa-2x"></i>
          </div>
          <p
            class="text-center mb-0"
            v-if="!loading && !filteredTopGames.length"
          >
            No Top Games
          </p>
        </ul>
      </card>
    </div>
    <!-- End Panel Tickets -->
    <div class="col-lg-6 masonry-item">
      <!-- Panel Subscribe -->
      <card title="Add Game to Top Games" :padding="true">
        <form
          class="form-horizontal columns column is-multiline is-12"
          role="form"
          @submit.prevent="save"
        >
          <div class="row">
            <div class="col-md-4">
              <label
                for="input-text"
                class="control-label float-md-right txt_media1"
              >
                Choose Top Category
              </label>
            </div>
            <div class="col-md-8">
              <select
                class="form-control mb-3"
                v-model="formData.top_casino_category_id"
                @change="filterGames"
              >
                <option value=""></option>
                <template v-for="(top, index) in topcategories">
                  <option :value="top.id">{{ top.name }}</option>
                </template>
              </select>
              <!-- <v-select
                label="name"
                v-validate="'required'"
                v-on:input="setGames"
                placeholder="Select Category"
                :options="categories"
              ></v-select> -->
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-4">
              <label
                for="input-text"
                class="control-label float-md-right txt_media1"
              >
                Choose Category
              </label>
            </div>
            <div class="col-md-8">
              <v-select
                label="name"
                v-validate="'required'"
                v-on:input="setGames"
                placeholder="Select Category"
                :options="categories"
              ></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-4">
              <label
                for="input-text"
                class="control-label float-md-right txt_media1"
              >
                Select Game
              </label>
            </div>
            <div class="col-md-8">
              <!-- <v-select
                label="title"
                v-validate="'required'"
                placeholder="Select Game"
                :options="games"
                v-on:input="setGameId"
                name="title"
              ></v-select> -->
              <div class="form-group">
                <select class="form-control" v-model="formData.casino_id" id="">
                  <template v-for="game in games">
                    <option :value="game.id">{{ game.title }}</option>
                  </template>
                </select>
              </div>
              <i
                v-show="errors.has('category')"
                class="fa fa-warning text-danger"
              ></i>
              <span
                v-show="errors.has('category')"
                class="help is-danger text-danger"
                >{{ errors.first("category") }}</span
              >
            </div>
          </div>
          <div class="row form-group d-none">
            <div class="col-md-4">
              <label
                for="input-text"
                class="control-label float-md-right txt_media1"
              >
                Show on Web
              </label>
            </div>
            <div class="col-md-8">
              <select
                name="home_screen"
                id="home_screen"
                class="form-control"
                v-model="formData.home_screen"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div class="row form-group d-none">
            <div class="col-md-4">
              <label
                for="input-text"
                class="control-label float-md-right txt_media1"
              >
                Show on Mobile
              </label>
            </div>
            <div class="col-md-8">
              <select
                name="side_menu"
                id="side_menu"
                class="form-control"
                v-model="formData.side_menu"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div class="column is-6">
            <div class="control text-center">
              <button
                class="button btn btn-primary btn-block"
                type="submit"
                id="saveBtn"
                name="button"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import CMS from "../../services/cms";
import card from "../../components/card.vue";
import Casino from "../../services/casino.js";

export default {
  name: "top_bets",
  layout: "main",
  scrollToTop: true,
  components: {
    card,
  },
  data() {
    return {
      title: "Top Games",
      loading: true,
      topgames: [],
      filteredTopGames: [],
      categories: [],
      topcategories: [],
      games: [],
      formData: {
        casino_id: null,
        top_casino_category_id: null,
      },
    };
  },
  methods: {
    save() {
      $("#saveBtn").attr("disabled", true);
      Casino.createTopGame(this.formData).then((res) => {
        if (res.success) {
          $("#saveBtn").attr("disabled", false);
          this.getTop();
          this.$toast.success("Success!", { icon: "times" });
          this.formData = {
            casino_id: null,
          };
        } else {
          $("#saveBtn").attr("disabled", false);
          this.$toast.error("An error occured", { icon: "times" });
        }
      });
    },
    destroy(e, id) {
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, remove item!",
          cancelButtonText: "No, keep item",
        })
        .then((result) => {
          if (result.value) {
            Casino.deleteTopGame(id).then((res) => {
              if (res.success) {
                $(e.target).closest("li").remove();
                self.$swal("Deleted!", "Item has been removed", "success");
              }
            });
          } else {
          }
        });
    },
    setGames(e) {
      Casino.getGamesByCategory(e.id).then((res) => {
        this.games = res.data;
      });
    },
    getTop() {
      this.loading = true;
      Casino.getTopCategories().then((res) => {
        this.topcategories = res;
        Casino.getTopGames().then((res1) => {
          this.topgames = res1.data;
          this.filteredTopGames = res1.data;
          this.loading = false;
        });
      });
    },
    filterGames() {
      this.filteredTopGames = this.topgames;
      const selectedTopCategory = this.topcategories.find(
        (category) => category.id === this.formData.top_casino_category_id
      );

      if (selectedTopCategory) {
        const casinoId = selectedTopCategory.games[0]?.casino_id;
        console.log(casinoId);
        if (casinoId) {
          this.filteredTopGames = this.filteredTopGames.filter(
            (game) => game.casino_id === casinoId
          );
        } else {
          this.filteredTopGames = [];
        }
      } else {
        this.filteredTopGames = [];
      }
    },
  },
  mounted() {
    this.getTop();
    Casino.getCategories().then((res) => {
      this.categories = res;
      this.loading = false;
    });
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Top Casino Games");
  },
};
</script>

<style lang="css"></style>
