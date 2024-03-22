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
    /// Initialize Clickstream SDK in Objective-C
    NSError *error = nil;
    [ClickstreamObjc initSDKAndReturnError:&error];
    if (error) {
        NSLog(@"Fail to initialize ClickstreamAnalytics: %@", error.localizedDescription);
    }
    ClickstreamConfiguration *configuration = [[[[[[[ClickstreamConfiguration alloc] init]
                                               withAppId:@"your appId"]
                                               withEndpoint:@"https://example.com/collect"]
                                               withCompressEvents:NO]
                                               withSendEventInterval:5000]
                                               withLogEvents:TRUE];
    [ClickstreamObjc initSDK:configuration error: &error];
    
    /// Record an event with item
    NSDictionary *attributes = @{
        ClickstreamItemKey.ITEM_ID: @"123",
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
    
    NSDictionary *screen_attributes = @{
        Attr.SCREEN_NAME: @"HomeView",
        Attr.SCREEN_UNIQUE_ID: @"your screen uniqueId"
    };
    [ClickstreamObjc recordEvent:EventName.SCREEN_VIEW :screen_attributes];
};
@end


