/**
 * Created by Leon<silenceace@gmail.com> at 2022-03-30 22:08:54.
 * Last modified at 2022-11-09 16:17:41
 */

import React from 'react'
import { View, ViewStyle } from 'react-native'
import { connect } from 'react-redux'
import { CacheSettingScreenProps as ScreenProps } from '@src/navigation'
import { SylCommon, useTheme } from '@src/theme'
import { IState, Theme } from '@src/types'
import { TableList, TableRow } from '../components'
import { useToast } from '@src/components'
import { translate } from '@src/i18n'
const CacheSetting = ({ route, navigation, loading }: ScreenProps) => {
  const { theme } = useTheme()
  const { showMessage } = useToast()
  const clearCache = (type: 'tmp' | 'history' | 'all') => {
    showMessage({
      type: 'error',
      text2: translate('label.underConstruction')
    })
  }
  return (
    <View style={[SylCommon.Layout.fill, SylCommon.View.background(theme)]}>
      <TableList containerStyle={[{ marginTop: theme.spacing.small }]}>
        <TableRow title={translate('button.clearTmpCache')} withArrow={true} onPress={() => clearCache('tmp')} />
        <TableRow title={translate('button.clearHistory')} withArrow={true} onPress={() => clearCache('history')} />
        <TableRow title={translate('button.clearAllCache')} withArrow={true} onPress={() => clearCache('all')} />
      </TableList>
    </View>
  )
}
/**
 * @description styles settings
 */
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  })
}
const mapStateToProps = ({ ui: { login } }: { ui: IState.UIState }) => {
  const { error, success, loading } = login
  return { error, success, loading }
}
export default connect(mapStateToProps)(CacheSetting)
