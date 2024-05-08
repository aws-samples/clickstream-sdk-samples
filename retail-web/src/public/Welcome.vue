<template>
  <Layout :showNav="false" :showFooter="false" :showTextAlerts="false" :showDemoGuide="false" backgroundColor="var(--aws-squid-ink)">
    <div class="container mb-2 text-left">
      <h2 class="heading my-5 text-center">Welcome to the Retail Demo Store!</h2>

      <p>
        Welcome to our retail demo store! Browse products, add to cart, and checkout effortlessly.
      </p>

      <p>
        You can also easily configure Clickstream Web SDK to send data to your ingestion server.
      </p>

      <div class="mt-2 d-flex flex-column flex-lg-row align-items-lg-center">
        <div class="mb-2 mb-lg-0">AWS Services Included:</div>

        <ul
            class="service-list mb-0 pl-0 flex-grow-1 d-flex flex-column flex-lg-row justify-content-lg-around font-weight-bold"
        >
          <li v-for="service in services" :key="service.text" class="mb-2 mb-lg-0">
            <ServiceBadge :text="service.text" :src="service.src"></ServiceBadge>
          </li>
        </ul>
      </div>

      <div class="mt-2 mb-4 my-sm-5 d-flex flex-column align-items-center align-items-sm-end">
        <div class="d-flex flex-column flex-sm-row align-items-center">
          <router-link to="/" class="create-account mt-3 mt-sm-0 ml-sm-3 btn btn-primary"
          >Start Shopping</router-link
          >
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue'
import ServiceBadge from './components/ServiceBadge.vue';

export default {
  name: 'Welcome',
  components: {
    Layout,
    ServiceBadge,
  },
  data() {
    return {
      services: [
        {
          text: 'Amazon Personalize',
          src: '/personalize.svg',
        },
        {
          text: 'Amazon Pinpoint',
          src: '/pinpoint.svg',
        },
        {
          text: 'Amazon Lex',
          src: '/lex.svg',
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 10vh;
  color: var(--white);
}

.service-list {
  list-style-type: none;
}

.sign-in,
.skip-login {
  color: var(--amazon-orange);
}

.create-account {
  border-color: var(--amazon-orange);
  border-radius: 4px;
  background: var(--amazon-orange);
}

.create-account:hover,
.create-account:focus {
  background: var(--amazon-orange-light);
  border-color: var(--amazon-orange-light);
}
</style>
