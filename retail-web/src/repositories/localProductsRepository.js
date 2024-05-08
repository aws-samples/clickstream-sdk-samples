// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import yaml from 'yaml'
import localUsersRepository from "@/repositories/localUsersRepository";

const categoryProducts = {}
let allProducts = []
const featuredProducts = []

const category = ['apparel', 'beauty', 'books', 'electronics', 'floral',
  'footwear', 'furniture', 'groceries', 'homedecor', 'housewares', 'instruments',
  'jewelry', 'outdoors', 'seasonal', 'tools', 'cold dispensed', 'salty snacks',
  'hot dispensed']

const allCategory = [
  {
    "id": "18",
    "name": "cold dispensed",
  },
  {
    "id": "16",
    "name": "tools",
  },
  {
    "id": "2",
    "name": "footwear",
  },
  {
    "id": "13",
    "name": "books",
  },
  {
    "id": "8",
    "name": "housewares",
  },
  {
    "id": "9",
    "name": "homedecor",
  },
  {
    "id": "1",
    "name": "apparel",
  },
  {
    "id": "6",
    "name": "jewelry",
  },
  {
    "id": "5",
    "name": "beauty",
  },
  {
    "id": "4",
    "name": "electronics",
  },
  {
    "id": "19",
    "name": "food service",
  },
  {
    "id": "7",
    "name": "accessories",
  },
  {
    "id": "11",
    "name": "seasonal",
  },
  {
    "id": "3",
    "name": "outdoors",
  },
  {
    "id": "20",
    "name": "salty snacks",
  },
  {
    "id": "12",
    "name": "floral",
  },
  {
    "id": "17",
    "name": "hot dispensed",
  },
  {
    "id": "10",
    "name": "furniture",
  },
  {
    "id": "15",
    "name": "instruments",
  },
  {
    "id": "14",
    "name": "groceries",
  }
]
export default {
  async getAllProducts() {
    if (allProducts.length > 0) {
      return categoryProducts
    } else {
      let response = await fetch('/data/products.yaml')
      allProducts = yaml.parse(await response.text());
      for (let i = 0; i < allProducts.length; i++) {
        if (categoryProducts[allProducts[i].category] === undefined) {
          categoryProducts[allProducts[i].category] = []
        }
        categoryProducts[allProducts[i].category].push(allProducts[i])
        if (allProducts[i].featured) {
          featuredProducts.push(allProducts[i])
        }
      }
      return categoryProducts
    }
  },

  async getPopularProducts() {
    await this.getAllProducts()
    let products1 = categoryProducts[category[0]].slice(0, 4)
    let products2 = categoryProducts[category[1]].slice(0, 4)
    let products3 = categoryProducts[category[3]].slice(0, 4)
    let products = [];
    products.push(...products1, ...products2, ...products3)
    let popularProducts = []
    products.forEach(function (item) {
      popularProducts.push(
        {
          "product": item
        }
      )
    });
    return {
      data: popularProducts
    }
  },

  async getRecommendationsForUser() {
    await this.getAllProducts()
    let userData = await localUsersRepository.getCurrentUser()
    let categoryArray = userData.data.persona.split('_')
    let products1 = categoryProducts[categoryArray[0]].slice(0, 4)
    let products2 = categoryProducts[categoryArray[1]].slice(0, 4)
    let products3 = categoryProducts[categoryArray[2]].slice(0, 4)
    let products = [];
    products.push(...products1, ...products2, ...products3)
    let popularProducts = []
    products.forEach(function (item) {
      popularProducts.push(
        {
          "product": item
        }
      )
    });
    return {
      data: popularProducts
    }
  },

  async getFeaturedProducts() {
    await this.getAllProducts()
    return {
      data: featuredProducts
    }
  },

  async getProductByID(productId) {
    await this.getAllProducts()
    let allSearchProducts = []
    for (let i = 0; i < allProducts.length; i++) {
      if (productId.includes(allProducts[i].id)) {
        if (productId.includes(',')) {
          allSearchProducts.push(allProducts[i])
        } else {
          return {
            data: allProducts[i]
          }
        }
      }
    }
    if (allSearchProducts.length > 0) {
      return {
        data: allSearchProducts
      }
    }
    return {
      data: {}
    }
  },

  async getProductsByCategory(category) {
    await this.getAllProducts()
    return {
      data: categoryProducts[category]
    }
  },

  async getRelatedProducts(category) {
    await this.getAllProducts()
    let products = this.getRandomItems(categoryProducts[category], 8)
    let relatedProducts = []
    products.forEach(function (item) {
      relatedProducts.push(
        {
          "product": item
        }
      )
    });
    return {
      data: relatedProducts
    }
  },

  getProductBySearchName(name, size) {
    let itemId = ''
    let itemIdArr = []
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name.trim().toLowerCase().includes(name.trim().toLowerCase())) {
        itemId = allProducts[i].id
        itemIdArr.push({
          itemId: itemId
        })
        if (itemIdArr.length === size) {
          break
        }
      }
    }
    return {
      data: itemIdArr
    }
  },

  async getAllCategories() {
    return {
      data: allCategory
    }
  },

  getRandomItems(array, count) {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}
