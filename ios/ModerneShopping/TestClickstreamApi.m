//
//  TestClickstreamApi.m
//  ModerneShopping
//
//  Created by Zhu, Xiaowei on 2023/12/18.
//

#import <Foundation/Foundation.h>
#import "TestClickstreamApi.h"
@import Clickstream;


@implementation TestClickstreamApi

/// This method for show how to invoke Clickstream Swift API from Objective-C
-(void) testClickstreamApi{
    /// Initialize Clickstream SDK with default configuration
    NSError *error = nil;
    [ClickstreamObjc initSDKAndReturnError:&error];
    if (error) {
        NSLog(@"Fail to initialize ClickstreamAnalytics: %@", error.localizedDescription);
    }

    /// Initialize Clickstream SDK with custom configuration
    NSDictionary *globalAttributes = @{
        Attr.TRAFFIC_SOURCE_SOURCE: @"amazon",
        Attr.TRAFFIC_SOURCE_MEDIUM: @"cpc",
        Attr.TRAFFIC_SOURCE_CAMPAIGN: @"summer_promotion",
        Attr.TRAFFIC_SOURCE_CAMPAIGN_ID: @"summer_promotion_01",
        Attr.TRAFFIC_SOURCE_TERM: @"running_shoes",
        Attr.TRAFFIC_SOURCE_CONTENT: @"banner_ad_1",
        Attr.TRAFFIC_SOURCE_CLID: @"amazon_ad_123",
        Attr.TRAFFIC_SOURCE_CLID_PLATFORM: @"amazon_ads",
        Attr.APP_INSTALL_CHANNEL: @"App Store",
    };
    ClickstreamConfiguration *configuration = [[[[[[[[[[[[[ClickstreamConfiguration alloc] init]
        withAppId:@"your appId"]
        withEndpoint:@"https://example.com/collect"]
        withLogEvents:TRUE]
        withCompressEvents:TRUE]
        withSendEventInterval: 10000]
        withSessionTimeoutDuration: 1800000]
        withTrackScreenViewEvents:TRUE]
        withTrackUserEngagementEvents:TRUE]
        withTrackAppExceptionEvents:TRUE]
        withAuthCookie: @"your auth cookie"]
        withInitialGlobalAttributesObjc:@{Attr.TRAFFIC_SOURCE_SOURCE: @"amazon"}];
    [ClickstreamObjc initSDK:configuration error: &error];
    if (error) {
        NSLog(@"Fail to initialize ClickstreamAnalytics: %@", error.localizedDescription);
    }
    
    /// Record an event with item
    NSDictionary *attributes = @{
        Attr.VALUE: @99.9,
        Attr.CURRENCY: @"USD",
        @"event_category": @"recommended"
    };
    NSDictionary *item_book = @{
        ClickstreamItemKey.ITEM_ID: @123,
        ClickstreamItemKey.ITEM_NAME: @"Nature",
        ClickstreamItemKey.ITEM_CATEGORY: @"book",
        ClickstreamItemKey.PRICE: @99.9,
        @"book_publisher": @"Nature Research"
    };
    [ClickstreamObjc recordEvent:@"view_item" :attributes: @[item_book] ];
    
    /// Record custom screen view
    NSDictionary *screen_attributes = @{
        Attr.SCREEN_NAME: @"HomeView",
        Attr.SCREEN_UNIQUE_ID: @"your screen uniqueId"
    };
    [ClickstreamObjc recordEvent:EventName.SCREEN_VIEW :screen_attributes];
    
    /// Update SDK configuation
    ClickstreamConfiguration *configure = [ClickstreamObjc getClickstreamConfigurationAndReturnError:&error];
    configure = [[[[[[[configure withAppId:@"your appId"]
                    withEndpoint:@"https://example.com/collect"]
                    withLogEvents:TRUE]
                    withCompressEvents:TRUE]
                    withTrackScreenViewEvents:TRUE]
                    withTrackUserEngagementEvents:TRUE]
                    withTrackAppExceptionEvents:TRUE];
};
@end


