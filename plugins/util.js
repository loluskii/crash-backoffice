import Vue from 'vue'
// import store from '../store/index'
import card from '../components/card'
Vue.mixin({
	methods: {
	  numberFormat (currency, number) {
      return currency+''+parseFloat(number).toLocaleString()
		},
		marginCalc(turnover, winnings){
			let ggr = (parseFloat(turnover) - parseFloat(winnings))
			let margin = parseFloat(ggr)*100/turnover;
			return margin.toFixed(2);
		},
		formatNumber(number, currency = true){
			const n = number ? number : 0;
			if(currency){
				return this.$store.state.currencySymbol+''+parseFloat(n).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
			} else{
				return parseFloat(n).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
			}
		},
		formatDate(date, format){
	   return this.$moment(date).format(format);
	  },
    getStatus(status){
      if(status == 1){
        return 'Won';
      }else if(status == 2){
        return 'Lost';
      }else if(status == 3){
        return 'Cancelled';
      }else if(status == 4){
        return 'Void';
      }else if(status == 5){
        return 'CUT1';
      }else if(status == 6){
        return 'Pending Approval';
      } else {
        return 'Pending'
      }
    },
    setClass(status){
      if(status == 1){
        return 'text-danger';
      }else if(status == 2){
        return 'text-success';
      }else if(status == 3){
        return 'text-secondary';
      }else if(status == 4){
        return 'text-secondary';
      }else if(status == 5){
        return 'text-success';
      }else if(status == 6){
        return 'text-warning';
      } else {
        return 'text-warning'
      }
    },
	}
});
Vue.component('card', card)
