# React Native V2EX

The project used React Native to build a [V2EX](https://v2ex.com) mobile client application and based entirely on the [V2EX](https://v2ex.com) open API. This project is Based on RN 0.71.5.

The `Figma design draft` is open source and can be [duplicated](https://www.figma.com/community/file/1101074002447399194).

## Features

1. Based on React Native version 0.71.3.
2. Introduce strong type-checking in TypeScript to ensure maintainability, readability, and stability.
3. Eslint code specification check, prettier code beautification, Husky as git hooks for code formatting and specification verification.
4. i18n integration, multi-language support. The language switching function has been implemented.
5. Implement the function of switching between app themes (light color, dark color, automatic switching).
6. Use Redux, use Redux Thunk asynchronously, and use Redux Persist to persist data.
7. Use **@redux -devtools/extension** for Redux debugging.
8. The route uses React Navigation and uses Stack Navigator, Bottom Tabs Navigator, and Material Top Tabs Navigator.
9. Use **[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)** to control the opening screen.
10. Toast also integrates [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast#api)、[react-native-toast-message](https://github.com/calintamas/react-native-toast-message).
11. Use [dayjs](https://dayjs.gitee.io/docs/zh-CN/installation/typescript) for date formatting.
12. WebView uses [react-native-webview](https://github.com/react-native-webview/react-native-webview).

## Preview

### iOS

![preview](https://raw.githubusercontent.com/funnyzak/react-native-v2ex/dev/_docs/assets/screenshot/iOS/preview2.jpeg)

### Android

![preview](https://raw.githubusercontent.com/funnyzak/react-native-v2ex/dev/_docs/assets/screenshot/Android/preview2.jpeg)

## Development

Currently developed under macOS, the iPhone Simulator/iPhone 14 with iOS 16+ and AVD Emulator/Mi Phone with Android 9.0 have all been successfully compiled and run.

- Install Node (18.0+), Yarn, [Watchman](https://reactnative.cn/docs/environment-setup).
- Java JDK recommends using 11 (configure the environment variable **JAVE_HOME**; compiling higher than this version may cause errors).
- The iOS platform requires [CocoaPods](https://reactnative.cn/docs/environment-setup)、Xcode、iOS Simulator.
- Android Studio、Gradle、Android SDK、[Android Home Configuration](https://reactnative.cn/docs/environment-setup)、Android NDK.
- The Android platform requires [real Android] (https://reactnative.cn/docs/running-on-device) or [Android AVD] (https://developer.android.com/studio/run/managing-avds) (A real machine is recommended).

Specifically, you can configure the React Native development environment and iOS, Android environments according to the official website. See [here](https://reactnative.dev/docs/environment-setup).

## Develop

```bash

# clone repos
$ git clone https://github.com/funnyzak/react-native-v2ex.git && cd react-native-v2ex

# deps install
$ yarn

# Additional fixes for dependency packages
yarn postinstall

# ios pod install
yarn pod

# start react-native-debugger (only mac)
yarn debug

# debug https://reactnative.cn/docs/debugging
npx react-devtools

# iOS simulator start
yarn ios

# Android simulator start
yarn android

# plop generate template
yarn p

# print rn info
npx react-native info

# upgrade rn version
npx react-native upgrade

# iOS debug info start
npx react-native run-ios --verbose

# iOS release build
npx react-native run-ios --configuration Release

# iOS debug use special device
react-native run-ios --simulator="iPhone 8"

# Android debug info start
npx react-native run-android --verbose

# Testing the release build
npx react-native run-android --variant=release

# build android release apk
cd android
# aab file
./gradlew bundleRelease
# apk file
./gradlew assembleRelease

npx react-native run-android --variant release

```

## Structure

```plain
├── src                      # src folder
│   ├── App.tsx              # app root componet
│   ├── actions              # actions
│   ├── assets               # static assets
│   ├── components           # components
│   ├── config               # configure file
│   ├── helper               # application helper
│   ├── hooks                # hooks
│   ├── i18n                 # Multi-language support
│   ├── navigation           # route navigation
│   ├── reducers             # reducers
│   ├── store                # store
│   ├── theme                # theme
│   ├── types                # types definition
│   ├── utils                # utils
│   └── api                  # API library
├── .editorconfig            # editor configure
├── .eslintrc.js             # eslint configure file
├── .gitignore               # gitignore rules
├── .husky                   # git hook configuration
├── .prettierrc.js           # Code formatting rules
├── .watchmanconfig          # Watchman configure file
├── __tests__                # test files
├── android                  # Android app folder
├── app.json                 #
├── babel.config.js          # Babel configure file
├── global.d.ts              # global file
├── index.js                 # the index file of application
├── ios                      # iOS app folder
├── metro.config.js
├── package.json             # the package.json file of the project
├── tsconfig.json            # typescript compile configure file
└── yarn.lock                # locking files with dependent versions
```

## Debug

### Debug Tools

- **[Hermes Debugger](https://reactnative.cn/docs/hermes#debugger)** is a standalone app for debugging React Native apps that use Hermes.
- **[Flipper](https://fbflipper.com/docs/getting-started/index/)** is a desktop debugging platform for mobile developers.
- **[react-devtools](https://www.npmjs.com/package/react-devtools)** is a standalone app for inspecting the React component hierarchy.
- **[React Native Debugger](https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md)** is a standalone app for debugging React Native apps, and includes React DevTools.
- Google Chrome Debug, [Referrer link](https://reactnative.cn/docs/debugging#chrome).

### Debug Menu

You can open the development menu by shaking your device or selecting the “Shake Gesture” option in the iOS emulator's “Hardware” menu. Also, if running in an iOS emulator, you can also press the Command⌘+D shortcut; the Android emulator corresponds to Command⌘+M (possibly F1 or F2 on Windows), or directly run adb shell input keyevent 82 in the command line to send menu key commands.

### react-native-debugger

1. Install **[react-native-debugger](https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md)**.
2. Run `yarn debug` to start react-native-debugger.
3. Start the emulator `yarn ios` and open the debug remote option in the emulator.

**Note:** To use this method, `Hermes` must be disabled, otherwise an error will be reported. It is recommended to enable the Hermes switch and use Hermes debugging.

## FAQ

### Invariant Violation: Module AppRegistry is not a registered callable module

```bash
npm cache clean --force
watchman watch-del-all
rm -rf node_modules

# for ios
cd ios
pod update && pod install
cd ..
npx react-native run-ios
# for android
cd android && ./gradlew clean
cd ..
npx react-native run-android
```

Reference: [https://stackoverflow.com/questions/64768328/invariant-violation-module-appregistry-is-not-a-registered-callable-module-cal](https://stackoverflow.com/questions/64768328/invariant-violation-module-appregistry-is-not-a-registered-callable-module-cal)

### RCTBridge required dispatch_sync to load RNGestureHandlerModule

> [https://github.com/software-mansion/react-native-gesture-handler/issues/722](https://github.com/software-mansion/react-native-gesture-handler/issues/722)

### XCode compile failed

```bash
# delete cache file
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### Android compile and launch attention

Note that the Gradle and Java SDK (Java Home) versions correspond, which can be found in. /android /gradle.properties settings org.gradle.java.home

### LaunchScreen setting

iOS uses LaunchScreen.storyboard, just use Xcode to edit it.

### Modify bundle name

[See here](https://stackoverflow.com/questions/37389905/change-package-name-for-android-in-react-native).

### Android signing and packaging

[See here](https://reactnative.cn/docs/signed-apk-android/).

### Using fetch to get/post on a HTTPS web server which is using a valid and trusted but not public CA.

1. Edit the android/app/src/main/AndroidManifest.xml
2. Add the android:networkSecurityConfig="@xml/network_security_config" to the <application /> tag
3. Create the folder android/app/src/main/res/xml and inside a file called network_security_config.xml
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <network-security-config>
     <base-config cleartextTrafficPermitted="true" />
   </network-security-config>
   ```

- [https://github.com/facebook/react-native/issues/32931](https://github.com/facebook/react-native/issues/32931)
- [https://developer.android.com/training/articles/security-config](https://developer.android.com/training/articles/security-config)

## Dependencies

- eslint
- lodash
- redux
- react-native-safe-area-context
- react-native-render-html
- react-navigation
- react-devtools
- @redux-devtools/extension
- async-storage
- react-native-gesture-handler
- react-native-fast-image
- react-native-reanimated
- react-native-localize
- react-native-device-info
- react-native-webview
- [react-native-skeleton-placeholder](https://github.com/chramos/react-native-skeleton-placeholder)
- [react-native-actions-sheet](https://github.com/ammarahm-ed/react-native-actions-sheet)
- prettier
- [patch-package](https://github.com/ds300/patch-package)

## Reference

- [environment setup](https://reactnative.dev/docs/environment-setup) to setup react-native development environment.
- [running on device](https://reactnative.dev/docs/running-on-device) to run app on device.
- [debugging](https://twitter.com/i/spaces/1YqJDqDpqzAxV) to debug app.
- [react native typescript](https://reactnative.dev/docs/typescript) to use typescript in react-native.
- [react native cn](https://reactnative.cn/) to learn react-native.
- [react-devtools](https://www.npmjs.com/package/react-devtools) to debug react component.
- [fetch](https://reactnative.cn/docs/network) to use fetch in react-native.
- [bundle tool](https://developer.android.google.cn/studio/command-line/bundletool) to generate android bundle.
- [android build](https://reactnative.cn/docs/signed-apk-android) to generate android apk.
- [watchman](https://facebook.github.io/watchman/docs/cli-options.html) to watch file change.
- [EsLint](https://eslint.org/docs/user-guide/configuring/) to lint code.
- [eslintignore-file](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file) to ignore lint file.
- [TSconfig](https://www.typescriptlang.org/tsconfig/) to config typescript.
- [npmrc](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc) to config npm.
- [gitignore](https://git-scm.com/docs/gitignore) to ignore git file.
- [prettier](https://prettier.io/docs/en/index.html) to format code.
- [v2ex api 2.0](https://v2ex.com/help/api) to get v2ex api.
- [v2ex api](https://www.v2ex.com/p/7v9TEc53) to get v2ex api.
- [v2ex token](https://www.v2ex.com/settings/tokens) to get v2ex token.
- [react native sample](https://github.com/facebook/react-native) to learn react-native.
- [react native typescript sample](https://github.com/react-native-community/react-native-template-typescript) to learn react-native typescript.
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to upgrade react-native.
- [Easy App Icon](https://easyappicon.com/) to generate app icon.
- [App Image Sets](https://appicon.co/#image-sets) to generate app icon and image set.
