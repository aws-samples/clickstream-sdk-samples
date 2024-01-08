package com.kanyideveloper.joomia.feature_cart.domain.model

data class CartProduct(
    val id: String,
    val name: String,
    val price: Double,
    val quantity: Int,
    val imageUrl: String,
    val category: String
)
