<template>
  <div class="product-virtualized-list">
    <input v-model="searchQuery" type="text" placeholder="Search" class="product-virtualized-list__search-input"/>
    <div
      ref="container"
      class="product-virtualized-list__container"
      @scroll="onScroll"
      :style="{ height: containerHeight + 'px' }"
    >
      <label v-if="errorMessage" class="product-virtualized-list__error">{{ errorMessage }}</label>
      <ul v-else class="product-virtualized-list__content" :style="{ height: totalContentHeight + 'px' }">
        <transition-group name="list" tag="li">
          <li
            v-for="(item, index) in visibleItems"
            :key="item.id"
            class="product-virtualized-list__item virtualized-item"
            :style="{
              top: itemPositions[index] + 'px',
              height: itemHeight + 'px'
            }"
          >
            <slot :item="item">
            </slot>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

interface ProductItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
}

export default defineComponent({
  name: 'ProductVirtualizedList',
  props: {
    items: {
      type: Array as () => ProductItem[],
      required: true
    },
    itemHeight: {
      type: Number,
      required: true
    },
    containerHeight: {
      type: Number,
      required: true
    },
    bufferSize: {
      type: Number,
      default: 5
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const container = ref<HTMLElement | null>(null)
    const scrollTop = ref(0)
    const searchQuery = ref('')
    const filteredItems = computed(() => {
      return props.items.filter((item: ProductItem) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const totalContentHeight = computed(() => filteredItems.value.length * props.itemHeight)

    const visibleItemCount = computed(() => {
      return Math.ceil(props.containerHeight / props.itemHeight) + props.bufferSize
    })

    const startIndex = computed(() => {
      return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.bufferSize)
    })

    const endIndex = computed(() => {
      return Math.min(
        filteredItems.value.length,
        startIndex.value + visibleItemCount.value + props.bufferSize
      )
    })

    const visibleItems = computed(() => {
      return filteredItems.value.slice(startIndex.value, endIndex.value)
    })

    const itemPositions = computed(() => {
      return visibleItems.value.map((_, index: number) => {
        return (startIndex.value + index) * props.itemHeight
      })
    })

    const onScroll = () => {
      if (container.value) {
        scrollTop.value = container.value.scrollTop
      }
    }

    onMounted(() => {
      if (container.value) {
        scrollTop.value = container.value.scrollTop
      }
    })

    return {
      container,
      onScroll,
      totalContentHeight,
      visibleItems,
      itemPositions,
      searchQuery
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
.product-virtualized-list {
  width: 550px;
  &__search-input {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    padding: 8px 16px;
    border: 1px solid vars.$primaryGreyColor;
    border-radius: 24px;
    box-sizing: border-box;
  }
  &__container {
    position: relative;
    overflow-y: auto;
    border-radius: 24px;
    background-color: vars.$primaryWhiteColor;
    scrollbar-gutter: stable;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 191, 165, 0.25);
      border-radius: 10px;
      border: 4px solid transparent;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
  &__error {
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 24px;
    color: vars.$primaryRedColor;
  }
  &__item {
    position: absolute;
    left: 0;
    right: 0;
    box-sizing: border-box;
    opacity: 1;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
