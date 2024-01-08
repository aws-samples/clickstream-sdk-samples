// ClickstreamManager.m
#import "ClickstreamManager.h"
#import <Foundation/Foundation.h>
@import Clickstream;

@implementation ClickstreamManager

// To export a module named ClickstreamManager
RCT_EXPORT_MODULE(ClickstreamAnalytics);

RCT_EXPORT_METHOD(recordEventWithName:(NSString *)name)
{
  [ClickstreamObjc recordEvent:name];
}

RCT_EXPORT_METHOD(recordEvent:(NSString *)name :(NSDictionary *)attributes)
{
  [ClickstreamObjc recordEvent:name :attributes];
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userId)
{
  [ClickstreamObjc setUserId:userId];
}

RCT_EXPORT_METHOD(addUserAttributes:(NSDictionary *)attributes)
{
  [ClickstreamObjc addUserAttributes:attributes];
}

RCT_EXPORT_METHOD(addGlobalAttributes:(NSDictionary *)attributes)
{
  [ClickstreamObjc addGlobalAttributes:attributes];
}

RCT_EXPORT_METHOD(deleteGlobalAttributes:(NSArray *)attributes)
{
  [ClickstreamObjc deleteGlobalAttributes:attributes];
}

RCT_EXPORT_METHOD(flushEvents)
{
  [ClickstreamObjc flushEvents];
}

RCT_EXPORT_METHOD(enable)
{
  [ClickstreamObjc enable];
}

RCT_EXPORT_METHOD(disable)
{
  [ClickstreamObjc disable];
}
@end
