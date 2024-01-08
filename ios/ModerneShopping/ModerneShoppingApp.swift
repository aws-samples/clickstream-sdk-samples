//
//  ModerneShoppingApp.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-01.
//

import SwiftUI

@main
struct ModerneShoppingApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    var body: some Scene {
        WindowGroup {
            MainView()
        }
    }
}
