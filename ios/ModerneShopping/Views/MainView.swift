//
//  MainView.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-02.
//

import AdSupport
import AppTrackingTransparency
import Clickstream
import SwiftUI

struct MainView: View {
    @StateObject var products = ProductsListObject()
    @StateObject var cartItems = CartViewModel()
    @StateObject var user = UserViewModel()
    var body: some View {
        TabView {
            HomeView(productsList: products, user: user).environmentObject(cartItems)
                .tabItem {
                    Image(systemName: "house")
                    Text("Home")
                }.onAppear {
                    let attribute: ClickstreamAttribute = [
                        "tab_name": "home_tab"
                    ]
                    ClickstreamAnalytics.recordEvent("view_home", attribute)
                    AppDelegate.addEvent()
                }
            CartView(cartProducts: cartItems)
                .environmentObject(user)
                .tabItem {
                    Image(systemName: "cart")
                    Text("Cart")
                }.onAppear {
                    let attribute: ClickstreamAttribute = [
                        "tab_name": "cart_tab"
                    ]
                    ClickstreamAnalytics.recordEvent("view_cart", attribute)
                    AppDelegate.addEvent()
                }
            ProfilView()
                .environmentObject(user)
                .tabItem {
                    Image(systemName: "person")
                    Text("Profile")
                }.onAppear {
                    let attribute: ClickstreamAttribute = [
                        "tab_name": "profile_tab"
                    ]
                    ClickstreamAnalytics.recordEvent("view_profile", attribute)
                    AppDelegate.addEvent()
                }
        }
        .zIndex(10)
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
//                requestIDFAPermission()
            }
        }
    }

    enum Tab {
        case home, cart, profile
    }

    func requestIDFAPermission() {
        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization { status in
                let isAuthorized = (status == .authorized)
                print("isAuthorized: " + String(describing: isAuthorized))
            }
        } else {}
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
