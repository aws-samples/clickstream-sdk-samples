//
//  AppDelegate.swift
//  ModerneShopping
//
//  Created by Zhu, Xiaowei on 2023/5/24.
//
import UIKit

class AppDelegate: NSObject, UIApplicationDelegate {
    public static var allEventNumber: Int = 0
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        AppDelegate.allEventNumber = UserDefaults.standard.integer(forKey: "allEventNumber")
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
