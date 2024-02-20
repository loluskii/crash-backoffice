<template>
    <div class="card" :class="{dNone:isActive}">
        <div class="card-header bg-primary">
            <h3 class="card-title" v-html="title"></h3>
            <span class="float-right">
                <button v-if="excel" style="margin-right: 10px">
                    <img src="~/assets/img/excel.png" height="16" alt="">
                </button>
                 <button v-if="back" class="mr-2" @click="goBack">
                    Go Back
                </button>
                <i class="fa fa-fw ti-angle-up p-l-10" :class={rotate:show} @click="show = !show"></i>
               
            </span>
        </div>
        <div class="card-body" :class="{nopadding: !padding}" v-show="show">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        scrollToTop: true,
        name:'card',
        data(){
            return{
                show: true,
                isActive:false,
            }
        },
        methods:{
            goBack(){
                window.history.back()
            }
        },
        mounted:function(){
        },
        props:{
            title:{
                required:false
            },
            padding: false,
            excel:true,
            back: false
        },
        destroy:function () {

        }
    }
</script>
<style>
    .dNone{
        display: none;
    }
    .rotate{
        transform:rotate(180deg);
    }
    .card-header{
        color: #fff;
    }
    .card .table{
        margin-bottom: 0 !important;
    }
</style>