<template>
    <div class="menu-item">
        <router-link :to="link" exact :class="extra">
            <i class="leftmenu_icon" :class="icon"></i>
            <span class="name"><slot></slot></span>
        </router-link>
    </div>
</template>
<script>
export default {
    props: ["link", "icon", "extra"]
}
</script>
<style>
.menuitem-padding{
    padding-left: 30px !important;
}
</style>
