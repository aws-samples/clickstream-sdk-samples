<template>
  <Layout :showNav="false" :showFooter="false" :showTextAlerts="false" :showDemoGuide="false"
          backgroundColor="var(--aws-squid-ink)">
    <div class="container mb-2 text-left">
      <h3 class="heading my-5 text-center">Configure SensorData Web SDK</h3>
      <span>Please fill your appId and endpoint<br>Note: Your pipeline should use third-party SDK and enable SensorDataTransformer</span>
      <div class="mt-2 mb-4 my-sm-5 custom-mt d-flex flex-column align-items-sm-end">
        <div class="input-field input-group">
          <label>AppId</label>
          <input type="text" class="form-control" v-model="appId" @input="inputChanged">
        </div>
        <div class="input-field input-group">
          <label>Endpoint</label>
          <input type="text" class="form-control" v-model="endpoint" @input="inputChanged">
        </div>
        <div class="d-flex flex-column flex-sm-row ">
          <button class="mt-3 mt-sm-0 btn btn-primary"
                  :class="{'create-account-disable': !isSubmitEnable, 'create-account': isSubmitEnable}"
                  @click.prevent="submit">Confirm
          </button>
        </div>
        <router-link to="/" class="mt-3 skip-login btn btn-link" style="padding-right: 0;">Skip configure</router-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue'
import swal from "sweetalert";
import sensors from 'sa-sdk-javascript'

export default {
  name: 'Configure',
  components: {
    Layout,
  },
  data() {
    return {
      appId: '',
      endpoint: '',
      isSubmitEnable: false,
    };
  },
  async created() {
    this.appId = localStorage.getItem("sensor_appId")
    this.endpoint = localStorage.getItem("sensor_endpoint")
    this.inputChanged()
  },
  methods: {
    inputChanged() {
      this.isSubmitEnable = this.appId.length > 0 && this.endpoint.length > 0;
    },
    async submit() {
      if (!this.isSubmitEnable) return
      // config SDK
      localStorage.setItem("sensor_appId", this.appId)
      localStorage.setItem("sensor_endpoint", this.endpoint)

      sensors.init({
        server_url: this.endpoint + '?appId=' + this.appId + '&platform=Web&testBy=webRetailDemo',
        show_log: true,
        is_track_single_page: true,
        use_client_time: true,
        send_type: 'beacon',
        heatmap: {
          clickmap: 'default',
          scroll_notice_map: 'default'
        }
      });
      sensors.quick('autoTrack');
      this.renderSubmitConfirmation()
    },
    renderSubmitConfirmation() {
      swal({
        title: 'Configure Success',
        icon: 'success',
        buttons: {
          startShopping: 'Start Shopping',
        },
      }).then((value) => {
        switch (value) {
          case 'startShopping':
            this.$router.push('/');
        }
      });
    },
  }
};
</script>

<style scoped>
.container {
  margin-top: 10vh;
  color: var(--white);
}

.create-account {
  border-color: var(--amazon-orange);
  border-radius: 4px;
  background: var(--amazon-orange);
}

.create-account-disable {
  border-color: var(--grey-300);
  border-radius: 4px;
  background: var(--grey-300);
}

.create-account:hover,
.create-account:focus {
  background: var(--amazon-orange-light);
  border-color: var(--amazon-orange-light);
}

.input-field {
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
}

.input-field label {
  width: 82px;
  margin-top: 4px;
  color: white;
}

.input-field input {
  flex-grow: 1;
}

.input-group > .form-control {
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}

@media screen and (max-width: 576px) {
  .custom-mt {
    padding-top: 16px;
  }
}
</style>
