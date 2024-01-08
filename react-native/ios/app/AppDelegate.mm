#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h" // react-native-splash-screen
@import Clickstream;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"app";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNSplashScreen show]; // react-native-splash-screen
  
  NSError *error = nil;
  [ClickstreamObjc initSDKAndReturnError:&error];
 
  if (error) {
      NSLog(@"Failed to initialize ClickstreamAnalytics: %@", error.localizedDescription);
  }
  ClickstreamContextConfiguration *configuration = [ClickstreamObjc getClickstreamConfigurationAndReturnError:&error];
  if (configuration) {
      [configuration setIsLogEvents:true];
      [configuration setIsTrackScreenViewEvents:false];
      [configuration setIsTrackUserEngagementEvents:false];
  }else{
      NSLog(@"Failed to get configuration: %@", error.localizedDescription);
  }
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
