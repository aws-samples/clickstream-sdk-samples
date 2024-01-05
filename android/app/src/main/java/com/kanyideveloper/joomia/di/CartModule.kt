package com.kanyideveloper.joomia.di

import com.google.gson.Gson
import com.kanyideveloper.joomia.core.util.Constants
import com.kanyideveloper.joomia.feature_auth.data.local.DataPreferences
import com.kanyideveloper.joomia.feature_cart.data.remote.CartApiService
import com.kanyideveloper.joomia.feature_cart.data.repository.CartRepositoryImpl
import com.kanyideveloper.joomia.feature_cart.domain.repository.CartRepository
import com.kanyideveloper.joomia.feature_cart.domain.use_case.GetCartItemsUseCase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object CartModule {

    @Provides
    @Singleton
    fun provideCartApiService(): CartApiService {
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(CartApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideCartRepository(
        cartApiService: CartApiService,
        dataPreferences: DataPreferences
    ): CartRepository {
        return CartRepositoryImpl(
            cartApiService,
            dataPreferences
        )
    }

    @Provides
    @Singleton
    fun provideGetCartItemsUseCase(
        cartRepository: CartRepository,
        dataPreferences: DataPreferences,
        gson: Gson
    ): GetCartItemsUseCase {
        return GetCartItemsUseCase(cartRepository, dataPreferences, gson)
    }
}