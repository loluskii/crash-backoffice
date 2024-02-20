<template>
  <div class="mt-2">
    <roles :roles="roles" :loading="loading"></roles>
  </div>
</template>

<script>
import Roles from "../../components/Roles";
import Permissions from "../../components/Permissions";
import PermissionsModal from "../../components/PermissionsModal";
export default {
  name: "site_menu",
  layout: "main",
  scrollToTop: true,
  components: {
    Roles,
    Permissions,
    PermissionsModal,
  },
  data() {
    return {
      title: "Roles & Permissions Management",
      roles: [],
      loading: true,
      selectedRole: "",
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  mounted: function mounted() {
    this.$nuxt.$on("NEW_ROLE", (role) => {
      this.roles.push(role);
    });

    this.$nuxt.$on("UPDATE_ROLE", (roles) => {
      this.roles = roles;
    });

    this.$nuxt.$on("MANAGE_PERMISSION", (role) => {
      this.selectedRole = role;
      this.$refs.permissions.show();
    });

    this.$axios.get("/roles").then((res) => {
      this.loading = false;
      this.roles = res.data.data;
    });
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Roles & Permissions");
  },
};
</script>

<style lang="css"></style>
