package com.kanyideveloper.joomia.di

import com.kanyideveloper.joomia.feature_auth.data.local.DataPreferences
import com.kanyideveloper.joomia.feature_profile.data.repository.ProfileRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object ProfileModule {
    @Provides
    @Singleton
    fun provideProfileRepository(dataPreferences: DataPreferences): ProfileRepository {
        return ProfileRepository(dataPreferences)
    }
}