<template>

    <div class="row">
        <div class="col-lg-6 masonry-item">
            <card title="Menu Items" :padding="true">
              <ul class="list-group list-group-dividered list-group-full h-350">
                <div data-role="container">
                  <div data-role="content">
                    <li class="list-group-item" v-for="(menu, index) in menus" :key="index">
                      <small class="badge badge-round badge-info float-right" v-if="menu.target == 'web'">Web</small>
                      <small class="badge badge-round badge-warning float-right" v-if="menu.target == 'mobile'">Mobile</small>
                      <small class="badge badge-round badge-success float-right" v-if="menu.target == 'shop'">Shop</small>
                      <p><a class="hightlight" href="javascript:void(0)">{{menu.title}}</a></p>
                      <small>
                        <a class="hightlight" href="javascript:void(0)" @click="edit(menu)">
                          <span><i class="icon md-edit"></i>Edit</span>
                        </a> |
                        <a class="hightlight" href="javascript:void(0)" @click="destroy($event, menu.id)">
                          <span><i class="icon md-delete"></i>Delete</span>
                        </a>
                      </small>
                    </li>
                  </div>
                </div>
              </ul>
            </card>
        </div>
          <!-- End Panel Tickets -->
        <div class="col-lg-6 masonry-item">
          <!-- Panel Subscribe -->
            <card title="Add/Edit Menu Item" :padding="true">
              <form @submit.prevent="submitMenu">
                <div class="form-group form-material">
                  <select class="form-control" v-model="formData.target">
                    <option value="">Select Target</option>
                    <option value="web">Web</option>
                    <option value="shop">Shop</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div class="form-group form-material">
                    <input type="text" name="title" 
                    v-validate="'required'" class="form-control" v-model="formData.title" 
                    :class="{'input': true, 'is-danger': errors.has('title') }"
                    autocomplete="off" placeholder="Title">
                    <i v-show="errors.has('title')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('title')" class="help is-danger text-danger">{{ errors.first('title') }}</span>
                </div>
                <div class="form-group form-material">
                  <select class="form-control" v-model="formData.parent_id">
                    <option value="">Parent Menu</option>
                    <option :value="menu.id" v-for="(menu, index) in menus" :key="index">{{ menu.title }}</option>
                   
                  </select>
                </div>
                <div class="form-group form-material">
                    <input type="text" name="link" class="form-control"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('link') }" 
                    v-model="formData.link" autocomplete="off" placeholder="URL">
                    <i v-show="errors.has('link')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('link')" class="help is-danger text-danger">{{ errors.first('link') }}</span>
                </div>
                <div class="form-group form-material">
                    <input type="text" name="order" class="form-control"
                    v-model="formData.order" autocomplete="off" placeholder="2">
                </div>
                <div class="form-group form-material">
                  <input type="checkbox" v-model="formData.status" value="">
                  is Active
                </div>
                <div class="form-group form-material">
                  <input type="checkbox" v-model="formData.new_window" value="">
                  Open in new window
                </div>
                <div class="form-group">
                  <input type="hidden" v-model="formData.id" value="">
                  <button type="submit" class="btn btn-primary" id="save">Save</button>
                  <button type="submit" class="btn btn-default" @click="resetForm">Cancel</button>
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
    name:'site_menu',
    layout: 'main',
    scrollToTop: true,    
    components:{
        card
    },
    data(){
        return{
            scrollToTop: true,
            title: 'Site Menus',
            menus:'',
            formData:{
                title: '',
                target: 'web',
                order: 0,
                link: '#',
                status: true,
                new_window: '',
                parent_id: '',
                id: ''
            }
        }
    },
  methods: {
    submitMenu: function submitMenu() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                $('#save').attr('disabled', true);
                CMS.storeMenu(this.formData).then(res=>{
                    if(res.success){
                        $('#save').attr('disabled', false);
                        if(this.formData.id == ''){
                            this.$toast.success('Menu created successfully.', {icon: 'check'});
                            this.menus.push(res.menu)
                            this.formData.title     = ''
                            this.formData.target    = ''
                            this.formData.link      = ''
                            this.formData.order     = ''
                            this.formData.status    = ''
                            this.formData.new_window= ''
                            this.formData.id = ''
                        }else{
                            this.$toast.success('Menu has been updated.', {icon: 'check'});
                            this.menus = res.menus;
                        }
                    }else{
                        $('#save').attr('disabled', false);
                        this.$toast.error('An error occured',{icon: 'times'})
                    }
                }).catch(err => {
                    $('#save').attr('disabled', false);
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            }
        }).catch(err => {
            $('#save').attr('disabled', false);
            this.$toast.error('An error occured',{icon: 'times'})
        });
    },
    edit(menu){
        this.formData.title       = menu.title
        this.formData.target      = menu.target
        this.formData.parent_id   = menu.parent
        this.formData.link        = menu.link
        this.formData.order       = menu.order
        this.formData.status   = menu.status
        this.formData.new_window  = menu.new_window
        this.formData.id          = menu.id
    },
    destroy(e, id){
        var self = this;
        self.$swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this account',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete account!',
            cancelButtonText: 'No, keep account'
        }).then((result)=> {
            if (result.value) {
                CMS.deleteMenu(id).then((res) => {
                    if(res.success){
                        $(e.target).closest('li').remove();
                        self.$swal('Deleted!', 'Account has been removed', 'success');
                    }
                });
            }else{

            }
        })
    },
    resetForm(){
        this.formData = {
            title: '',
            target: 'web',
            order: '',
            link: '#',
            status: true,
            new_window: '',
            id: ''
        }
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    CMS.listMenus().then(res=>{
        this.menus = res;
    })
  },
  head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Site Menus')
    },
}
</script>

<style lang="css">
</style>
