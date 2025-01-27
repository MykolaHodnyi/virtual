<template>
  <product-list-page></product-list-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProductListPage from '@/components/product/list/ProductListPage.vue'

@Options({
  components: { ProductListPage }
})
export default class App extends Vue {
  name = 'App'
}
</script>

<style lang="scss">
#app {
  @apply tw-flex tw-flex-col;
  min-height: 100vh;
}
</style>
