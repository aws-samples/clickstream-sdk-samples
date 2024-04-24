// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/*
 * Centralized handling of all analytics calls for Pinpoint, Personalize
 * (event tracker), and partner integrations.
 */
import {RepositoryFactory} from '@/repositories/RepositoryFactory'
import {AnalyticsLogger} from "@/analytics/AnalyticsLogger";

const ProductsRepository = RepositoryFactory.get('products')

export const AnalyticsHandler = {
  clearUser() {
    AnalyticsLogger.setUserId(null)
    AnalyticsLogger.log("logout")
  },

  async identify(user) {
    if (!user) {
      return Promise.resolve()
    }

    let promise;

    try {
      let endpoint = {
        userId: user.id,
        optOut: 'NONE',
        userAttributes: {
          Username: [user.username],
          ProfileEmail: [user.email],
          FirstName: [user.first_name],
          LastName: [user.last_name],
          Gender: [user.gender],
          Age: [user.age.toString()],
          Persona: user.persona.split("_")
        },
        attributes: {}
      }

      if (user.sign_up_date) {
        endpoint.attributes.SignUpDate = [user.sign_up_date]
      }

      if (user.last_sign_in_date) {
        endpoint.attributes.LastSignInDate = [user.last_sign_in_date]
      }

      if (user.addresses && user.addresses.length > 0) {
        let address = user.addresses[0]
        endpoint.location = {
          City: address.city,
          Country: address.country,
          PostalCode: address.zipcode,
          Region: address.state
        }
      }
      promise = Promise.resolve()
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      promise = Promise.reject(error)
    }
    let attributes = {
      _user_id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      gender: user.gender,
      age: user.age,
      persona: user.persona,
    };
    AnalyticsLogger.setUserAttributes(attributes);
    return promise
  },

  userSignedUp(user) {
    if (user) {
      let attributes = {
        _user_id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        gender: user.gender,
        age: user.age,
        persona: user.persona,
      };
      AnalyticsLogger.log('sign_up', attributes);
      console.info("user sign up");
    }
  },

  userSignedIn(user) {
    if (user) {
      AnalyticsLogger.setUserId(user.id);
      let attributes = {
        _user_id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        gender: user.gender,
        age: user.age,
        persona: user.persona,
      };
      AnalyticsLogger.setUserAttributes(attributes);
      AnalyticsLogger.log('login', attributes)
      console.info("user sign in")
    }
  },

  identifyExperiment(user, experiment) {
    if (experiment) {
      const attributes = {
        feature: experiment.feature,
        name: experiment.name,
        variation: experiment.variationIndex,
      }
      AnalyticsLogger.log("exp_" + experiment.feature, attributes);
    }
  },

  productAddedToCart(user, cart, product, quantity, feature, experimentCorrelationId) {
    console.info(
      user,
      cart,
      product,
      quantity,
      feature,
      experimentCorrelationId
    );
    const attributes = {
      event_category: feature,
      currency: "USD",
      value: +product.price.toFixed(2),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          quantity: quantity,
          price: +product.price.toFixed(2),
        },
      ],
    }
    AnalyticsLogger.log("add_to_cart", attributes);
  },

  async recordShoppingCart(user, cart) {
    if (user && cart) {
      const hasItem = cart.items.length > 0
      let productImages, productTitles, productURLs;
      if (hasItem) {
        const product = await ProductsRepository.getProduct(cart.items[0].product_id);
        const cartItem = product.data
        productImages = [cartItem.image]
        productTitles = [cartItem.name]
        productURLs = [cartItem.url]
      } else {
        productImages = []
        productTitles = []
        productURLs = []
      }
      console.info("recordShoppingCart:", productImages, productTitles, productURLs)
      return hasItem
    } else {
      return false;
    }
  },

  async recordAbanonedCartEvent(user, cart) {
    console.info(user, cart);
    const hasItem = await this.recordShoppingCart(user, cart);
    if (hasItem) {
      console.info("recordAbanonedCartEvent:", hasItem)
    }
  },

  productRemovedFromCart(user, cart, cartItem, origQuantity) {
    const attributes = {
      currency: "USD",
      value: +cartItem.price.toFixed(2),
      items: [{
        id: cartItem.product_id,
        name: cartItem.product_name,
        category: cartItem.category,
        quantity: origQuantity,
        price: +cartItem.price.toFixed(2),
      }]
    };
    AnalyticsLogger.log("remove_from_cart", attributes);
  },

  productQuantityUpdatedInCart(user, cart, cartItem, change) {
    let eventProperties = {
      cartId: cart.id,
      productId: cartItem.product_id,
      quantity: cartItem.quantity,
      change: change,
      price: +cartItem.price.toFixed(2)
    };
    AnalyticsLogger.log("update_quantity", eventProperties);
  },

  productExposure(product, feature) {
    const attributes = {
      currency: "USD",
      event_category: feature,
      value: +product.price.toFixed(2),
      items: [{
        id: product.id,
        name: product.name,
        category: product.category,
        price: +product.price.toFixed(2),
      }]
    };
    AnalyticsLogger.log("product_exposure", attributes);
  },

  productViewed(user, product, feature, experimentCorrelationId, discount) {
    const attributes = {
      currency: "USD",
      event_category: feature,
      experimentCorrelationId: experimentCorrelationId,
      discount: discount,
      value: +product.price.toFixed(2),
      items: [{
        id: product.id,
        name: product.name,
        category: product.category,
        quantity: 1,
        price: +product.price.toFixed(2),
      }]
    };
    AnalyticsLogger.log("view_item", attributes)
  },

  cartViewed(user, cart, cartQuantity, cartTotal) {
    const attributes = this.getAttributes(cart, cartTotal)
    AnalyticsLogger.log("view_cart", attributes)
  },

  checkoutStarted(user, cart, cartQuantity, cartTotal) {
    const attributes = this.getAttributes(cart, cartTotal)
    AnalyticsLogger.log("begin_checkout", attributes)
  },

  getAttributes(cart, cartTotal) {
    let gaItems = [];
    for (let i in cart.items) {
      gaItems.push({
        id: cart.items[i].product_id,
        name: cart.items[i].product_name,
        category: cart.items[i].category,
        quantity: cart.items[i].quantity,
        price: +cart.items[i].price.toFixed(2),
      });
    }
    return {
      value: +cartTotal.toFixed(2),
      currency: "USD",
      items: gaItems,
    };
  },

  orderCompleted(user, cart, order) {
    let gaItems = [];
    for (let i in order.items) {
      gaItems.push({
        id: order.items[i].product_id,
        name: order.items[i].product_name,
        category: cart.items[i].category,
        quantity: order.items[i].quantity,
        price: +order.items[i].price.toFixed(2),
      });
    }

    const attributes = {
      transaction_id: order.id.toString(),
      value: +order.total.toFixed(2),
      currency: "USD",
      items: gaItems
    };
    AnalyticsLogger.log("purchase", attributes)
  },

  productSearched(user, query, numResults) {
    AnalyticsLogger.log("search", {
      search_term: query,
      reRanked: user ? "true" : "false",
      resultCount: numResults,
    })
  },
}
