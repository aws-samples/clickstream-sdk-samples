<template>
  <div class="dropdown">
    <button
      class="anchor btn d-flex align-items-center font-weight-bold"
      id="categories-dropdown-anchor"
      aria-label="Categories"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span class="d-none d-lg-inline">Shop <i class="fa fa-chevron-down ml-1"></i></span>
      <i class="fa fa-bars d-inline d-lg-none"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="categories-dropdown-anchor">
      <router-link class="dropdown-item" :to="`/configure`">Configure Clickstream</router-link>
      <router-link class="dropdown-item" :to="`/configure/sensor`">Configure SensorData</router-link>
      <router-link class="dropdown-item" :to="`/configure/gtm`">Configure GTM</router-link>
      <hr class="hr-margin"/>
      <router-link class="dropdown-item" :to="`/live`">Live Streams</router-link>
      <hr class="hr-margin"/>
      <div v-if="!categories" class="text-center">
        <LoadingFallback></LoadingFallback>
      </div>
      <template v-else>
        <router-link class="dropdown-item" :to="`/category/featured`">Featured</router-link>
        <router-link
          v-for="(category, i) in categories"
          :key="category.id"
          class="dropdown-item"
          :to="`/category/${category.name}`"
          >{{ formattedCategories[i] }}</router-link
        >
      </template>
    </div>
  </div>
</template>

<script>
import LoadingFallback from '@/components/LoadingFallback/LoadingFallback.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ShopDropdown',
  components: { LoadingFallback },
  computed: {
    ...mapState({ categories: (state) => state.categories.categories }),
    ...mapGetters(['formattedCategories']),
  },
};
</script>

<style scoped>
.anchor {
  font-size: 1.15rem;
}

.fa-bars {
  font-size: 2rem;
}
.hr-margin{
  margin-top: 6px;
  margin-bottom: 6px;
}

.anchor:hover .fa-bars,
.anchor:focus .fa-bars {
  color: var(--blue-600);
}
</style>
