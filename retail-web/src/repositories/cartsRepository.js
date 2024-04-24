// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import resolveBaseURL from './resolveBaseURL'
import localCartsRepository from "@/repositories/localCartsRepository";

const baseURL = resolveBaseURL(
  import.meta.env.VITE_CARTS_SERVICE_DOMAIN,
  import.meta.env.VITE_CARTS_SERVICE_PORT,
  import.meta.env.VITE_CARTS_SERVICE_PATH
)

const connection = axios.create({
  baseURL
})

const resource = "/carts";
export default {
  get() {
    console.log("cart get")
    return connection.get(`${resource}`)
  },
  getCartByID(cartID) {
    if (!cartID || cartID.length == 0)
      throw "cartID required"
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return localCartsRepository.getCartById(cartID)
    } else {
      return connection.get(`${resource}/${cartID}`)
    }
  },
  async getCartByUsername(username) {
    console.log("getCartByUsername")
    if (!username || username.length == 0)
      throw "username required"
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return await localCartsRepository.getLatestCart()
    } else {
      return connection.get(`${resource}`, {params: {username: username}})
    }
  },
  createCart(username) {
    if (!username || username.length == 0)
      throw "username required"
    let payload = {
      username: username
    }
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return localCartsRepository.createCart(username)
    } else {
      return connection.post(`${resource}`, payload)
    }
  },
  updateCart(cart) {
    if (!cart)
      throw "cart required"
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return localCartsRepository.updateCart(cart)
    } else {
      return connection.put(`${resource}/${cart.id}`, cart)
    }
  },
  signAmazonPayPayload(payload) {
    console.log("signAmazonPayPayload")
    return connection.post('/sign', payload)
  }
}
