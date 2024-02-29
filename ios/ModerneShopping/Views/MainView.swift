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
        let homeView = HomeView(productsList: products, user: user).environmentObject(cartItems)
        TabView {
            homeView
                .tabItem {
                    Image(systemName: "house")
                    Text("Home")
                        .accessibilityIdentifier("Home")
                }.onAppear {
                    let attribute: ClickstreamAttribute = [
                        "tab_name": "home_tab"
                    ]
                    ClickstreamAnalytics.recordEvent("view_home", attribute)
                    ClickstreamAnalytics.recordEvent(ClickstreamAnalytics.EventName.SCREEN_VIEW, [
                        ClickstreamAnalytics.Attr.SCREEN_NAME: "HomeView",
                        ClickstreamAnalytics.Attr.SCREEN_UNIQUE_ID: "homeViewId"
                    ])
                    AppDelegate.addEvent()
                }
            CartView(cartProducts: cartItems)
                .environmentObject(user)
                .tabItem {
                    Image(systemName: "cart")
                    Text("Cart")
                        .accessibilityIdentifier("Cart")
                }.onAppear {
                    let attribute: ClickstreamAttribute = [
                        "tab_name": "cart_tab"
                    ]
                    ClickstreamAnalytics.recordEvent("view_cart", attribute)
                    ClickstreamAnalytics.recordEvent(ClickstreamAnalytics.EventName.SCREEN_VIEW, [
                        ClickstreamAnalytics.Attr.SCREEN_NAME: "CartView",
                        ClickstreamAnalytics.Attr.SCREEN_UNIQUE_ID: "cartViewId"
                    ])
                    AppDelegate.addEvent()
                }
            ProfilView()
                .environmentObject(user)
                .tabItem {
                    Image(systemName: "person")
                    Text("Profile")
                        .accessibilityIdentifier("Profile")
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
