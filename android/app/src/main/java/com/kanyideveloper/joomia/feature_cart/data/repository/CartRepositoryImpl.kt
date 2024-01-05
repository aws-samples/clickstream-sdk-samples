package com.kanyideveloper.joomia.feature_cart.data.repository

import com.kanyideveloper.joomia.core.util.Resource
import com.kanyideveloper.joomia.feature_auth.data.local.DataPreferences
import com.kanyideveloper.joomia.feature_cart.data.remote.CartApiService
import com.kanyideveloper.joomia.feature_cart.domain.model.CartProduct
import com.kanyideveloper.joomia.feature_cart.domain.repository.CartRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.runBlocking
import retrofit2.HttpException
import timber.log.Timber
import java.io.IOException

class CartRepositoryImpl(
    private val cartApiService: CartApiService,
    private val dataPreferences: DataPreferences
) : CartRepository {
    override suspend fun getAllCartItems(id: Int): Flow<Resource<List<CartProduct>>> = flow {
        Timber.d("Get all cart items called")
        emit(Resource.Loading())
        try {
            val response = cartApiService.cartItems(id)
            val cartItems = ArrayList<CartProduct>()

            val products = runBlocking { dataPreferences.getProducts.first() }

            if (products.isNotEmpty()) {
                response.forEach { it1 ->
                    it1.cartProductDtos.forEach { it2 ->
                        val product = products.filter { it.id == it2.productId }[0]
                        val cartProduct =
                            CartProduct(
                                product.id.toString(),
                                product.title,
                                product.price,
                                it2.quantity,
                                product.image,
                                product.category
                            )
                        cartItems.add(cartProduct)
                    }
                }
            }
            emit(Resource.Success(cartItems.toList().distinctBy { it.name }))
        } catch (e: IOException) {
            emit(Resource.Error(message = "Could not reach the server, please check your internet connection!"))
        } catch (e: HttpException) {
            emit(Resource.Error(message = "Oops, something went wrong!"))
        }
    }
}