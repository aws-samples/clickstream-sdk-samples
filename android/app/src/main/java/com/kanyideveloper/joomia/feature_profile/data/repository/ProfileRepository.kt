package com.kanyideveloper.joomia.feature_profile.data.repository

import com.kanyideveloper.joomia.feature_auth.data.local.DataPreferences
import kotlinx.coroutines.flow.Flow

class ProfileRepository(private val dataPreferences: DataPreferences) {
    fun getUserProfile(): Flow<String> {
        return dataPreferences.getUserData
    }
}