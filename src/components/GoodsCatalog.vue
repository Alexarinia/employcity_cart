<template>
  <div class="catalog">
    <template v-if="goodsCategories">
      <div v-for="goodsCategory in goodsCategories" :key="goodsCategory">
        {{ goodsCategory.name }}
        <GoodsCategoryItem :goodsCategory="goodsCategory" />
      </div>
    </template>
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
  props: {
    msg: String
  },
  computed: {
    goods() {
      if(this.goodsContainer && this.goodsContainer.Value && this.goodsContainer.Value.Goods) {
        return this.setGoodsNames(this.goodsContainer.Value.Goods);
      } else {
        return [];
      }
    },
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
        console.log('categories');
      console.log(categories);

        return categories;
      } else {
        return [];
      }
    },
    goodsNames() {
      if(this.goodsNamesContainer) {
        return this.goodsNamesContainer;
      } else {
        return [];
      }
    }
  },
  methods: {
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
      });

      return goods;
    }
  },
  mounted() {
    console.log(this.goods);
      console.log(this.goodsNames);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
