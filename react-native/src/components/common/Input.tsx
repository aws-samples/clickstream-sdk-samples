/**
 * Created by Leon<silenceace@gmail.com> at 2022-03-01 16:42:43.
 * Last modified at 2022-11-05 20:10:31
 */

import { useTheme } from '@src/theme'
import { Theme } from '@src/types'
import React from 'react'
import { TextInput, TextInputProps as NativeTextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from './Text'
export interface TextInputProps extends NativeTextInputProps {
  label?: string
  assignRef?: (ref: TextInput) => void
  containerStyle?: ViewStyle
  labelStyle?: ViewStyle
  inputStyle?: ViewStyle
}
const Input = ({
  label,
  value = '',
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  assignRef = () => {},
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}: TextInputProps) => {
  const { theme } = useTheme()
  return (
    <View style={[styles.containerStyle(theme), containerStyle]}>
      {label && (
        <Text type="heading" style={[styles.labelStyle(theme), labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grey}
        autoCorrect={false}
        style={[styles.inputStyle(theme), inputStyle]}
        value={value}
        onChangeText={onChangeText}
        ref={(component: TextInput) => {
          assignRef && assignRef(component)
        }}
      />
    </View>
  )
}
const styles = {
  containerStyle: (_theme: Theme): ViewStyle => ({
    height: _theme.dimensions.defaultInputBoxHeight,
    backgroundColor: _theme.colors.white,
    borderWidth: 0.3,
    borderRadius: _theme.dimensions.borderRadius * 2,
    borderColor: _theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center'
  }),
  inputStyle: (_theme: Theme): TextStyle => ({
    ..._theme.typography.inputText,
    color: _theme.colors.darkGrey,
    paddingHorizontal: _theme.spacing.small,
    flex: 2
  }),
  labelStyle: (_theme: Theme): ViewStyle => ({
    paddingLeft: _theme.spacing.large,
    flex: 1
  })
}
export { Input }
