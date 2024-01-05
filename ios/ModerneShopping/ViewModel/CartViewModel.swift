//
//  CartViewModel.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-03.
//

import Clickstream
import SwiftUI

class CartViewModel: ObservableObject {
    @Published var cartProduct: [Product] = []
    @Published var cartProductDic: [Product: Int] = [:]
    @Published var totalPrice: Double = 0
    @Published var showShowcaseSheet: Bool = false

    /// adding a product with the quantity on our cart
    /// - Parameters:
    ///   - addedProduct: product we want to add
    ///   - quantity: quantity of product we want to add
    func addToCart(addedProduct: Product, quantity: Int) {
        let attributes: ClickstreamAttribute = [
            "product_id": addedProduct.id,
            "product_title": addedProduct.title,
            "product_price": addedProduct.price,
            "product_category": addedProduct.category,
        ]
        ClickstreamAnalytics.recordEvent("add_to_cart", attributes)
        AppDelegate.addEvent()

        let products = cartProductDic.map(\.key)
        // if we don't have any product we just create it with our quantity and leave the func
        if products.isEmpty {
            withAnimation {
                cartProductDic[addedProduct] = quantity
            }
            return
        }
        for product in products {
            // if we already have the product we check our product and add the quantity
            if addedProduct.id == product.id {
                withAnimation {
                    cartProductDic[product]! += quantity
                }
            } else {
                // if we have products but dont have this one, we create it with the quantity
                if !products.contains(where: { $0.id == addedProduct.id }) {
                    withAnimation {
                        cartProductDic[addedProduct] = quantity
                    }
                }
            }
        }
    }

    func changeQuantity(product: Product, quantity: Int) {
        cartProductDic[product] = quantity
    }

    func calculateTotalPrice() {
        var totalprice: Double = 0
        for (product, quantity) in cartProductDic {
            totalprice += product.price * Double(quantity)
        }
        withAnimation {
            totalPrice = totalprice
        }
    }

    func removeFromCart(toRemove: Product) {
        let attributes: ClickstreamAttribute = [
            "product_id": toRemove.id,
            "product_title": toRemove.title,
            "product_price": toRemove.price,
            "product_category": toRemove.category,
        ]
        ClickstreamAnalytics.recordEvent("cart_delete", attributes)
        AppDelegate.addEvent()
        cartProductDic.removeValue(forKey: toRemove)
    }
}
