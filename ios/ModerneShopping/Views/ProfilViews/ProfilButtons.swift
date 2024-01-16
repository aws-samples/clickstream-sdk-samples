//
//  ProfilButtons.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-06.
//

import Clickstream
import SwiftUI

struct ProfilButtons: View {
    @EnvironmentObject var user: UserViewModel
    @State private var isAccountActive = false
    @State private var isHistoryActive = false
    @State private var isOrdersActive = false

    var body: some View {
        VStack {
            NavigationLink(destination: ZStack {
                Color.background.edgesIgnoringSafeArea(.all)
                Button(action: {
                    isAccountActive = false
                }) {
                    Text("Update Account")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .foregroundColor(.black)
                }.onAppear {
                    ClickstreamAnalytics.recordEvent("update_account_click")
                    AppDelegate.addEvent()
                }
            }, isActive: $isAccountActive) {
                HStack {
                    Text("Update Account")
                    Image(systemName: "slider.horizontal.3")
                }
                .font(.headline)
                .padding()
                .background(Color.secondaryBackground)
                .cornerRadius(12)
                .shadow(color: .accentColor.opacity(0.1), radius: 2, x: 0.5, y: 1)
            }
            NavigationLink(destination: ZStack {
                Color.background.edgesIgnoringSafeArea(.all)
                Button(action: {
                    isHistoryActive = false
                }) {
                    Text("History")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .foregroundColor(.black)
                }.onAppear {
                    ClickstreamAnalytics.recordEvent("history_click")
                    AppDelegate.addEvent()
                }
            }, isActive: $isHistoryActive) {
                HStack {
                    Text("History")
                    Image(systemName: "cart.fill")
                }.font(.headline)
                    .padding()
                    .background(Color.secondaryBackground)
                    .cornerRadius(12)
                    .shadow(color: .accentColor.opacity(0.1), radius: 2, x: 0.5, y: 1)
            }
            NavigationLink(destination: ZStack {
                Color.background.edgesIgnoringSafeArea(.all)
                Button(action: {
                    isOrdersActive = false
                }) {
                    Text("Orders")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .foregroundColor(.black)
                }.onAppear {
                    ClickstreamAnalytics.recordEvent("orders_click")
                    AppDelegate.addEvent()
                }
            }, isActive: $isOrdersActive) {
                HStack {
                    Text("Orders")
                    Image(systemName: "bag.circle")
                }.font(.headline)
                    .padding()
                    .background(Color.secondaryBackground)
                    .cornerRadius(12)
                    .shadow(color: .accentColor.opacity(0.1), radius: 2, x: 0.5, y: 1)
            }
            Button(action: { withAnimation { user.signout() }}) {
                HStack {
                    Text("Sign out")
                    Image(systemName: "person.crop.circle.fill.badge.xmark")
                }.font(.headline)
                    .padding()
                    .background(Color.secondaryBackground)
                    .cornerRadius(12)
                    .shadow(color: .accentColor.opacity(0.1), radius: 2, x: 0.5, y: 1)
            }.accessibilityIdentifier("sign_out")
        }.padding()
            .navigationBarTitleDisplayMode(.inline)
    }
}

struct ProfilButtons_Previews: PreviewProvider {
    static var previews: some View {
        ProfilButtons()
    }
}
