// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export default {
  async createCart(username) {
    let cart = {"id": this.getNewCartId(), "username": username, "items": null}
    this.saveCart(cart)
    return {
      data: cart
    }
  },

  async updateCart(cart) {
    this.saveCart(cart)
    return {
      data: cart
    }
  },

  async getCartById(cartID) {
    let cart = this.getCart(cartID)
    return {
      data: cart
    }
  },

  getNewCartId() {
    let cartId = parseInt(localStorage.getItem("cartId") ?? "0")
    let newCartId = `${cartId + 1}`
    localStorage.setItem("cartId", newCartId)
    return newCartId;
  },

  saveCart(cart) {
    let carts = this.getAllCarts() ?? {}
    carts[cart.id] = cart
    localStorage.setItem("carts", JSON.stringify(carts))
  },

  getCart(cartID) {
    let carts = this.getAllCarts()
    if (carts !== null) {
      return carts[cartID];
    } else {
      return {}
    }
  },

  getAllCarts() {
    let res = localStorage.getItem("carts") ?? ""
    if (res !== "") {
      return JSON.parse(res);
    } else {
      return null
    }
  },

  async getLatestCart() {
    let cartId = parseInt(localStorage.getItem("cartId") ?? "0")
    if (cartId > 0) {
      let res = await this.getCartById(cartId)
      return {
        data: [res.data]
      }
    } else {
      return {
        data: []
      }
    }
  }
}
