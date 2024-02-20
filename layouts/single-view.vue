<template>
    <div  id="app">
        <div class="wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import right_side from "../components/right-side";
    export default {
        name: 'single',
        components: {
            right_side
        },
        created: function() {},
        methods: {
        },
        mounted() {
            
        }
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
