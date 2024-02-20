<template>
    <div class="row">
        <div class="col-md-10">
            <card :title="title" >
                <form @submit.prevent="submit" style="padding: 10px">
                    <div class="form-group">
                        <label for="">Title</label>
                        <input name="title" v-validate="'required'"
                            class="form-control" :class="{'input': true, 'is-danger': errors.has('title') }"
                            type="text" v-model="formData.title">
                            <i v-show="errors.has('title')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('title')" class="help is-danger text-danger">{{ errors.first('title') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="">Amount</label>
                        <input type="text" v-validate="'required'"
                        class="form-control" :class="{'input': true, 'is-danger': errors.has('amount') }"
                        v-model="formData.amount" value="">
                        <i v-show="errors.has('amount')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('amount')" class="help is-danger text-danger">{{ errors.first('amount') }}</span>
                    </div>
                    <div class="form-group">
                        <label for="">Stake</label>
                        <input type="text" v-validate="'required'"
                        class="form-control" :class="{'input': true, 'is-danger': errors.has('stake') }"
                        v-model="formData.stake" value="">
                        <i v-show="errors.has('stake')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('stake')" class="help is-danger text-danger">{{ errors.first('stake') }}</span>
                    </div>
                    <div class="form-group">
                        <label for="">Agent Commission on Stake</label>
                        <input type="text" v-validate="'required'"
                        class="form-control" :class="{'input': true, 'is-danger': errors.has('agent_commission') }"
                        v-model="formData.agent_commission" value="">
                        <i v-show="errors.has('agent_commission')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('agent_commission')" class="help is-danger text-danger">{{ errors.first('agent_commission') }}</span>
                    </div>
                     <div class="form-group">
                        <label for="">Terms</label>
                        <wysiwyg v-model="formData.terms" />
                    </div>
                    <div class="form-group">
                        <label>Fixtures</label>
                        <table class="table">
                            <thead>
                            <th>Events</th>
                            <th>Start Time</th>
                            <th></th>
                            </thead>
                            <tbody>
                                <tr v-if="!fixtures.length">
                                    <td colspan="3" align="center">Search for events and add</td>
                                </tr>
                                <tr v-for="(fixture, index) in fixtures" v-if="fixtures.length > 0" :key="index">
                                    <td>{{ fixture.event_name}}</td>
                                    <td>{{ fixture.schedule}}</td>
                                    <td>
                                    <a href="javascript:;">
                                        <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeEvent(fixture, index)"></i>
                                    </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">Find fixture</div>
                        <div class="col-md-6">
                            <input type="text" placeholder="Enter fixture Id" class="form-control" v-model="fixtureId" value="" @keyup="getEvent($event)">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Bonuses</label>
                        <table class="table">
                            <thead>
                            <th>No. of Lost Games</th>
                            <th>Amount</th>
                            <th></th>
                            </thead>
                            <tbody>

                                <tr v-for="(bonus, index) in formData.bonuses" v-if="formData.bonuses.length > 0" :key="index">
                                    <td><input class="form-control" v-model="bonus.lost_games" /></td>
                                    <td><input class="form-control" v-model="bonus.amount" /></td>
                                    <td>
                                    <a href="javascript:;">
                                        <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeBonus(index)"></i>
                                    </a>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="javascript:;" class="text-success" @click="addBonus()"><i class="fa fa-plus"></i> Add Bonus</a>
                    </div>

                    <div class="row marginTop">
                        <div class="col-6 col-md-6">
                            <input type="hidden" name="id" v-model="formData.id">
                            <button type="submit" id="saveBtn"
                                class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                tabindex="7">Save</button>
                        </div>
                        <div class="col-6 col-md-6">
                            <router-link to="/ContentManagement/Jackpots/List" class="btn btn-default btn-block btn-md btn-responsive">
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
    import CMS from '../../../services/cms.js'
    import card from '../../../components/card.vue';
    import axios from '~/plugins/axios'

    export default{
        scrollToTop: true,
        name: 'add-page',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Add New',
                fixtures: [],
                fixtureId: '',
                formData:{
                    title: '',
                    amount: '',
                    stake: '',
                    agent_commission: '',
                    fixtures: [],
                    terms: '',
                    bonuses: []
                }
            }
        },
        methods:{
            submit(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.formData.fixtures = this.formData.fixtures.toString();
                        CMS.storeJackpot(this.formData).then(res => {
                            if(res.success){
                                this.$toast.success('Jackpot has been saved!', {icon: 'times'})
                                this.$router.push('/ContentManagement/Jackpots/List');
                            }else{
                                this.$toast.error('An error occured',{icon: 'times'})
                            }
                        })
                    }
                });
            },
            removeEvent(index) {
                this.fixtures.splice(index, 1);

                this.formData.fixtures.splice(index, 1);
            },
            addBonus(){
                this.formData.bonuses.push({
                    lost_games: 0,
                    amount: ''
                });
            },
            removeBonus(index){
                this.formData.bonuses.splice(index, 1);
            },
            getEvent(e){
                if(this.fixtureId.length === 4){
                    e.target.disabled = true;
                    this.$axios.get('/admin/content-management/find-fixture/'+this.fixtureId).then(res => {
                        e.target.disabled = false;
                        if (res.data.event_name) {
                            this.fixtures.push({
                                event_name: res.data.event_name,
                                schedule: res.data.schedule
                            });
                            e.target.focus();
                            this.formData.fixtures.push(res.data.provider_id);
                        } else {
                            this.$toast.error('Fixture not found',{icon: 'times'})
                        }
                        this.fixtureId = '';
                    });
                }
            }
        },
        mounted(){

        },
        head(){
            return {
                title: 'Add New'
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Add New')
        },
    }
</script>
