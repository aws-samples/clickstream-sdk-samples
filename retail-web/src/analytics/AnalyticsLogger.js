import {ClickstreamAnalytics} from "@aws/clickstream-web";
import {getAnalytics, logEvent, setUserProperties, setUserId} from "firebase/analytics";
import sensors from "sa-sdk-javascript";

export const AnalyticsLogger = {

  /**
   * Centralized events log method
   * @param eventName
   * @param attributes
   * @param items
   */
  log(eventName, attributes) {
    attributes = attributes ?? {}
    const {["items"]: items, ...mAttributes} = attributes;

    // Clickstream Analytics SDK
    if (this.clickstreamEnabled()) {
      ClickstreamAnalytics.record({
        name: eventName, attributes: mAttributes, items: items
      })
    }

    //SensorData SDK
    if (this.sensorDataAnalyticsEnabled()) {
      if (items) {
        attributes["items"] = JSON.stringify(items)
      }
      sensors.track(eventName, mAttributes)
    }

    //Firebase SDK
    if (this.firebaseEnabled()) {
      const analytics = getAnalytics();
      logEvent(analytics, eventName, attributes);
    }
  },

  setUserAttributes(attributes) {
    // Clickstream SDK
    if (this.clickstreamEnabled()) {
      ClickstreamAnalytics.setUserAttributes(attributes);
    }

    //SensorData SDK
    sensors.setProfile(attributes);

    // Firebase SDK
    if (this.firebaseEnabled()) {
      const analytics = getAnalytics();
      setUserProperties(analytics, attributes);
    }
  },

  setUserId(userId) {
    //Clickstream SDK
    if (this.clickstreamEnabled()) {
      ClickstreamAnalytics.setUserId(userId)
    }
    //Firebase SDK
    if (this.firebaseEnabled()) {
      const analytics = getAnalytics();
      setUserId(analytics, userId);
    }
  },

  firebaseEnabled() {
    return import.meta.env.VITE_FIREBASE_CONFIG !== ""
  },

  clickstreamEnabled() {
    return localStorage.getItem("clickstream_appId") !== null
  },

  sensorDataAnalyticsEnabled() {
    return (
      import.meta.env.VITE_SENSORDATA_APPID !== "" &&
      import.meta.env.VITE_SENSORDATA_APPID !== undefined &&
      import.meta.env.VITE_CLICKSTREAM_ENDPOINT !== "" &&
      import.meta.env.VITE_CLICKSTREAM_ENDPOINT !== undefined
    )
  }

}
