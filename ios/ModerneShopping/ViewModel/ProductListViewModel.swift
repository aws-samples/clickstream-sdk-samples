//
//  ProductListViewModel.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-02.
//

import Foundation

class ProductsListObject: ObservableObject {
    @Published var products: [Product]?
    @Published var AllProducts: [String: [Product]] = [:]
    @Published var isLoading = false
    @Published var error: NSError?
    
    var featuredProduct: [Product] {
        var fProducts: [Product] = []
        if let products {
            if products.count >= 4 {
                fProducts = products[0 ... 3].shuffled()
            }
        }
        return fProducts
    }
    
    /// Getting the api services singleton
    private let productListServices: APIServicesProtocol
    
    init(productServices: APIServicesProtocol = APIServices.shared) {
        self.productListServices = productServices
    }
    
    /// Call the api services to get the product needed
    /// - Parameter url: category of products
    func loadProducts(with url: ProductListEndpoint) {
        if AllProducts[url.description] != nil {
            products = AllProducts[url.description]
            return
        }
        products = nil
        DispatchQueue.main.async {
            self.isLoading = true
        }
        productListServices.fetchProducts(from: url) { result in
            DispatchQueue.main.async {
                self.isLoading = true
            }
            switch result {
            case .success(let response):
                DispatchQueue.main.async {
                    self.products = response
                    self.AllProducts[url.description] = self.products
                    self.isLoading = false
                }
            case .failure(let error):
                DispatchQueue.main.async {
                    self.error = error as NSError
                    print(error.localizedDescription)
                }
            }
        }
    }
}
