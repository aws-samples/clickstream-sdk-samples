/*
 * Copyright 2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

package github.funnyzak.v2ex;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import software.aws.solution.clickstream.ClickstreamAnalytics;
import software.aws.solution.clickstream.ClickstreamAttribute;
import software.aws.solution.clickstream.ClickstreamEvent;
import software.aws.solution.clickstream.ClickstreamUserAttribute;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ClickstreamModule extends ReactContextBaseJavaModule {

    public ClickstreamModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "ClickstreamAnalytics";
    }

    @ReactMethod()
    public void recordEventWithName(String eventName) {
        ClickstreamAnalytics.recordEvent(eventName);
    }

    @ReactMethod
    public void recordEvent(String eventName, ReadableMap map) {
        HashMap<String, Object> attributeMap = map.toHashMap();
        ClickstreamEvent.Builder builder = new ClickstreamEvent.Builder();
        builder.name(eventName);
        for (Map.Entry<String, Object> entry : attributeMap.entrySet()) {
            if (entry.getValue() instanceof String) {
                builder.add(entry.getKey(), (String) entry.getValue());
            } else if (entry.getValue() instanceof Integer) {
                builder.add(entry.getKey(), (Integer) entry.getValue());
            } else if (entry.getValue() instanceof Long) {
                builder.add(entry.getKey(), (Long) entry.getValue());
            } else if (entry.getValue() instanceof Boolean) {
                builder.add(entry.getKey(), (Boolean) entry.getValue());
            } else if (entry.getValue() instanceof Double) {
                builder.add(entry.getKey(), (Double) entry.getValue());
            }
        }
        ClickstreamAnalytics.recordEvent(builder.build());
    }

    @ReactMethod
    public void setUserId(String userId) {
        ClickstreamAnalytics.setUserId(userId);
    }

    @ReactMethod
    public void addUserAttributes(ReadableMap map) {
        HashMap<String, Object> attributeMap = map.toHashMap();
        ClickstreamUserAttribute.Builder builder = new ClickstreamUserAttribute.Builder();
        for (Map.Entry<String, Object> entry : attributeMap.entrySet()) {
            if (entry.getValue() instanceof String) {
                builder.add(entry.getKey(), (String) entry.getValue());
            } else if (entry.getValue() instanceof Integer) {
                builder.add(entry.getKey(), (Integer) entry.getValue());
            } else if (entry.getValue() instanceof Long) {
                builder.add(entry.getKey(), (Long) entry.getValue());
            } else if (entry.getValue() instanceof Boolean) {
                builder.add(entry.getKey(), (Boolean) entry.getValue());
            } else if (entry.getValue() instanceof Double) {
                builder.add(entry.getKey(), (Double) entry.getValue());
            }
        }
        ClickstreamAnalytics.addUserAttributes(builder.build());
    }

    @ReactMethod
    public void addGlobalAttributes(ReadableMap map) {
        HashMap<String, Object> attributeMap = map.toHashMap();
        ClickstreamAttribute.Builder builder = new ClickstreamAttribute.Builder();
        for (Map.Entry<String, Object> entry : attributeMap.entrySet()) {
            if (entry.getValue() instanceof String) {
                builder.add(entry.getKey(), (String) entry.getValue());
            } else if (entry.getValue() instanceof Integer) {
                builder.add(entry.getKey(), (Integer) entry.getValue());
            } else if (entry.getValue() instanceof Long) {
                builder.add(entry.getKey(), (Long) entry.getValue());
            } else if (entry.getValue() instanceof Boolean) {
                builder.add(entry.getKey(), (Boolean) entry.getValue());
            } else if (entry.getValue() instanceof Double) {
                builder.add(entry.getKey(), (Double) entry.getValue());
            }
        }
        ClickstreamAnalytics.addGlobalAttributes(builder.build());
    }

    @ReactMethod
    public void deleteGlobalAttributes(ReadableArray attributes) {
        ArrayList<String> attributeArray = new ArrayList<>();
        for (Object attribute : attributes.toArrayList()) {
            if (attribute instanceof String) {
                attributeArray.add((String) attribute);
            }
        }
        if (attributeArray.size() > 0) {
            ClickstreamAnalytics.deleteGlobalAttributes(attributeArray.toArray(new String[0]));
        }
    }

    @ReactMethod
    public void flushEvents() {
        ClickstreamAnalytics.flushEvents();
    }

    @ReactMethod
    public void enable() {
        ClickstreamAnalytics.enable();
    }

    @ReactMethod
    public void disable() {
        ClickstreamAnalytics.disable();
    }
}
