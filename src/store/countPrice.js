import {reactive, toRefs} from 'vue';

export const state = reactive({
    dollarRate: 70,
    // setDollarRate () {
        
    // },
    countTotalPrice() {
        let totalPrice = 0;

        if(Object.keys(state.cartGoods).length) {
            for(let key in state.cartGoods) {
                let good = state.cartGoods[key];
                totalPrice += state.getPriceInRoubles(good.unit.C) * good.quantity;
            }
        }

        state.totalPrice = totalPrice;    
    },
    getPriceInRoubles(dollarPrice) {
        return Math.round(dollarPrice * state.dollarRate);
    }
});

export default function fetchCountPrice() {
    // Вывод курса доллара
    const getDollarRate = () => {
        return state.dollarRate;
    };

    // Конвертация цены в рубли
    const priceInRoubles = (dollarPrice) => {
        return state.getPriceInRoubles(dollarPrice);
    };
            
   return {
       ...toRefs(state),
       priceInRoubles,
       getDollarRate
     }
}