<template>
  <div class="catalog-item text-white flex flex-row items-center mb-2">
    <div class="flex-1 text-left">
        <h3 class="font-bold text-gray-400">{{ good.name }} ({{ good.P }})</h3>
    </div>
    <div class="ml-4 flex-shrink w-[100px] pr-4">
        <div class="rounded p-3 bg-slate-700">{{ priceInRoubles }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsItem',
  data() {
    return {
        dollarRate: 70
    }
  },
  props: {
    good: Object
  },
  computed: {
    priceInRoubles() {
        return this.good.P * this.dollarRate;
    }
  }
}
</script>
