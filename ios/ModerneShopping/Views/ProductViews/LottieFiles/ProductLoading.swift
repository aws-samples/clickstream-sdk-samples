//
//  ProductLoading.swift
//  ModerneShopping
//
//  Created by Djallil Elkebir on 2021-09-06.
//

import SwiftUI
import Lottie

struct ProductLoading: UIViewRepresentable {
    
    var animationView = LottieAnimationView()
    
    func makeUIView(context: UIViewRepresentableContext<ProductLoading>) -> UIView {
        let view = UIView(frame: .zero)
        
        animationView.animation = LottieAnimation.named("productLoading")
        animationView.contentMode = .scaleAspectFit
        animationView.loopMode = .loop
        animationView.play()
        animationView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(animationView)
        NSLayoutConstraint.activate([ animationView.heightAnchor.constraint(equalTo: view.heightAnchor), animationView.widthAnchor.constraint(equalTo: view.widthAnchor)])
        return view
    }
    func updateUIView(_ uiView: UIView, context: UIViewRepresentableContext<ProductLoading>) {
        
    }
}
