import axios from '~/plugins/axios'
export default {
    /**
     * PAGES METHODS
    **/
    savePage(data){
        return axios.post('/api/admin/content-management/pages', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getPage(id){
        return axios.get('/api/admin/content-management/page/get/'+id).then(res => {
            return res.data
        }).catch(error => {
            return error.data
        });
    },

    deletePage(id){
        return axios.get('/api/admin/content-management/page/'+id+'/delete').then(res => {
            return res.data
        }).catch(error => {
            return error.data
        });
    },

    /**
     * MENU METHODS
    **/

    storeMenu(data){
        return axios.post('/api/admin/content-management/menus', data).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    listMenus(){
        return axios.get('/api/admin/content-management/menus').then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    deleteMenu(menu){
        return axios.get('/api/admin/content-management/menu/delete/'+menu).then(response =>  {
          return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    /**
     * BANNER METHODS
    **/
    storeBanner(data){
        return axios.post('/api/admin/content-management/banners', data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    listBanners(){
        return axios.get('/api/admin/content-management/banners').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    getBanner(banner){
        return axios.get('/api/admin/content-management/banner/get/'+banner).then(response =>  {
            return response.data;
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    deleteBanner(banner){
        return axios.get('/api/admin/content-management/banner/delete/'+banner).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },
    /**
     * SURE ODDS METHODS
    **/
    storeSureOdds(data){
        return axios.post('/api/admin/content-management/sure-odds', data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    listSureOdds(){
        return axios.get('/api/admin/content-management/sure-odds').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    listSureOddPayments(){
        return axios.get('/api/admin/content-management/sure-odd-payments').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    getSureOdd(sureOdd){
        return axios.get('/api/admin/content-management/sure-odds/get/'+sureOdd).then(response =>  {
            return response.data;
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    deleteSureOdd(sureOdd){
        return axios.get('/api/admin/content-management/sure-odds/delete/'+sureOdd).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },
    /**
     * MARKET TEASERS METHODS
    **/
   listMarkets(){
        return axios.get('/api/admin/content-management/markets').then(response => {
            return response.data
        }).catch(error=>{

        })
    },
    saveMarketCategory(data){
        return axios.post('/api/admin/content-management/markets/groups/save', data).then(response => {
            return response.data
        }).catch(error=>{

        })
    },
    saveMarket(data){
        return axios.post('/api/admin/content-management/markets/save', data).then(response => {
            return response.data
        }).catch(error=>{

        })
    },
    deleteCategory(id){
        return axios.get('/api/admin/content-management/markets/groups/delete/'+id).then(response => {
            return response.data
        }).catch(error=>{

        })
    },
    deleteMarket(id){
        return axios.get('/api/admin/content-management/markets/delete/'+id).then(response => {
            return response.data
        }).catch(error=>{

        })
    },

    /**
     * TOP BETs METHODS
    **/
    getTopBets(){
        return axios.get('/api/admin/content-management/top-bets').then(response => {
            return response.data
        }).catch(error=>{

        })
    },

    saveTopBet(data){
        return axios.post('/api/admin/content-management/top-bets', data).then(response => {
            return response.data
        }).catch(error=>{

        })
    },

    removeTopBet(id){
        return axios.get('/api/admin/content-management/top-bet/delete/'+id).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            // toastr['error']('An error occured.', 'Error');
        });
    },

     /**
     * SPORTS MENU
    **/
   saveSport(data){
        return axios.post('/api/admin/content-management/sports-menu/save-sport', data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
        });
    },
    saveCategory(data){
        return axios.post('/api/admin/content-management/sports-menu/save-category', data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
        });
    },
    saveTournament(data){
        return axios.post('/api/admin/content-management/sports-menu/save-tournament', data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
        });
    },

    updateSportOrder(items){
        return axios.post('/api/admin/content-management/sports-menu-order', {sports: items}).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.message);
        });
    },

    findEvent(filter){
        return axios.post('/api/admin/content-management/find-event', filter).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },
    getFixtures(tid, sid){
      return axios.get(`/api/admin/content-management/get-fixtures/${tid}?sid=${sid}&source=admin&limit=all`).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    getMarkets(tid, sid, market_id){
      return axios.get(`/api/sports/get-odds/${tid}?sid=${sid}&market_id=${market_id}`).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
      });
    },

    deleteEvent(id){
        return axios.get('/api/admin/content-management/delete-event/'+id).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.message);
        });
    },

    updateEvent(id, data){
        return axios.post('/api/admin/content-management/update-event/'+id, data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.message);
        });
    },

    doRecovery(id){
        return axios.get('/api/admin/content-management/do-recovery/'+id).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.message);
        });
    },

    /**
     * Handle Enhanced Multiples
     */
    saveSpecialCategory(data){
        return axios.post('/api/admin/content-management/specials/save-category', data).then(response => {
            return response.data
        }).catch(error=>{

        })
    },
    deleteSpecialCategory(id){
        return axios.get('/api/admin/content-management/specials/category/'+id+'/delete').then(response => {
            return response.data
        }).catch(error=>{

        })
    },

    saveMultiples(data){
        return axios.post('/api/admin/content-management/specials', data).then(response => {
            return response.data
        }).catch(error=>{

        })
    },

    deleteSpecial(id){
        return axios.get('/api/admin/content-management/specials/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.message);
        });
    },

    settleSpecial(data, event_id){
        return axios.post('/api/admin/content-management/specials/'+event_id+'/settle', data).then(response => {
            return response.data
        }).catch(error=>{

        })
    },
    /**
     * JACKPOTS METHODS
    **/
    storeJackpot(data){
        return axios.post('/api/admin/content-management/jackpots', data).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    listJackpots(){
        return axios.get('/api/admin/content-management/jackpots').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    listActiveJackpots(){
        return axios.get('/api/admin/content-management/active-jackpots').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    getJackpot(id){
        return axios.get('/api/admin/content-management/jackpots/get/'+id).then(response =>  {
            return response.data;
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    deleteJackpot(sureOdd){
        return axios.get('/api/admin/content-management/jackpots/delete/'+sureOdd).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },

    getCurrency(){
      return axios.get('/api/jackpots/currencies').then(response =>  {
          return response.data
      }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
      });
    },

    createTicketJackpots(data){
      return axios.post('/api/jackpots/live', data).then(response =>  {
          return response.data
      }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
      });
    },
    getTicketJackpots(){
      return axios.get('/api/jackpots/live').then(response =>  {
          return response.data;
      }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
      });
    },
    updateTicketJackpot(id, data){
      return axios.post('/api/jackpots/live/update/'+id, data).then(response =>  {
          return response.data
      }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
      });
    }
}

