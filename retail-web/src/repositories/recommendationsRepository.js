// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import resolveBaseURL from './resolveBaseURL'
import localProductsRepository from "@/repositories/localProductsRepository";

const baseURL = resolveBaseURL(
  import.meta.env.VITE_RECOMMENDATIONS_SERVICE_DOMAIN,
  import.meta.env.VITE_RECOMMENDATIONS_SERVICE_PORT,
  import.meta.env.VITE_RECOMMENDATIONS_SERVICE_PATH
)

const connection = axios.create({
  baseURL
})

const popular = "/popular"
const related = "/related"
const recommendations = "/recommendations"
const rerank = "/rerank"
const chooseDiscounted = "/choose_discounted"
const couponOffer = "/coupon_offer"
const experimentOutcome = "/experiment/outcome"

export default {
  getPopularProducts(userID, currentItemID, numResults, feature) {
    let params = {
      userID: userID,
      currentItemID: currentItemID,
      numResults: numResults,
      feature: feature
    }
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return localProductsRepository.getPopularProducts();
    } else {
      return connection.get(popular, {params: params})
    }
  },
  getRelatedProducts(userID, currentItemID, currentItemCategory, numResults, feature) {
    let params = {
      userID: userID,
      currentItemID: currentItemID,
      currentItemCategory: currentItemCategory,
      numResults: numResults,
      feature: feature
    }
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return localProductsRepository.getRelatedProducts(currentItemCategory);
    } else {
      return connection.get(related, {params: params})
    }
  },
  getRecommendationsForUser(userID, currentItemID, numResults, feature) {
    let params = {
      userID: userID,
      currentItemID: currentItemID,
      numResults: numResults,
      feature: feature
    }
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return localProductsRepository.getRecommendationsForUser();
    } else {
      return connection.get(recommendations, {params: params})
    }
  },
  getRerankedItems(userID, items, feature) {
    let payload = {
      userID: userID,
      items: items,
      feature: feature
    }
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return {
        data: items
      }
    } else {
      return connection.post(rerank, payload)
    }
  },
  chooseDiscounts(userID, items, feature) {
    let payload = {
      userID: userID,
      items: items,
      feature: feature
    }
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return Promise.resolve({
        data: []
      })
    } else {
      return connection.post(chooseDiscounted, payload) // inserts discount and discounted keys into items
    }
  },
  getCouponOffer(userID) {
    return connection.get(`${couponOffer}?userID=${userID}`)
  },
  recordExperimentOutcome(correlationId) {
    let payload = {
      correlationId: correlationId
    }
    return connection.post(experimentOutcome, payload)
  }
}
