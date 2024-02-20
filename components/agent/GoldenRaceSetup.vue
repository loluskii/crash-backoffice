<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <label>
                    <input type="checkbox" class="square-blue" v-model="isEnabled" @change="enableGoldenRace"/>
                </label>
                <label class="ml-3">
                    Enable Golden Race Virtual
                </label>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-6" style="border-left: 1px solid #ccc">
                <h3>Enable Cashiers</h3>
                <hr>
                <table class="table">
                    <thead>
                        <th>Cashier name</th>
                        <th>Enable GR</th>
                        <th></th>
                    </thead>
                    <tr v-for="(cashier, index) in cashiers" :key="index">
                        <td>{{ cashier.username }}</td>
                        <td>
                            <label>
                                <input type="checkbox" class="square-blue" v-model="cashier.gr_enabled"/>
                            </label>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="addCashier(cashier)">Update</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:[
        'shop',
        'users'
    ],
    data() {
        return {
            units: [],
            isEnabled: this.shop.gr_enabled,
            formData:{
                name: '',
                shop_id: this.shop.id
            }
        }
    },
    computed: {
        cashiers() {
            return this.users.filter(user => user.name === 'Cashier');
        }
    },
    methods: {
        enableGoldenRace() {
            this.$axios.post('/golden-race/create-shop/'+this.shop.id, {status: this.isEnabled}).then(res => {
                if(res.data.success)
                    this.$toast.success('Operation was successful',{icon: 'check'})
            }).catch(err => {
                this.$toast.error('Operation was not successful',{icon: 'times'})                
            });
        },
    
        async addCashier(cashier) {
            const data = {
                cashier_id: cashier.user_id,
                shop_id: this.shop.id,
                status: cashier.gr_enabled
            }
            await this.$axios.post('/golden-race/add-cashier', data).then(res => {
                if(res.data.success)
                    this.$toast.success('Operation was successful',{icon: 'check'})
            }).catch(err => {
                this.$toast.error('Operation was not successful',{icon: 'times'})                
            });
        }
    },
    mounted() {
        
    },
}
</script>