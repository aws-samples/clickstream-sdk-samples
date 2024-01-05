package com.kanyideveloper.joomia

import android.app.Application
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.testTagsAsResourceId
import com.amplifyframework.AmplifyException
import dagger.hilt.android.HiltAndroidApp
import software.aws.solution.clickstream.ClickstreamAnalytics
import timber.log.Timber

@HiltAndroidApp
class JoomiaApp : Application() {
    @OptIn(ExperimentalComposeUiApi::class)
    override fun onCreate() {
        super.onCreate()
        initTimber()
        try {
            Modifier.semantics { testTagsAsResourceId = true; testTagsAsResourceId = true }
            ClickstreamAnalytics.init(applicationContext)
            ClickstreamAnalytics.getClickStreamConfiguration()
                .withLogEvents(true)
            Timber.i("MyApp", "Initialized ClickstreamAnalytics")
        } catch (error: AmplifyException) {
            Timber.e("MyApp", "Could not initialize ClickstreamAnalytics", error)
        }
    }

    private fun initTimber() {
        Timber.plant(Timber.DebugTree())
    }
}