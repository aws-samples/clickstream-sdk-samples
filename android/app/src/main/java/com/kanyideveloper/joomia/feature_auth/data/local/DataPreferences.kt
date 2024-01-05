package com.kanyideveloper.joomia.feature_auth.data.local

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.kanyideveloper.joomia.feature_auth.data.dto.UserResponseDto
import com.kanyideveloper.joomia.feature_auth.util.Constants.AUTH_KEY
import com.kanyideveloper.joomia.feature_auth.util.Constants.PRODUCTS_DATA
import com.kanyideveloper.joomia.feature_auth.util.Constants.USER_DATA
import com.kanyideveloper.joomia.feature_products.domain.model.Product
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class DataPreferences(private val dataStore: DataStore<Preferences>, private val gson: Gson) {

    suspend fun saveAccessToken(accessToken: String) {
        dataStore.edit { preferences ->
            preferences[AUTH_KEY] = accessToken
        }
    }

    val getAccessToken: Flow<String> = dataStore.data.map { preferences ->
        preferences[AUTH_KEY] ?: ""
    }

    suspend fun clearAccessToken() {
        dataStore.edit { preferences ->
            preferences[AUTH_KEY] = ""
        }
    }

    suspend fun saveUserdata(user: UserResponseDto) {
        dataStore.edit { preferences ->
            preferences[USER_DATA] = gson.toJson(user)
        }
    }

    val getUserData: Flow<String> = dataStore.data.map { preferences ->
        preferences[USER_DATA] ?: ""
    }

    suspend fun saveProducts(products: List<Product>) {
        dataStore.edit { preferences ->
            preferences[PRODUCTS_DATA] = gson.toJson(products)
        }
    }

    val getProducts: Flow<List<Product>> = dataStore.data.map { preferences ->
        val listType = object : TypeToken<List<Product>>() {}.type
        gson.fromJson(preferences[PRODUCTS_DATA], listType) ?: emptyList()
    }
}