import {reactive, toRefs} from 'vue';
import { state as priceState} from "@/store/countPrice";

// Реактивная корзина для более простого подключения, чем прокидывание событий
export const state = reactive({
    cartGoods: {},
    totalPrice: 0,
    // Удаление товаров с количеством 0
    checkEmptyGoodsInCart () {
        if(Object.keys(state.cartGoods).length) {
            for(let key in state.cartGoods) {
                let good = state.cartGoods[key];
                if(good.quantity === 0) {
                    delete state.cartGoods[key];
                }
            }
        }
    },
    countTotalPrice() {
        let totalPrice = 0;

        if(Object.keys(state.cartGoods).length) {
            for(let key in state.cartGoods) {
                let good = state.cartGoods[key];
                totalPrice += priceState.getPriceInRoubles(good.unit.C) * good.quantity;
            }
        }

        state.totalPrice = totalPrice;    
    }
});

export default function fetchCartGoods() {
    // Вывод товаров корзины
    const getCartGoods = () => {
        return state.cartGoods;
    };

    // Полное обновление товаров корзины
    const reloadCartGoods = (goods) => {
        state.cartGoods = goods;
        state.countTotalPrice();
    };

    // Вывод общей стоимости
    const getTotalPrice = () => {
        return state.totalPrice;
    };

    // Добавление товара в корзину
    const addGoodToCart = (good, quantity = 1) => {
        if(! state.cartGoods[good.uniqueId]) {
            state.cartGoods[good.uniqueId] = {
                'quantity': parseInt(quantity, 10),
                'unit' : good
            };

        } else {
            state.cartGoods[good.uniqueId].quantity += parseInt(quantity, 10);
        }

        state.countTotalPrice();
    }

    // Удаление товара из корзины
    const removeGoodFromCart = (uniqueId) => {
        if(state.cartGoods[uniqueId]) {
            state.cartGoods[uniqueId].quantity = 0;
        }

        state.checkEmptyGoodsInCart();
        state.countTotalPrice();
    }
            
   return {
       ...toRefs(state),
       addGoodToCart,
       getCartGoods,
       getTotalPrice,
       reloadCartGoods,
       removeGoodFromCart
     }
}


