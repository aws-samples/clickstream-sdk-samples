/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-14 14:24:27.
 * Last modified at 2022-10-20 18:07:33
 */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import * as Actions from '@src/actions'
import { translate } from '@src/i18n'
import { useTheme, SylCommon } from '@src/theme'
import { IState, Theme, AppObject } from '@src/types'
import * as CompS from '../components'
import { Text, Spinner } from '@src/components'
import { TermsOfServiceScreenProps as ScreenProps } from '@src/navigation/routes'
const TermsOfServiceScreen = ({ route, navigation, loading }: ScreenProps) => {
  const { theme } = useTheme()
  return (
    <View style={SylCommon.Layout.fill}>
      <Text>Hello, TermsOfService.</Text>
    </View>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  })
}
const mapStateToProps = ({ ui: { login } }: { ui: IState.UIState }) => {
  const { error, success, loading } = login
  return { error, success, loading }
}
export default connect(mapStateToProps)(TermsOfServiceScreen)
