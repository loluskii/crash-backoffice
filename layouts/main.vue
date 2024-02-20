<template>
    <div  id="app">
        <app_header></app_header>
        <div class="wrapper">
            <left_side v-show="this.$store.state.left_open"></left_side>
            <right_side>
                <router-view></router-view>
            </right_side>
        </div>
        <div class="background-overlay" @click="right_close"></div>
    </div>
</template>
<script>
    import app_header from "../components/app_header";
    import left_side from "../components/left-side/default/left-side";
    import right_side from "../components/right-side";
    import settings from "../services/settings"
    export default {
        name: 'default_layout',
        components: {
            app_header,
            left_side,
            right_side
        },
        methods: {
            right_close() {
                this.$store.commit('rightside_bar', "close");
            },
            applySettings() {
              settings.getSettings().then(res => {
                this.$store.dispatch('setCurrency', res.Currency);
                this.$store.dispatch('setPowerBonusDate', res.PowerBonusStartDate);
              }).catch(err => {

              })
            }
        },
        updated() {
            // this.$laravel.setPermissions(this.$store.state.auth.user.permissions);
        },
        mounted() {
            window.onscroll = function(event){
                var top = ( document.getElementById('menu') &&  document.getElementById('menu').scrollTop  || document.body && document.body.scrollTop  || 0);
                if(top<=56){
                    document.getElementById("right").style.marginTop=-top+"px"
                }
                else{
                    document.getElementById("right").style.marginTop=-56+"px"
                }
            }
            // this.applySettings();
        },
        beforeMount() {
            const loggedIn = this.$store.state.auth.loggedIn;
            if(!loggedIn)
                window.location.href = '/';
        },
    }
</script>
<style src="~/assets/css/custom_css/metisMenu.css"></style>
<style lang="scss" src="~/assets/sass/dark/custom.scss"></style>
<style >
    body.fixed-header #app .navbar{
        position: relative;
    }
    body.fixed-header #app .header{
        margin-bottom: 0;
    }
    @media(max-width: 320px){
        .message_dropdown .dropdown-menu.show{
            left:20px !important;
        }
    }
    .table td,
    .table th {
        white-space: nowrap;
        width: 1%;
        padding: 5px !important
    }
    .m-t-10{
        margin-top: 10px;
    }
    .form-control, select.form-control{
        padding: 5px 5px;
        border-radius: 0;
        /* -webkit-appearance: none; */
    }
    .input-group-text {
        border-radius: 0;
    }
    .input-group > .form-control:not(:first-child), .input-group > .custom-select:not(:first-child){
        border-radius: 0;
        /* -webkit-appearance: none; */
    }

</style>
