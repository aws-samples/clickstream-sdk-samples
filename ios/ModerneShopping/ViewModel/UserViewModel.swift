//
//  UserViewModel.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-06.
//

import Clickstream
import SwiftUI

class UserViewModel: ObservableObject {
    @Published var user: UserAPIResults?
    @Published var isLoading = false
    @Published var error: NSError?
    @Published var isLoggedin = false
    @Published var login = "admin@admin.com"
    @Published var password = "admin"
    @Published var isNameValid: Bool? = nil
    @Published var isPasswordValid: Bool? = nil

    private let userServices: APIServicesProtocol

    init(userServices: APIServicesProtocol = APIServices.shared) {
        self.userServices = userServices
    }

    /// Calling the API Service VM Getting a user through random generated user API
    func loadUser() {
        // setting the user to nil to load a fresh one
        user = nil
        // showing the spining loading view, using the main thread for UI Work
        DispatchQueue.main.async {
            self.isLoading = true
        }
        // calling the api function and assigning the user if found
        userServices.fetchUser { result in
            DispatchQueue.main.async {
                self.isLoading = true
            }
            switch result {
            case .success(let response):
                DispatchQueue.main.async {
                    self.user = response
                    self.isLoading = false
                    if let userAPIResults: UserAPIResults = self.user {
                        let user = userAPIResults.results[0]
                        ClickstreamAnalytics.setUserId(user.login.uuid)
                        let userAttribute = [
                            "_user_name": user.name.first + " " + user.name.last,
                            "_user_email": user.email,
                            "_user_gender": user.gender,
                            "_user_country": user.location.country,
                            "_user_city": user.location.city
                        ]
                        ClickstreamAnalytics.addUserAttributes(userAttribute)
                        ClickstreamAnalytics.recordEvent("user_login")
                        AppDelegate.addEvent()
                    }
                }
            case .failure(let error):
                DispatchQueue.main.async {
                    print(error)
                    self.error = error as NSError
                }
            }
        }
    }

    /// signing out and reseting the login view
    func signout() {
        isLoading = true
        isNameValid = nil
        isPasswordValid = nil
        // Delaying the logout to see the Loading animation
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.user = nil
            self.isLoading = false
        }
        ClickstreamAnalytics.setUserId(nil)
    }

    /// validate if the username respect our conditions
    /// - Parameter name: username
    func validateName(name: String) {
        guard name.count > 5, name.count < 24 else {
            withAnimation {
                isNameValid = false
            }
            return
        }
        guard name.contains("@") else {
            withAnimation {
                isNameValid = false
            }
            return
        }
        withAnimation {
            isNameValid = true
        }
    }

    /// validate if the password respect our conditions
    /// - Parameter name: password
    func validatePassword(name: String) {
        guard name.count >= 5, name.count < 24 else {
            withAnimation {
                isPasswordValid = false
            }
            return
        }
        withAnimation {
            isPasswordValid = true
        }
    }
}
