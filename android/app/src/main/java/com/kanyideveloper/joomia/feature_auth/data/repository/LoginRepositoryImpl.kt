package com.kanyideveloper.joomia.feature_auth.data.repository

import com.kanyideveloper.joomia.core.util.Resource
import com.kanyideveloper.joomia.feature_auth.data.dto.UserResponseDto
import com.kanyideveloper.joomia.feature_auth.data.local.DataPreferences
import com.kanyideveloper.joomia.feature_auth.data.remote.AuthApiService
import com.kanyideveloper.joomia.feature_auth.data.remote.request.LoginRequest
import com.kanyideveloper.joomia.feature_auth.domain.repository.LoginRepository
import kotlinx.coroutines.flow.first
import retrofit2.HttpException
import software.aws.solution.clickstream.ClickstreamAnalytics
import software.aws.solution.clickstream.ClickstreamUserAttribute
import timber.log.Timber
import java.io.IOException
import kotlin.random.Random

class LoginRepositoryImpl(
    private val authApiService: AuthApiService,
    private val dataPreferences: DataPreferences
) : LoginRepository {
    private val avatarUrl = "https://randomuser.me/api/portraits/"
    override suspend fun login(loginRequest: LoginRequest, rememberMe: Boolean): Resource<Unit> {
        Timber.d("Login called")
        return try {
            getRandomUsers().let {
                val gender = if (Random.nextBoolean()) "women" else "men"
                it.avatar = avatarUrl + gender + "/" + Random.nextInt(0, 99) + ".jpg"
                dataPreferences.saveUserdata(it)
                ClickstreamAnalytics.setUserId(it.id.toString())
                val userAttribute = ClickstreamUserAttribute.builder()
                    .add("user_name", it.name.firstname + " " + it.name.lastname)
                    .add("email", it.email)
                    .add("phone", it.phone)
                    .add("gender", gender)
                    .build()
                ClickstreamAnalytics.addUserAttributes(userAttribute)
                ClickstreamAnalytics.recordEvent("login")

                val randomLoginRequest = LoginRequest(
                    username = it.username.trim(),
                    password = it.password.trim()
                )
                val response = authApiService.loginUser(randomLoginRequest)
                Timber.d("Login Token: ${response.token}")
                if (rememberMe) {
                    dataPreferences.saveAccessToken(response.token)
                }
            }
            Resource.Success(Unit)
        } catch (e: IOException) {
            Resource.Error(message = "Could not reach the server, please check your internet connection!")
        } catch (e: HttpException) {
            Resource.Error(message = "An Unknown error occurred, please try again!")
        }
    }

    override suspend fun autoLogin(): Resource<Unit> {
        val accessToken = dataPreferences.getAccessToken.first()
        Timber.d("Auto login access token: $accessToken")
        return if (accessToken != "") {
            Resource.Success(Unit)
        } else {
            Resource.Error("")
        }
    }

    override suspend fun logout(): Resource<Unit> {
        return try {
            dataPreferences.clearAccessToken()
            val fetchedToken = dataPreferences.getAccessToken.first()
            Timber.d("token: $fetchedToken")

            if (fetchedToken.isEmpty()) {
                Resource.Success(Unit)
            } else {
                Resource.Error("Unknown Error")
            }
        } catch (e: Exception) {
            return Resource.Error("Unknown error occurred")
        }
    }

    private suspend fun getRandomUsers(): UserResponseDto {
        val response = authApiService.getAllUsers()
        return response.subList(0, 4).random()
    }
}