//
//  AppDelegate.swift
//  ModerneShopping
//
//  Created by Zhu, Xiaowei on 2023/5/24.
//
import Clickstream
import UIKit

class AppDelegate: NSObject, UIApplicationDelegate {
    public static var allEventNumber: Int = 0
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        AppDelegate.allEventNumber = UserDefaults.standard.integer(forKey: "allEventNumber")
        /// Initialize Clickstream SDK
        do {
            try ClickstreamAnalytics.initSDK()
            let configuration = try ClickstreamAnalytics.getClickstreamConfiguration()
            configuration.isLogEvents = true
            configuration.isTrackScreenViewEvents = false
        } catch {
            print("Failed to initialize ClickstreamAnalytics with \(error)")
        }
        return true
    }

    public static func addEvent() {
        AppDelegate.allEventNumber += 1
        UserDefaults.standard.set(AppDelegate.allEventNumber, forKey: "allEventNumber")
    }
}

extension Date {
    typealias Timestamp = Int64

    var timestamp: Int64 {
        Int64(timeIntervalSince1970 * 1_000)
    }
}
