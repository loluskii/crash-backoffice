<template>
  <div class="mt-4">
    <b-tabs ref="tabs">
      <b-tab title="Users" class="types-page" title-link-class="types-link">
        <form id="single-stop" @submit.prevent="getUsers(1)" v-if="!showForm && !editUser">
          <div class="row pt-3">
            <div class="col-sm-3">
              <select class="form-control" v-model="userFilter.user_type">
                <option value="">All</option>
                <option :value="role.id" v-for="(role, index) in roles" :key="index">{{ role.display_name }}</option>
              </select>
            </div>
            <br class="d-sm-none">
            <div class="col-sm-2">
              <button type="submit" class="btn btn-info btn-block">Filter</button>
            </div>
            <br class="d-sm-none">
            <div class="col-sm-7">
              <button type="button" class="btn btn-success float-right" @click="showForm = true">
                <i class="fa fa-plus fa-fw"></i>
                Add New User
              </button>
            </div>
          </div>
        </form>
        <user-list :users="users" :loading="loading" v-if="!showForm && !editUser"></user-list>
        <user-form v-if="showForm" :roles="roles" :agents="superAgents" :states="states"></user-form>
        <edit-user v-if="editUser" :data="user" :roles="roles" :agents="superAgents" :states="states"></edit-user>
      </b-tab>
      <b-tab v-permission="'Fund Network'" title="Banking" class="types-page" title-link-class="types-link">
        <funds-transfer :users="users"></funds-transfer>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import Agent from '../../../services/agents'
import Setting from '../../../services/settings'
import GamingActivity from '../../../components/agent/GamingActivity';
import Transactions from '../../../components/agent/transactions';
import UserList from '../../../components/agent/UsersList';
import EditUser from '../../../components/agent/EditUser';
import UserForm from '../../../components/agent/UserForm';
import FundsTransfer from '../../../components/agent/funds-transfer';
import OpenBets from '../../../components/agent/OpenBets';
import BetsHistory from '../../../components/agent/BetsHistory';
import VirtualSport from '../../../components/agent/VirtualSport';
import CommissionProfile from '../../../components/agent/CommissionProfile';
import BettingParameter from '../../../components/agent/BettingParameter';
export default {
  name: "agent-overview",
  layout: 'main',
  components:{
    GamingActivity,
    UserForm,
    UserList,
    EditUser,
    FundsTransfer,
    Transactions,
    OpenBets,
    BetsHistory,
    VirtualSport,
    CommissionProfile,
    BettingParameter
  },
  data(){
    return{
      counter: 0,
      offset: 4,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      loading: false,
      agent_id:'',
      agentInfo: null,
      users:[],
      userFilter: {
        user_type: ''
      },
      user: [],
      roles: [],
      showForm: false,
      editUser: false,
      superAgents: [],
      states: [],
      filterData: {
        from :this.$moment()
            .startOf("isoWeek")
            .format("DD/MM/YYYY"),
        to: this.$moment()
            .endOf("isoWeek")
            .format("DD/MM/YYYY"),
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      logs:[]
    }
  },
  methods:{
    getUsers(page){
      this.loading = true
      Agent.getUsers(this.$store.state.pageParam, page, this.userFilter).then(res => {
        this.loading = false
        this.users = res;
        this.pagination = res
      }).catch(err => {
        this.loading = false
        this.$toast.error('An error occured',{icon: 'times'})
      })
    },
    getRoles(){
      Setting.getRoles().then(res => {
        this.roles = res;
      })
    },
    getLogs(){
      this.loading = true
      this.$axios.post('user/account/login-history',this.filterData).then((res)=>{
        this.logs = res.data.data
      })
    },
  },
  created() {

  },
  head () {
    return {
      title: 'Agent Overview'
    }
  },
  mounted(){
    this.getUsers(1)
    this.getRoles();
    this.$nuxt.$on('user-added', res => {
      this.getUsers(1)
      this.showForm = false;
    });
    this.getLogs()

    this.$axios.get('/admin/agent-management/agent/'+this.$store.state.pageParam+'/details').then(res => {
      this.agentInfo = res.data;
      this.$store.dispatch('setTitle', 'Agent Overview ('+this.agentInfo.username+')');
    });


    // this.$axios.get('/admin/agent-management/get-agency').then(res => {
    //     this.superAgents = res.data;
    // });

    this.$axios.get('/admin/utilities/get-country-states').then(res => {
      this.states = res.data.states;
    })

    this.$nuxt.$on('cancelForm', res => {
      this.showForm = false;
      this.editUser = false;
    })

    this.$nuxt.$on('editUser', res => {
      this.editUser = true;
      this.user = res;
    })
  },
  asyncData ({ store, route }) {
    store.dispatch('setTitle', 'Agent Overview')
    let agent_id = route.params.Index;
    if (agent_id !== undefined) {
      store.dispatch('setPageParam', agent_id)
    }
  },
}
</script>
