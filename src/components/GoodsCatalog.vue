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
import goodsContainer from '@/jsondata/data.json';
import goodsNamesContainer from '@/jsondata/names.json';
import GoodsCategoryItem from '@/components/Goods/GoodsCategoryItem';

export default {
  name: 'GoodsCatalog',
  components: {
      GoodsCategoryItem
  },
  data() {
    return {
      goodsContainer: goodsContainer,
      goodsNamesContainer: goodsNamesContainer
    }
  },
  computed: {
    // Собираем список товаров с сопоставленными параметрами
    goods() {
      if(this.goodsContainer && this.goodsContainer.Value && this.goodsContainer.Value.Goods) {
        return this.setGoodsNames(this.goodsContainer.Value.Goods);
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
    },
    // Собираем список параметров товаров
    goodsNames() {
      if(this.goodsNamesContainer) {
        return this.goodsNamesContainer;
      } else {
        return [];
      }
    }
  },
  methods: {
    // Сопоставляем ID товара с группами и названиями
    setGoodsNames(goods) {
      goods.forEach((value) => {
        if(this.goodsNames[value.G]) {
          value.category = this.goodsNames[value.G].G;
        } else {
          value.category = 'Без категории';
        }

        if(value.category && this.goodsNames[value.G].B[value.T]) {
          value.name = this.goodsNames[value.G].B[value.T].N;
        } else {
          value.category = 'Без названия';
        }

        value.uniqueId = value.G + '_' + value.T;
      });

      return goods;
    }
  }
}
</script>