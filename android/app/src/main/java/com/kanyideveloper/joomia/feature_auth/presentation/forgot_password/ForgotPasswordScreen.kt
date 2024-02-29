package com.kanyideveloper.joomia.feature_auth.presentation.forgot_password

import android.widget.Toast
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Button
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ramcosta.composedestinations.annotation.Destination
import software.aws.solution.clickstream.ClickstreamAnalytics
import software.aws.solution.clickstream.ClickstreamEvent

@Destination
@Composable
fun ForgotPasswordScreen() {
    val context = LocalContext.current
    LaunchedEffect(key1 = true, block = {
        val event = ClickstreamEvent.builder()
            .name(ClickstreamAnalytics.Event.SCREEN_VIEW)
            .add(ClickstreamAnalytics.Attr.SCREEN_NAME, "ForgotPasswordScreen")
            .add(ClickstreamAnalytics.Attr.SCREEN_UNIQUE_ID, this.hashCode())
            .build()
        ClickstreamAnalytics.recordEvent(event)
    })
    Scaffold(
        topBar = {
            Column(Modifier.padding(16.dp)) {
                Text(text = "Forgot Password", fontSize = 24.sp, fontWeight = FontWeight.Bold)
                Text(
                    text = "Please enter an email address that you had registered with, so that we can send you a password reset link",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Light
                )
            }
        }
    ) {
        ForgotPasswordScreenContent(
            onClickForgotPassword = {
                Toast.makeText(
                    context,
                    "This API does not provide an endpoint for sending password reset link, just login with the credentials provided in the README file",
                    Toast.LENGTH_LONG
                ).show()
            }
        )
    }
}

@Composable
private fun ForgotPasswordScreenContent(
    onClickForgotPassword: () -> Unit,
) {
    LazyColumn(contentPadding = PaddingValues(16.dp)) {
        item {
            Spacer(modifier = Modifier.height(64.dp))

            OutlinedTextField(
                modifier = Modifier.fillMaxWidth(),
                value = "",
                onValueChange = {

                },
                label = {
                    Text(text = "Email")
                },
                keyboardOptions = KeyboardOptions(
                    autoCorrect = true,
                    keyboardType = KeyboardType.Email,
                ),
            )
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))

            Button(
                onClick = onClickForgotPassword,
                shape = RoundedCornerShape(8)
            ) {
                Text(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp), text = "Continue", textAlign = TextAlign.Center
                )
            }
        }
    }
}