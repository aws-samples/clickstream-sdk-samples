//
//  ProductListItem.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-02.
//

import Clickstream
import SwiftUI

struct ProductListItem: View {
    let product: Product
    var body: some View {
        VStack {
            SmallProductImage(imageURL: product.imageURL)
            Text(product.title)
                .foregroundColor(.darkText)
                .bold()
                .lineLimit(2)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            Text("\(product.price.format(f: ".2"))$").bold()
                .foregroundColor(.darkText)
            HStack(spacing: 2) {
                Text("\(product.formatedRating)").font(.title3)
                    .foregroundColor(.darkText)
                Text("(\(product.rating.count))").font(.caption2)
                    .foregroundColor(.secondary)
                    .offset(y: 3)
            }
        }.padding(8).onAppear {
            let attributes: ClickstreamAttribute = [
                ClickstreamAnalytics.Item.ITEM_ID: "123",
                ClickstreamAnalytics.Item.CURRENCY: "USD",
            ]
            let item_product: ClickstreamAttribute = [
                ClickstreamAnalytics.Item.ITEM_ID: product.id,
                ClickstreamAnalytics.Item.ITEM_NAME: product.title,
                ClickstreamAnalytics.Item.PRICE: product.price,
                ClickstreamAnalytics.Item.ITEM_CATEGORY: product.category,
                "place_of_origin": "USA",
            ]
            ClickstreamAnalytics.recordEvent("product_exposure", attributes, [item_product])
            AppDelegate.addEvent()
        }
    }
}

struct ProductListItem_Previews: PreviewProvider {
    static var previews: some View {
        ProductListItem(product: Product.sampleProducts[0])
    }
}

struct SmallProductImage: View {
    @StateObject private var imageLoader = ImageLoader()
    let imageURL: URL
    var body: some View {
        ZStack {
            Rectangle()
                .fill(Color.white)
                .frame(width: 170, height: 190, alignment: .center)
                .cornerRadius(12)
                .overlay(
                    ZStack {
                        ProgressView()
                        if imageLoader.image != nil {
                            HStack {
                                Spacer()
                                Image(uiImage: imageLoader.image!)
                                    .resizable()
                                    .compositingGroup()
                                    .aspectRatio(contentMode: .fit)
                                Spacer()
                            }
                        }
                    }.padding()
                )
        }
        .cornerRadius(12)
        .shadow(color: .gray, radius: 2, x: /*@START_MENU_TOKEN@*/0.0/*@END_MENU_TOKEN@*/, y: /*@START_MENU_TOKEN@*/0.0/*@END_MENU_TOKEN@*/)
        .onAppear {
            imageLoader.loadImage(with: imageURL)
        }
    }
}
