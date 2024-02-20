<template>
  <div>
    <div class="d-flex flex-lg-row flex-md-row flex-column justify-content-between align-items-center">
      <div>
        <router-link
          to="/Casino/Games/AddNew"
          class="btn btn-success btn-sm"
          style="margin-right: 10px"
        >
          <i class="fa fa-fw fa-plus"></i>
          Add New Game
        </router-link>
        <button class="btn btn-sm btn-secondary mr-1" @click="openCatModal">
          Manage Categories
        </button>
        <button class="btn btn-sm btn-secondary mr-1" @click="openTopCatModal">
          Manage Top Categories
        </button>
      </div>
      <div class="d-flex align-items-center">
        <div class="form-group mr-3">
          <label for="">Show</label>
          <select class="form-control" @change="setLimit" v-model="page_limit" id="">
            <option>50</option>
            <option>250</option>
            <option>500</option>
            <option>1000</option>
          </select>
        </div>
        <div class="form-group mr-3">
          <label for="">Filter by Category</label>
          <select class="form-control" @change="setCategory" v-model="category_id" name="" id="">
            <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
              >
                {{ category.name }}
              </option>
          </select>
        </div>
        <!-- <div class="form-group mr-3">
          <label for="">Search</label>
          <input type="text" name="" id="" class="form-control" placeholder="Type to search..." aria-describedby="helpId">
        </div> -->
        <button @click.prevent="showResults" class="btn btn-primary h-100 mt-3">Search</button>
      </div>
    </div>
    <card title="List">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="bg-grey-100">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <!-- <th>Description</th> -->
              <th>Type</th>
              <th>Category</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(game, index) in games"
              v-if="games.length > 0"
              :key="index"
            >
              <td>
                <a href="javascript:void(0)">
                  <img
                    :src="game.image_path"
                    alt=""
                    height="100"
                    style="max-width: 150px"
                  />
                </a>
              </td>
              <td>
                <router-link :to="'/Casino/Games/' + game.id">{{
                  game.title
                }}</router-link>
              </td>
              <!-- <td>{{ game.description }}</td> -->
              <td>{{ game.type }}</td>
              <td>{{ game.category.name }}</td>
              <td>{{ game.status === 1 ? "Active" : "Deactivated" }}</td>
              <td class="text-nowrap">
                <div class="ui-group-buttons">
                  <router-link
                    :to="'/Casino/Games/' + game.id"
                    class="btn btn-primary"
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </router-link>
                  <div class="or"></div>
                  <a
                    href="#"
                    class="btn btn-danger"
                    role="button"
                    @click="deleteCategory($event, game.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr v-if="!games && !loading">
              <td colspan="7" align="center">No casino game has been added</td>
            </tr>
            <tr v-if="loading">
              <td colspan="7" class="text-center">
                <i class="fa fa-4x fa-spin fa-spinner"></i>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </card>
    <categories :categories="categories"></categories>
    <topCategories :top_categories="top_categories"></topCategories>
  </div>
</template>
<script>
import card from "../../../components/card.vue";
import categories from "../../../components/casino/categories.vue";
import Casino from "../../../services/casino.js";
import axios from "~/plugins/axios";
import topCategories from "../../../components/casino/top-categories.vue";

export default {
  scrollToTop: true,
  name: "pages",
  layout: "main",
  components: {
    card,
    categories,
    topCategories
  },
  data() {
    return {
      title: "Casino Games Management",
      games: null,
      categories: null,
      top_categories: null,
      loading: false,
      page_limit: 10,
      category_id: null
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if(to.query.id){
          this.category_id = to.query.id;
          this.setCategory();
        }
      },
    },
  },
  methods: {
    openCatModal() {
      this.$nuxt.$emit("OPEN_CAT_MODAL");
    },
    openTopCatModal(){
      this.$nuxt.$emit("OPEN_TOP_CAT_MODAL");
    },
    deleteCategory(e, id) {
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
        .then(
          (result) => {
            if (result.value) {
              Casino.deleteCategory(id).then((res) => {
                if (res.success) {
                  $(e.target).closest("tr").remove();
                  self.$swal("Deleted!", "Item has been removed", "success");
                }
              });
            }
          },
          function (dismiss) {}
        );
    },
    getGames(page){
      Casino.getGames(page).then((res) => {
        this.games = res.data;
        this.loading = false;
      });
    },
    showResults(){
      this.loading = true;
      Casino.getGames(this.page_limit).then((res) => {
        this.games = res.data;
        this.loading = false;
      });
    },
    setLimit(){
      this.loading = true;
      this.games = null;
      Casino.getGames(this.page_limit).then((res) => {
        this.games = res.data;
        this.loading = false;
      });
    },
    setCategory(){
      this.loading = true;
      this.games = null;
      if(this.category_id == ""){
        this.$router.push('/Casino/Games');
        this.loading = false;
      }else{
        Casino.getGamesByCategory(this.category_id).then((res) => {
          this.games = res.data;
          this.loading = false;
        });
      }
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Casino Games Management");
  },
  mounted() {
    // this.getGames(10);
    Casino.getCategories().then((res) => {
      this.categories = res;
    });

    Casino.getTopCategories().then((res) => {
      this.top_categories = res;
    })
    this.$nuxt.$on("CATEGORY_SAVED", (category) => {
      Casino.getCategories().then((res) => {
        this.categories = res;
      });
    });
    this.$nuxt.$on("CATEGORY_REMOVED", (index) => {
      this.categories.splice(index, 1);
    });
  },
};
</script>
