<template>
  <div>

  </div>
</template>

<script>
import AmplifyStore from "@/store/store";
export default {
  name: "Notifications",
  data() {
    return {
      connection: null,
      cognitoUser: null
    }
  },
  created() {
    this.getCognitoUser()
        .catch(err => console.log(err));
  },
  methods: {
    async getCognitoUser() {
      this.cognitoUser = {
        username: ""
      }
    },
    getProductImageURL(product) {
      if (product.image.includes('://')) {
        return product.image
      } else {
        let root_url = import.meta.env.VITE_IMAGE_ROOT_URL
        return root_url + product.category + '/' + product.image
      }
    }
  },
  computed: {
    user() {
      return AmplifyStore.state.user
    },
  },
  watch: {
    user() {
      if (this.connection) {
        this.connection.close();
      }
    }
  }
}
</script>

<style scoped>

</style>
