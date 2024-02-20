<template>
    <div>
        <div class="row">
            <div>
                <div class="col-md-12">
                    <div style="margin-bottom: 10px !important;" @click="toggleExpand($event)">
                        <button type="button" class="btn btn-success mr-3" data-action="expand-all">
                            [+] Expand All
                        </button>
                        <button type="button" class="btn btn-warning mr-3" data-action="collapse-all">
                            [-] Collapse All
                        </button>
                        <button type="button" class="btn btn-info" @click="listSports">
                            <i class="fa fa-refresh"></i> Reload Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title"><i class='ti-list-ol'></i> Available Sports List</h3>
                    </div>
                    <div class="card-body">
                        <div class="dd" id="sports_menu">
                            <div class="text-center" v-if="loading">
                                Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
                            </div>
                            <ol class="dd-list" v-if="!loading">
                                <li class="dd-item" :data-id="sport.id" v-for="(sport, s) in sports" :key="s">
                                    <a class="action-btn" href="javascript:;" @click="editSport(sport)">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                    <a class="action-btn" href="javascript:;">
                                        <i class="fa fa-trash-o"></i>
                                    </a>
                                    <div class="dd-handle"><h5>{{ sport.name}}</h5></div>
                                    <ol class="dd-list">
                                        <li class="dd-item" :data-cid="category.id" v-for="(category, c) in sport.categories" :key="c">
                                            <a class="action-btn" href="javascript:;" @click="editCategory(category, sport)">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a class="action-btn" href="javascript:;">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                            <div class="dd-handle">{{category.name}}</div>
                                            <ol class="dd-list">
                                                <li class="dd-item" :data-tid="tournament.id" v-for="(tournament, t) in category.tournaments" :key="t">
                                                    <a class="action-btn ml-2" href="javascript:;" @click="editTournament(tournament)">
                                                        <i class="fa fa-edit"></i>
                                                    </a>
                                                    <a class="action-btn" href="javascript:;">
                                                        <i class="fa fa-trash-o"></i>
                                                    </a>
                                                    <div class="dd-handle">{{ tournament.name }}</div>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mt-4">
                    <b-tabs ref="tabs">
                        <b-tab title="Sports Mgmt." ref="sport-tab" active class="template-list" style="padding: 20px" title-link-class="template-list-link">
                            <sport></sport>
                        </b-tab>
                        <b-tab title="Category Mgmt." ref="category-tab" class="template-list" title-link-class="template-list-link" style="padding: 20px" >
                            <category-form :sports="sports"></category-form>
                        </b-tab>
                        <b-tab title="Tournament Mgmt." ref="tournament-tab" class="template-list" title-link-class="template-list-link" style="padding: 20px" >
                            <tournament-form :sports="sports"></tournament-form>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sport from "../../components/sports-menu/Sport.vue"
    import CategoryForm from "../../components/sports-menu/SportCategory.vue"
    import TournamentForm from "../../components/sports-menu/Tournament.vue"
    import card from "../../components/card.vue"
    import CMS from "../../services/cms"
    import axios from '~/plugins/axios'
    export default {
        name:'sports_menu',
        layout: 'main',
        scrollToTop: true,
        components:{
            card,
            Sport,
            CategoryForm,
            TournamentForm
        },
        data(){
            return{
                title: 'Sports Menu',
                sports: [],
                loading: true
            }
        },
        methods:{
            listSports(){
                this.loading= true;
                this.$axios.get('/admin/content-management/sports-menu').then(response =>  {
                    this.sports = response.data
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                    // console.log(error.data)
                });
            },
            toggleExpand(e){
                var target = $(e.target),
                    action = target.data('action');
                if (action === 'expand-all') {
                    $('.dd').nestable('expandAll');
                }
                if (action === 'collapse-all') {
                    $('.dd').nestable('collapseAll');
                }
            },
            updateOutput: function(e) {
                let serialized = $('#sports_menu').nestable('serialize');
                CMS.updateSportOrder(serialized).then(res => {
                    if (res.success) {

                    }
                });
            },
            editSport(sport){
                this.$nuxt.$emit('EDIT_SPORT', sport)
            },
            editCategory(category, sport){
                this.$nuxt.$emit('EDIT_CATEGORY', category, sport)
                console.log(this.$refs['category-tab'].$el.click())
            },
            editTournament(tournament){
                this.$nuxt.$emit('EDIT_TOURNAMENT', tournament)
            }
        },
        updated() {
            // activate Nestable for sports menu
            $('#sports_menu').nestable({
                group: 1
            }).on('change', this.updateOutput);
            //collapse all by default
            $('#sports_menu').nestable('collapseAll');
            // this.updateOutput($('#sports_menu').data('output', $('#sports_menu_output')));

        },
        mounted: function() {
            this.listSports()
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Sports Menu')
        },
    }
</script>
<style src="../../assets/css/nestable.css"></style>
<style scoped>
    .dd-item > .action-btn{
        display: block;
        position: relative;
        cursor: pointer;
        float: left;
        width: 25px;
        height: 20px;
        margin: 7px 0;
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
        border: 0;
        background: transparent;
        font-weight: bold;
    }
</style>
