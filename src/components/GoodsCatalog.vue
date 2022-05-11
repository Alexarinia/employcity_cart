<template>
  <div class="catalog w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div v-if="goodsCategories" class="flex flex-wrap items-start">
      <div v-for="goodsCategory in goodsCategories"
          :key="goodsCategory.id"
           class="md:w-1/2">
        <GoodsCategoryItem :goodsCategory="goodsCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCategoryItem from '@/components/Goods/GoodsCategoryItem';
import { onMounted, reactive } from "vue";

export default {
  name: 'GoodsCatalog',
  components: {
      GoodsCategoryItem
  },
  data() {
    return {
      goodsContainer: [],
      goodsNamesContainer: []
    }
  },
  setup() {
    const state = reactive({
      goods: null,
      goodsNames: null,
    // Собираем список параметров товаров
      async fetchGoods() {
        const response = await fetch('/jsondata/data.json');
        state.goods = await response.json();
      },
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
        if(this.state.goodsNames[value.G]) {
          value.category = this.state.goodsNames[value.G].G;
        } else {
          value.category = 'Без категории';
        }

        if(value.category && this.state.goodsNames[value.G].B[value.T]) {
          value.name = this.state.goodsNames[value.G].B[value.T].N;
        } else {
          value.category = 'Без названия';
        }

        value.uniqueId = value.G + '_' + value.T;
      });

      return goods;
    }
  },
  mounted() {
    this.fetchInterval = setInterval(async() => {
        await this.state.fetchGoodsNames();
        await this.state.fetchGoods();
        console.log('fetch');
    }, 15000);
  }
}
</script>