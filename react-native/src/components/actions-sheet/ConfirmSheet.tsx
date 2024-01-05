/**
 * Created by Leon<silenceace@gmail.com> at 2022-11-05 20:08:36.
 * Last modified at 2022-11-08 23:51:11
 */

import { Button } from '@src/components'
import { translate } from '@src/i18n'
import { SylCommon, useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React, { useRef } from 'react'
import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native'
import ActionSheet, { ActionSheetRef, SheetManager, SheetProps } from 'react-native-actions-sheet'
/* usage:
  SheetManager.show('confirm-sheet', {
    onClose: (data: any) => {
      console.log('onClose', data)
      showToast(data)
    },
    payload: {
      title: '请确认',
      description: '确定进行此操作吗？',
      confirmText: '确定',
      cancelText: '取消'
    }
  })
**/
const ConfirmActionSheet = (props: SheetProps) => {
  const { theme } = useTheme()
  const {
    sheetId,
    payload: {
      title = translate('brand.name'),
      description,
      height,
      confirmText = translate('common.confirm'),
      cancelText = translate('common.cancel')
    }
  } = props
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const buttonConfirm = (yes: boolean) => {
    console.log('buttonConfirm', yes, sheetId)
    SheetManager.hide(sheetId, {
      payload: yes,
      context: 'global'
    })
  }
  return (
    <ActionSheet
      id={sheetId}
      springOffset={50}
      onBeforeShow={(data) => console.log(data)}
      ref={actionSheetRef}
      statusBarTranslucent
      drawUnderStatusBar={true}
      useBottomSafeAreaPadding={false}
      gestureEnabled={true}
      defaultOverlayOpacity={0.5}
      containerStyle={{
        paddingTop: theme.spacing.medium,
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }}>
      <View style={[styles.container(theme), SylCommon.Card.container(theme), { height: height }]}>
        {title && <Text style={styles.title(theme)}>{title}</Text>}
        {description && (
          <TextInput scrollEnabled multiline editable={false} style={styles.text(theme)}>
            {description}
          </TextInput>
        )}
        <View style={styles.buttonContainer(theme)}>
          <Button
            type="large"
            onPress={() => buttonConfirm(false)}
            textColor={theme.colors.titleText}
            style={[
              styles.button(theme),
              {
                backgroundColor: theme.colors.transparent
              }
            ]}>
            {cancelText || translate('common.cancel')}
          </Button>
          <Button type="large" onPress={() => buttonConfirm(true)} style={styles.button(theme)}>
            {confirmText || translate('common.confirm')}
          </Button>
        </View>
      </View>
    </ActionSheet>
  )
}
const styles = {
  safeareview: (theme: Theme): ViewStyle => ({}),
  container: (theme: Theme): ViewStyle => ({
    paddingBottom: theme.spacing.small,
    width: '100%',
    maxHeight: theme.dimensions.WINDOW_HEIGHT / 2,
    minHeight: theme.dimensions.WINDOW_HEIGHT / 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surface
  }),
  title: (theme: Theme): TextStyle => ({
    ...theme.typography.headingTextBold,
    paddingVertical: theme.spacing.small,
    alignSelf: 'center'
  }),
  text: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    width: '100%',
    textAlign: 'left',
    paddingVertical: theme.spacing.small
  }),
  buttonContainer: (theme: Theme): ViewStyle => ({
    paddingVertical: theme.spacing.small,
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  }),
  button: (theme: Theme): ViewStyle => ({
    width: '48%',
    borderRadius: 20
  })
}
export default ConfirmActionSheet
