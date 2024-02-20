<template>

    <div class="row">
        <div class="col-lg-6 masonry-item">
            <card title="Top Tournaments" :padding="true">
                <ul class="list-group list-group-dividered list-group-full h-350">
                    <div data-role="container">
                        <div data-role="content" v-if="!loading">
                            <li class="list-group-item" v-for="(topbet, index) in topbets" :key="index">
                            <p><a class="hightlight" href="javascript:void(0)">{{ topbet.tournament.category.sport.name +' -> '+ topbet.tournament.category.name +' -> '+ topbet.tournament.name}}</a></p>
                            <small>
                                <a class="hightlight text-danger" href="javascript:void(0)" @click="destroy($event, topbet.id)">
                                <span><i class="icon md-delete"></i>Remove</span>
                                </a>
                            </small>
                            </li>
                        </div>
                    </div>
                    <div class="text-center" v-if="loading">
                        <i class="fa fa-spin fa-spinner fa-2x"></i>
                    </div>
                </ul>
            </card>
        </div>
          <!-- End Panel Tickets -->
        <div class="col-lg-6 masonry-item">
          <!-- Panel Subscribe -->
            <card title="Add Tournament to Top Bet" :padding="true">
                <form class="form-horizontal columns column is-multiline is-12" role="form" @submit.prevent="save">
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                Sports                       
                            </label>
                        </div>
                        <div class="col-md-8">
                            <v-select label="name" v-model="formData.sport" v-validate="'required'"
                            v-on:input="setCategory" placeholder="Select Sports"
                            :options="sports" name="sport"></v-select>
                            <i v-show="errors.has('sport')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('sport')" class="help is-danger text-danger">{{ errors.first('sport') }}</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                Category/Country                     
                            </label>
                        </div>
                        <div class="col-md-8">
                            <v-select label="name" v-model="formData.category" v-validate="'required'"
                            placeholder="Select Category" v-on:input="setTournament"
                            :options="categories" name="category"></v-select>
                            <i v-show="errors.has('category')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('category')" class="help is-danger text-danger">{{ errors.first('category') }}</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                Tournament                     
                                <span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <v-select label="name" v-model="formData.tournament" v-validate="'required'"
                            placeholder="Select League"
                            :options="tournaments" name="tournament"></v-select>
                            <i v-show="errors.has('tournament')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('tournament')" class="help is-danger text-danger">{{ errors.first('tournament') }}</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                Show on Home Screen                    
                            </label>
                        </div>
                        <div class="col-md-8">
                            <select name="home_screen" id="home_screen" class="form-control" v-model="formData.home_screen">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                Show on Side Menu                    
                            </label>
                        </div>
                        <div class="col-md-8">
                            <select name="side_menu" id="side_menu" class="form-control" v-model="formData.side_menu">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                
                    <div class="column is-6">
                        <div class="control text-center">
                            <button class="button btn btn-primary btn-block" type="submit" id="saveBtn" name="button">Save</button>
                        </div>
                    </div>
                </form>
            </card>
        </div>
    </div>
</template>

<script>
import CMS from '../../services/cms'
import card from '../../components/card.vue';
export default {
    name:'top_bets',
    layout: 'main',
    scrollToTop: true,    
    components:{
        card
    },
    data(){
        return{
            title: 'Top Bets',
            loading: true,
            topbets:[],
            sports:[],
            categories:[],
            tournaments:[],
            formData:{
                sport: '',
                category: '',
                tournament: '',
                side_menu: 'no',
                home_screen: 'yes'
            }
        }
    },
  methods: {
    save: function save() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                $('#saveBtn').attr('disabled', true);
                this.formData.tournament_id = this.formData.tournament.sport_tournament_id
                CMS.saveTopBet(this.formData).then(res=>{
                    if(res.success){
                        $('#saveBtn').attr('disabled', false);
                        this.topbets = res.topbets;
                        this.$toast.success(this.formData.tournament.name +' has been added to top bets',{icon: 'times'})                        
                        this.formData = {
                            sport: '',
                            category: '',
                            tournament: '',
                            side_menu: 'no',
                            home_screen: 'yes'
                        }

                    }else{
                        $('#saveBtn').attr('disabled', false);
                        this.$toast.error('An error occured',{icon: 'times'})
                    }
                })
            }
        }).catch(err => {
            $('#saveBtn').attr('disabled', false);
            console.log(err)
            this.$toast.error('An error occured',{icon: 'times'})
        });
    },
    destroy(e, id){
        var self = this;
        self.$swal({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove item!',
            cancelButtonText: 'No, keep item'
        }).then((result)=> {
            if (result.value) {
                CMS.removeTopBet(id).then((res) => {
                    if(res.success){
                        $(e.target).closest('li').remove();
                        self.$swal('Deleted!', 'Item has been removed', 'success');
                    }
                });
            }else{

            }
        });
    },
    setCategory(e){
        this.categories = e.categories;
    },
    setTournament(e){
        this.tournaments = e.tournaments
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    CMS.getTopBets().then(res=>{
        this.topbets = res;
        this.loading = false;
    });
    this.$axios.get('/admin/content-management/sports-menu').then(response =>  {
        this.sports = response.data
    }).catch(error => {
        console.log(error.data)
    });   
  },
  head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Top Bets')
    },
}
</script>

<style lang="css">
</style>
