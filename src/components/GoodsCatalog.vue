<template>
  <div class="catalog w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div v-if="goodsCategories" class="md:flex md:flex-wrap md:items-start">
      <div v-for="goodsCategory in goodsCategories"
          :key="goodsCategory.id"
           class="w-full md:w-1/2">
        <GoodsCategoryItem :goodsCategory="goodsCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCategoryItem from '@/components/Goods/GoodsCategoryItem';
import { onMounted, reactive } from "vue";
import { state as priceState} from "@/store/countPrice";

export default {
  name: 'GoodsCatalog',
  components: {
      GoodsCategoryItem
  },
  setup() {
    const state = reactive({
      goods: null,
      goodsNames: null,
      // Забираем список товаров
      async fetchGoods() {
        const response = await fetch('/jsondata/data.json');
        state.goods = await response.json();
      },
      // Забираем список категорий и названий товаров
      async fetchGoodsNames() {
        const response = await fetch('/jsondata/names.json');
        state.goodsNames = await response.json();
      }
    });

    onMounted(async () => {
      await state.fetchGoodsNames();
      await state.fetchGoods();
    });

    return {
      state,
    };
  },
  computed: {
    // Собираем список товаров с сопоставленными параметрами
    goods() {
      if(this.state.goods && this.state.goods.Value && this.state.goods.Value.Goods && this.state.goodsNames) {
        return this.setGoodsNames(this.state.goods.Value.Goods);
      } else {
        return [];
      }
    },
    // Собираем список категорий товаров
    goodsCategories() {
      if(this.goods) {
        let categories = {};

        this.goods.forEach((good) => {
          if(! categories[good.G]) {
            categories[good.G] = {
              'id': good.G,
              'name': good.category,
              'goods': []
            };
          }

          categories[good.G].goods.push(good);
        });

        return categories;
      } else {
        return [];
      }
    }
  },
  methods: {
    // Сопоставляем ID товара с группами и названиями
    setGoodsNames(goods) {
      goods.forEach((value) => {
        // Задаём товару название категории       
        if(this.state.goodsNames[value.G]) {
          value.category = this.state.goodsNames[value.G].G;
        } else {
          value.category = 'Без категории';
        }

        // Задаём товару название
        if(value.category && this.state.goodsNames[value.G].B[value.T]) {
          value.name = this.state.goodsNames[value.G].B[value.T].N;
        } else {
          value.category = 'Без названия';
        }

        // Задаём товару уникальный ID
        value.uniqueId = value.G + '_' + value.T;
      });

      return goods;
    }
  },
  mounted() {
    // Обновляем список товаров раз в 15 секунд с обновлением курса доллара
    this.fetchInterval = setInterval(async() => {
        await this.state.fetchGoodsNames();
        await this.state.fetchGoods();
        priceState.setRandDollarRate();
        console.log(`А доллар сегодня равен ${priceState.dollarRate}`);
    }, 15000);
  }
}
</script>