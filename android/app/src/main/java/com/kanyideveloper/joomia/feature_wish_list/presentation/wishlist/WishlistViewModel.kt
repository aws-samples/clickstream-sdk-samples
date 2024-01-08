package com.kanyideveloper.joomia.feature_wish_list.presentation.wishlist

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kanyideveloper.joomia.core.util.UiEvents
import com.kanyideveloper.joomia.feature_wish_list.domain.model.Wishlist
import com.kanyideveloper.joomia.feature_wish_list.domain.repository.WishlistRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.launch
import software.aws.solution.clickstream.ClickstreamAnalytics
import software.aws.solution.clickstream.ClickstreamEvent
import software.aws.solution.clickstream.ClickstreamItem
import javax.inject.Inject

@HiltViewModel
class WishlistViewModel @Inject constructor(
    private val repository: WishlistRepository
) : ViewModel() {

    private val _eventFlow = MutableSharedFlow<UiEvents>()
    val eventFlow: SharedFlow<UiEvents> = _eventFlow.asSharedFlow()

    val wishlistItems = repository.getWishlist()/*.value?.map { it.toDomain() }*/

    fun insertFavorite(wishlist: Wishlist) {
        viewModelScope.launch {
            repository.insertToWishlist(wishlist)
        }
        val itemProduct = ClickstreamItem.builder()
            .add(ClickstreamAnalytics.Item.ITEM_ID, wishlist.id)
            .add(ClickstreamAnalytics.Item.ITEM_NAME, wishlist.title)
            .add(ClickstreamAnalytics.Item.ITEM_CATEGORY, wishlist.category)
            .add(ClickstreamAnalytics.Item.PRICE, wishlist.price)
            .add("rating", wishlist.rating.rate)
            .add("description", wishlist.description)
            .build()
        val event = ClickstreamEvent.builder()
            .name("add_to_wishlist")
            .add("item_id", wishlist.id)
            .setItems(arrayOf(itemProduct))
            .build()
        ClickstreamAnalytics.recordEvent(event)
    }

    fun inWishlist(id: Int): LiveData<Boolean> {
        return repository.inWishlist(id)
    }

    fun deleteFromWishlist(wishlist: Wishlist) {
        viewModelScope.launch {
            repository.deleteOneWishlist(wishlist)
            _eventFlow.emit(
                UiEvents.SnackbarEvent(message = "Item removed from wishlist")
            )
        }
        val itemProduct = ClickstreamItem.builder()
            .add(ClickstreamAnalytics.Item.ITEM_ID, wishlist.id)
            .add(ClickstreamAnalytics.Item.ITEM_NAME, wishlist.title)
            .add(ClickstreamAnalytics.Item.ITEM_CATEGORY, wishlist.category)
            .add(ClickstreamAnalytics.Item.PRICE, wishlist.price)
            .add("rating", wishlist.rating.rate)
            .add("description", wishlist.description)
            .build()
        val event = ClickstreamEvent.builder()
            .name("remove_from_wishlist")
            .add("item_id", wishlist.id)
            .setItems(arrayOf(itemProduct))
            .build()
        ClickstreamAnalytics.recordEvent(event)
    }

    fun deleteAllWishlist() {
        viewModelScope.launch {
            if (wishlistItems.value.isNullOrEmpty()) {
                _eventFlow.emit(
                    UiEvents.SnackbarEvent(message = "No Wishlist items found")
                )
            } else {
                repository.deleteAllWishlist()
                _eventFlow.emit(
                    UiEvents.SnackbarEvent(message = "All items deleted from your wishlist")
                )
            }
        }
    }
}