package com.kanyideveloper.joomia.feature_products.presentation.home

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import com.kanyideveloper.joomia.core.util.Resource
import com.kanyideveloper.joomia.core.util.UiEvents
import com.kanyideveloper.joomia.feature_auth.data.dto.UserResponseDto
import com.kanyideveloper.joomia.feature_auth.data.local.DataPreferences
import com.kanyideveloper.joomia.feature_products.domain.use_case.GetCategoriesUseCase
import com.kanyideveloper.joomia.feature_products.domain.use_case.GetProductsUseCase
import com.kanyideveloper.joomia.feature_profile.data.repository.ProfileRepository
import com.kanyideveloper.joomia.feature_profile.data.toDomain
import com.kanyideveloper.joomia.feature_profile.domain.model.User
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import timber.log.Timber
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val profileRepository: ProfileRepository,
    private val getProductsUseCase: GetProductsUseCase,
    private val getCategoriesUseCase: GetCategoriesUseCase,
    private val dataPreferences: DataPreferences,
    private val gson: Gson,
) :
    ViewModel() {

    private val _profileState = mutableStateOf(User())
    val profileState: State<User> = _profileState

    fun getProfile() {
        viewModelScope.launch {
            profileRepository.getUserProfile().collectLatest { data ->
                Timber.d("Data: $data")
                val user = gson.fromJson(data, UserResponseDto::class.java)
                _profileState.value = user.toDomain()
            }
        }
    }

    private val _selectedCategory = mutableStateOf("All")
    val selectedCategory: State<String> = _selectedCategory
    fun setCategory(value: String) {
        _selectedCategory.value = value
    }

    private val _productsState = mutableStateOf(ProductsState())
    val productsState: State<ProductsState> = _productsState

    private val _categoriesState = mutableStateOf(emptyList<String>())
    val categoriesState: State<List<String>> = _categoriesState

    private val _searchTerm = mutableStateOf("")
    val searchTerm: State<String> = _searchTerm

    fun setSearchTerm(term: String) {
        _searchTerm.value = term
    }

    private val _eventFlow = MutableSharedFlow<UiEvents>()
    val eventFlow: SharedFlow<UiEvents> = _eventFlow.asSharedFlow()

    init {
        getCategories()
        getProducts(selectedCategory.value)
    }

    private fun getCategories() {
        viewModelScope.launch {
            _categoriesState.value = getCategoriesUseCase()
        }
    }

    fun getProducts(category: String = "All", searchTerm: String = "") {
        viewModelScope.launch {
            if (category == "All") {
                val products = runBlocking { dataPreferences.getProducts.first() }
                if (products.isNotEmpty()) {
                    _productsState.value = productsState.value.copy(
                        products = if (searchTerm.isEmpty()) {
                            products
                        } else {
                            products.filter {
                                it.title.contains(
                                    searchTerm,
                                    ignoreCase = true
                                )
                            }
                        },
                        isLoading = false
                    )
                    return@launch
                }
            }
            getProductsUseCase().collectLatest { result ->
                when (result) {
                    is Resource.Success -> {
                        if (category == "All") {
                            _productsState.value = productsState.value.copy(
                                products = if (searchTerm.isEmpty()) {
                                    val mProducts = result.data ?: emptyList()
                                    dataPreferences.saveProducts(mProducts)
                                    mProducts
                                } else {
                                    result.data?.filter {
                                        it.title.contains(
                                            searchTerm,
                                            ignoreCase = true
                                        )
                                    } ?: emptyList()
                                },
                                isLoading = false
                            )
                        } else {
                            _productsState.value = productsState.value.copy(
                                products = result.data?.filter { it.category == category }
                                    ?: emptyList(),
                                isLoading = false
                            )
                        }
                    }

                    is Resource.Loading -> {
                        _productsState.value = productsState.value.copy(
                            isLoading = true
                        )
                    }

                    is Resource.Error -> {
                        _productsState.value = productsState.value.copy(
                            isLoading = false,
                            error = result.message
                        )
                        _eventFlow.emit(
                            UiEvents.SnackbarEvent(
                                message = result.message ?: "Unknown error occurred!"
                            )
                        )
                    }
                }
            }
        }
    }
}