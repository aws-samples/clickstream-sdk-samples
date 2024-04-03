import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { ClickstreamAnalytics } from '@aws/clickstream-react-native'

// Ignore log notification by message:
LogBox.ignoreLogs(['required dispatch_sync', 'flexWrap'])

// Ignore all log notifications:
// LogBox.ignoreAllLogs();

ClickstreamAnalytics.init({
  appId: 'your appId',
  endpoint: 'https://example.com/collect',
  isLogEvents: true,
  isTrackScreenViewEvents: false
}).then((result) => {
  console.log('Initial Clickstream SDK result: ' + result)
})

AppRegistry.registerComponent(appName, () => App)
