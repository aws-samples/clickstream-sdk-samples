// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export default {

  saveOrder(order) {
    let allOrders = JSON.parse(localStorage.getItem("allOrders") ?? "{}")
    if (!allOrders[order.username]) {
      allOrders[order.username] = []
    }
    allOrders[order.username].push(order)
    localStorage.setItem("allOrders", JSON.stringify(allOrders))
  },

  getOrderByName(name) {
    let allOrders = localStorage.getItem("allOrders")
    if (allOrders) {
      return JSON.parse(allOrders)[name] ?? []
    } else {
      return []
    }
  },
}
