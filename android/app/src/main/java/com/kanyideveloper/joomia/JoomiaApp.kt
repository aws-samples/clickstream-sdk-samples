package com.kanyideveloper.joomia

import android.app.Application
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.testTagsAsResourceId
import com.amplifyframework.AmplifyException
import dagger.hilt.android.HiltAndroidApp
import software.aws.solution.clickstream.ClickstreamAnalytics
import software.aws.solution.clickstream.ClickstreamAttribute
import software.aws.solution.clickstream.ClickstreamConfiguration
import timber.log.Timber

@HiltAndroidApp
class JoomiaApp : Application() {
    @OptIn(ExperimentalComposeUiApi::class)
    override fun onCreate() {
        super.onCreate()
        initTimber()
        try {
            Modifier.semantics { testTagsAsResourceId = true; testTagsAsResourceId = true }
            val globalAttributes: ClickstreamAttribute = ClickstreamAttribute.builder()
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_SOURCE, "amazon")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_MEDIUM, "cpc")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CAMPAIGN, "summer_promotion")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CAMPAIGN_ID, "summer_promotion_01")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_TERM, "running_shoes")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CONTENT, "banner_ad_1")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CLID, "amazon_ad_123")
                .add(ClickstreamAnalytics.Attr.TRAFFIC_SOURCE_CLID_PLATFORM, "amazon_ads")
                .add(ClickstreamAnalytics.Attr.APP_INSTALL_CHANNEL, "Amazon Store")
                .build()
            val configuration = ClickstreamConfiguration()
                .withLogEvents(true)
                .withTrackScreenViewEvents(true)
                .withInitialGlobalAttributes(globalAttributes)
            ClickstreamAnalytics.init(applicationContext, configuration)
            Timber.i("MyApp", "Initialized ClickstreamAnalytics")
        } catch (error: AmplifyException) {
            Timber.e("MyApp", "Could not initialize ClickstreamAnalytics", error)
        }
    }

    private fun initTimber() {
        Timber.plant(Timber.DebugTree())
    }
}