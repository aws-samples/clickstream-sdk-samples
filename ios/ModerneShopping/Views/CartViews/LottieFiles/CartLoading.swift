//
//  CartLoading.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-06.
//

import Lottie
import SwiftUI

struct CartLoading: UIViewRepresentable {
    let animationView = LottieAnimationView()

    func makeUIView(context: UIViewRepresentableContext<CartLoading>) -> UIView {
        let view = UIView(frame: .zero)

        animationView.animation = LottieAnimation.named("cartloading")
        animationView.contentMode = .scaleAspectFit
        animationView.loopMode = .repeat(1)
        animationView.play { _ in
            /// Animation stopped
            animationView.currentProgress = 0.5
            animationView.pause()
        }
        animationView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(animationView)
        NSLayoutConstraint.activate([animationView.heightAnchor.constraint(equalTo: view.heightAnchor), animationView.widthAnchor.constraint(equalTo: view.widthAnchor)])
        return view
    }

    func updateUIView(_ uiView: UIView, context: UIViewRepresentableContext<CartLoading>) {}
}
