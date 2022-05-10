import {reactive, toRefs} from 'vue';

export const state = reactive({
    cartGoods: {},
    checkEmptyGoodsInCart () {
        state.cartGoods.forEach((value) => {
            if(value.quantity === 0) {
                value.remove();
            }
        });
    }
});

export default function fetchCartGoods() {
    const getCartGoods = () => {
        return state.cartGoods;
    };

    const addGoodToCart = (good) => {
        if(! state.cartGoods[good.uniqueId]) {
            state.cartGoods[good.uniqueId] = {
                'quantity': 1,
                'unit' : good
            };
        } else {
            ++state.cartGoods[good.uniqueId].quantity;
        }
    }

    const removeGoodFromCart = (good) => {
        if(state.cartGoods[good.uniqueId]) {
            --state.cartGoods[good.uniqueId].quantity;
        }

        state.checkEmptyGoodsInCart();
    }

            
   return {
       ...toRefs(state), // convert to refs when returning
       addGoodToCart,
    //    checkEmptyGoodsInCart,
       getCartGoods,
       removeGoodFromCart
     }
}


