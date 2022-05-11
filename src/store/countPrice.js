import {reactive, toRefs} from 'vue';

export const state = reactive({
    dollarRate: 70,
    // Рандомный курс доллара от 20 до 80
    setRandDollarRate () {
        state.dollarRate = Math.round(Math.random() * (80 - 20) + 20);
    },
    // Конвертация цены из долларов в рубли (с округлением)
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