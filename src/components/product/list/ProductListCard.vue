<template>
  <article class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-card__img"/>
    <div class="product-card__detail">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__flex1">
        <span class="product-card__discount">Discount {{ product.discountPercentage }}%</span>
        <span class="product-card__brand">{{ product.brand }}</span>
      </div>
      <div class="product-card__flex2">
        <span class="product-card__price">$ {{ product.price }}</span>
        <div class="product-card__star"><img src="@/assets/img/star-icon.svg" alt="Star icon"></div>
        <span class="product-card__rating">{{ product.rating }}</span>
        <span class="product-card__category">{{ product.category }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ProductListCard',
  props: {
    product: {
      type: Object as PropType<{
        title: string;
        description: string;
        thumbnail: string;
        price: number;
        discountPercentage: number;
        rating: number;
        category: string;
      }>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
.product-card {
  display: flex;
  gap: 24px;
  padding: 10px 20px 0 10px;
  background: white;
  min-height: 200px;
  &__img {
    display: block;
    flex: 0 1 35%;
    min-height: 10px;
    min-width: 10px;
    max-width: 100%;
    object-fit: cover;
  }
  &__detail {
    flex: 0 1 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__description {
    margin-bottom: 20px;
    // Hide part of the text
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
  &__flex1 {
    margin-bottom: 20px;
  }
  &__discount {
    color: red;
    font-weight: 700;
    margin-right: 20px;
  }
  &__brand {
    font-weight: 700;
    color: vars.$mainBgColor;
  }
  &__price {
    color: vars.$mainBgColor;
    font-weight: 700;
    margin-right: 20px;
  }
  &__star {
    display: inline-block;
    margin-right: 5px;
    & img {
      width: 14px;
      height: 14px;
    }
  }
  &__rating {
    color: vars.$mainBgColor;
    font-weight: 700;
    margin-right: 20px;
  }
  &__category {
    background: #12400b;
    color: #42a821;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
  }
}
</style>
