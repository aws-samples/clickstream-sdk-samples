<template>
  <div class="featured-product d-flex flex-column justify-content-between text-left">
    <router-link
        class="link"
        :to="{
        name: 'ProductDetail',
        params: { id: product.id },
        query: { feature, exp: experimentCorrelationId },
      }"
    >
      <div>
        <div class="position-relative">
          <div v-if="promotionName != null" class="small promoted-product-banner">Promoted</div>
          <img :src="productImageURL" class="card-img-top" :alt="product.name"/>
        </div>

        <div class="p-3">
          <div class="product-name">{{ product.name }}</div>
          <FiveStars></FiveStars>
          <div>{{ formattedPrice }}</div>
          <div v-if="experiment" class="experiment mt-1 align-items-center text-muted small">
            <i class="scale-icon fa fa-balance-scale mr-1"></i> {{ experimentDescription }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import {getProductImageUrl} from '@/util/getProductImageUrl';
import {formatPrice} from '@/util/formatPrice';

import FiveStars from '../../components/FiveStars/FiveStars.vue';
import {AnalyticsHandler} from '@/analytics/AnalyticsHandler';

const getFullExperimentType = (type) => {
  switch (type) {
    case 'ab':
      return 'Experiment: A/B';
    case 'interleaving':
      return 'Experiment: Interleaved';
    case 'mab':
      return 'Experiment: Multi-Armed Bandit';
    case 'optimizely':
      return 'Experiment: Optimizely';
    case 'evidently':
      return 'Experiment: Evidently';
    default:
      return 'Experiment: Unknown';
  }
};

export default {
  name: 'Product',
  components: {
    FiveStars,
  },
  props: {
    product: {type: Object, required: true},
    experiment: {type: Object, required: false},
    promotionName: {type: String, required: false},
    feature: {type: String, required: true},
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(this.handleIntersection, options);
    const productCard = this.$el;
    observer.observe(productCard);
  },
  data() {
    return {};
  },
  computed: {
    handleIntersection() {
      return (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Record Product exposure event
            AnalyticsHandler.productExposure(this.product, this.feature)
          }
        });
      };
    },
    productImageURL() {
      return getProductImageUrl(this.product);
    },
    formattedPrice() {
      return formatPrice(this.product.price);
    },
    experimentCorrelationId() {
      return this.experiment?.correlationId;
    },
    experimentDescription() {
      if (!this.experiment) return null;

      return `${getFullExperimentType(this.experiment.type)}; Variation: ${this.experiment.variationIndex}`;
    },
  },
};
</script>

<style scoped>
.link {
  color: inherit;
}

.link:hover {
  text-decoration: none;
}

.featured-product {
  border: 1px solid var(--grey-300);
  text-decoration: none;
  color: inherit;
}

.promoted-product-banner {
  float: left;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  color: white;
  background-color: var(--blue-500);
  text-align: center;
}

.product-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scale-icon {
  color: var(--blue-600);
}
</style>
