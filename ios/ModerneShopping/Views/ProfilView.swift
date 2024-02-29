//
//  ProfilView.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-05.
//

import Clickstream
import SwiftUI

struct ProfilView: View {
    @EnvironmentObject var userVM: UserViewModel
    @StateObject var imageLoader = ImageLoader()
    var body: some View {
        ZStack {
            VStack {
                if let user = userVM.user {
                    LoggedInView(user: user.results[0])
                        .environmentObject(userVM).onAppear {
                            ClickstreamAnalytics.recordEvent(ClickstreamAnalytics.EventName.SCREEN_VIEW, [
                                ClickstreamAnalytics.Attr.SCREEN_NAME: "LoggedInView",
                                ClickstreamAnalytics.Attr.SCREEN_UNIQUE_ID: "loggedInViewId"
                            ])
                        }
                } else {
                    LoginView().environmentObject(userVM)
                        .onAppear {
                            ClickstreamAnalytics.recordEvent(ClickstreamAnalytics.EventName.SCREEN_VIEW, [
                                ClickstreamAnalytics.Attr.SCREEN_NAME: "LoginView",
                                ClickstreamAnalytics.Attr.SCREEN_UNIQUE_ID: "loginViewId"
                            ])
                        }
                }
            }
            if userVM.isLoading {
                ZStack {
                    Color.background.edgesIgnoringSafeArea(.all)
                    ProductLoading()
                        .frame(width: 80, height: 80, alignment: /*@START_MENU_TOKEN@*/ .center/*@END_MENU_TOKEN@*/)
                }
            }
        }
    }
}

struct ProfilView_Previews: PreviewProvider {
    static var previews: some View {
        ProfilView()
            .environmentObject(UserViewModel())
    }
}
