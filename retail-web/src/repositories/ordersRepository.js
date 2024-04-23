// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import resolveBaseURL from './resolveBaseURL'
import localOrderRepository from "@/repositories/localOrderRepository";

const baseURL = resolveBaseURL(
  import.meta.env.VITE_ORDERS_SERVICE_DOMAIN,
  import.meta.env.VITE_ORDERS_SERVICE_PORT,
  import.meta.env.VITE_ORDERS_SERVICE_PATH
)

const connection = axios.create({
  baseURL
})

const resource = "/orders";
export default {
  get() {
    return connection.get(`${resource}/all`)
  },
  getOrderByID(orderID) {
    if (!orderID || orderID.length == 0)
      throw "orderID required"
    return connection.get(`${resource}/id/${orderID}`)
  },
  getOrdersByUsername(username) {
    if (!username || username.length == 0)
      throw "username required"
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      let orders = localOrderRepository.getOrderByName(username)
      console.log(orders)
      return {
        data: orders
      }
    } else {
      return connection.get(`${resource}/username/${username}`)
    }

  },
  updateOrder(order) {
    if (!order)
      throw "order required"
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      localOrderRepository.saveOrder(order)
      return Promise.resolve({
        data: order
      })
    } else {
      return connection.put(`${resource}/id/${order.id}`, order)
    }

  },
  createOrder(order) {
    if (!order)
      throw "order required"
    order.channel = 'WEB'
    order.channel_detail = {
      channel_id: 1,
      channel_geo: 'US'
    }
    delete order.ttl
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      localOrderRepository.saveOrder(order)
      return Promise.resolve({
        data: order
      })
    } else {
      return connection.post(`${resource}`, order)
    }
  },
}
