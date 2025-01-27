<template>
  <product-list-page></product-list-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProductListPage from '@/components/product/list/ProductListPage.vue'

@Options({
  components: { ProductListPage }
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
