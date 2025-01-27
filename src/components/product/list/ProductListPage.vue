<template>
  <main class="main product-list-page">
    <section class="product-list-page__section">
      <product-virtualized-list
        :items="products"
        :error-message="errorMessage"
        :itemHeight="200"
        :containerHeight="800"
        :bufferSize="3"
      >
        <template #default="{ item }">
          <product-list-card :product="item" />
        </template>
      </product-virtualized-list>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ProductVirtualizedList from '@/components/product/list/ProductVirtualizedList.vue'
import ProductListCard from '@/components/product/list/ProductListCard.vue'
import { fetchProducts } from '@/services/api'

export default defineComponent({
  components: { ProductListCard, ProductVirtualizedList },
  setup () {
    const products = ref([])
    const errorMessage = ref('')

    onMounted(async () => {
      errorMessage.value = ''

      try {
        const data = await fetchProducts()
        if (!data || !data.products || !data.products.length) {
          throw new Error('Something went wrong...')
        }

        products.value = data.products
      } catch (error) {
        errorMessage.value = 'Something went wrong...'
        console.error('Error fetching products:', error)
      }
    })

    return { products, errorMessage }
  }
})
</script>

<style>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
