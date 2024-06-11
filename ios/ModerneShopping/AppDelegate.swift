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
            let configuration = ClickstreamConfiguration()
                .withLogEvents(true)
                .withInitialGlobalAttributes([
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_SOURCE: "amazon",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_MEDIUM: "cpc",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CAMPAIGN: "summer_promotion",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CAMPAIGN_ID: "123",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_TERM: "running_shoes",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CONTENT: "banner_ad_1",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CLID: "amazon_ad_123",
                    ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CLID_PLATFORM: "amazon_ads",
                    ClickstreamAnalytics.Attr.APP_INSTALL_CHANNEL: "App Store"
                ])
            try ClickstreamAnalytics.initSDK(configuration)
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
