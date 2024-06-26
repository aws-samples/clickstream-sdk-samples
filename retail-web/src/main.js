// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'

import './styles/tokens.css'
import { ClickstreamAnalytics, SendMode, Attr } from '@aws/clickstream-web'
import sensors from 'sa-sdk-javascript'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { AnalyticsLogger } from '@/analytics/AnalyticsLogger'

if (import.meta.env.VITE_CLICKSTREAM_APPID !== ''
  && import.meta.env.VITE_CLICKSTREAM_APPID !== undefined
  && import.meta.env.VITE_CLICKSTREAM_ENDPOINT !== ''
  && import.meta.env.VITE_CLICKSTREAM_ENDPOINT !== undefined) {
  localStorage.setItem('clickstream_appId',
    import.meta.env.VITE_CLICKSTREAM_APPID)
  localStorage.setItem('clickstream_endpoint',
    import.meta.env.VITE_CLICKSTREAM_ENDPOINT)
}

if (import.meta.env.VITE_SENSORDATA_APPID !== ''
  && import.meta.env.VITE_SENSORDATA_APPID !== undefined
  && import.meta.env.VITE_SENSORDATA_ENDPOINT !== ''
  && import.meta.env.VITE_SENSORDATA_ENDPOINT !== undefined) {
  localStorage.setItem('sensor_appId', import.meta.env.VITE_SENSORDATA_APPID)
  localStorage.setItem('sensor_endpoint',
    import.meta.env.VITE_SENSORDATA_ENDPOINT)
}

// Initial Clickstream Web SDK
if (localStorage.getItem('clickstream_appId') !== null) {
  ClickstreamAnalytics.init({
    appId: localStorage.getItem("clickstream_appId"),
    endpoint: localStorage.getItem("clickstream_endpoint"),
    isLogEvents: true,
    sendMode: SendMode.Batch,
    globalAttributes: {
      [Attr.TRAFFIC_SOURCE_SOURCE]: 'amazon',
      [Attr.TRAFFIC_SOURCE_MEDIUM]: 'cpc',
      [Attr.TRAFFIC_SOURCE_CAMPAIGN]: 'summer_promotion',
      [Attr.TRAFFIC_SOURCE_CAMPAIGN_ID]: 'summer_promotion_01',
      [Attr.TRAFFIC_SOURCE_TERM]: 'running_shoes',
      [Attr.TRAFFIC_SOURCE_CONTENT]: 'banner_ad_1',
      [Attr.TRAFFIC_SOURCE_CLID]: 'amazon_ad_123',
      [Attr.TRAFFIC_SOURCE_CLID_PLATFORM]: 'amazon_ads',
    },
  })
}

// Initial Sensor Data Analytics
if (localStorage.getItem("sensor_appId") !== null) {
  sensors.init({
    server_url: localStorage.getItem('sensor_endpoint') + '?appId='
      + localStorage.getItem('sensor_appId') +
      '&platform=Web&testBy=webRetailDemo',
    show_log: true,
    is_track_single_page: true,
    use_client_time: true,
    send_type: 'beacon',
    heatmap: {
      clickmap: 'default',
      scroll_notice_map: 'default',
    },
  })
  sensors.quick('autoTrack')
}

// Initial Firebase Analytics
if (AnalyticsLogger.firebaseEnabled()) {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG.replace(
    /(\w+)(?=:\s*')/g, '"$1"').replace(/'/g, '"')
  const firebaseConfig = JSON.parse(configString)
  console.log(firebaseConfig)
  const firebaseApp = initializeApp(firebaseConfig)
  const analytics = getAnalytics(firebaseApp)
  console.log('Firebase SDK initialized:', analytics)
}

// Initial for Vue
const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
