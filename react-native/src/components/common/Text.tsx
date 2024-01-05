/**
 * Created by Leon<silenceace@gmail.com> at 2022-02-24 12:26:38.
 * Last modified at 2022-11-05 20:10:31
 */

import { useTheme } from '@src/theme'
import { Theme } from '@src/types'
import { validKey } from '@src/utils'
import React from 'react'
import { Text as RNText, TextProps as NativeTextProps, TextStyle } from 'react-native'
// Possible value for prop "type" for Text
const HEADING = 'heading'
const SUB_HEADING = 'subheading'
const BODY = 'body'
const LABEL = 'label'
const CAPTION = 'caption'
type TextType = 'heading' | 'subheading' | 'body' | 'label' | 'caption'
interface TextProps extends NativeTextProps {
  type: TextType
  bold: boolean
}
const Text = ({
  type,
  /**
   * @bold prop is a boolean, if enabled will use bold version of the
   * type mentioned.
   */
  bold,
  /**
   * @style prop will overwrite the predefined styling for Text defined by
   * @type prop
   *
   * default value: false
   */
  style,
  ...props
}: TextProps) => {
  const { theme } = useTheme()
  return <RNText style={[styles.text(type, bold, theme), style]} {...props} />
}
const getTextStyle = (type: TextType, bold: boolean, theme: Theme): TextStyle => {
  let style = ''
  switch (type) {
    case HEADING:
      style = 'headingText'
      break
    case SUB_HEADING:
      style = 'subheadingText'
      break
    case LABEL:
      style = 'labelText'
      break
    case CAPTION:
      style = 'captionText'
      break
    default:
      style = 'bodyText'
  }
  if (bold) {
    style += 'Bold'
  }
  return theme.typography[validKey(style, theme.typography) ? style : 'bodyText']
}
const styles = {
  text: (type: TextType, bold: boolean, theme: Theme) => ({
    ...getTextStyle(type, bold, theme)
  })
}
Text.defaultProps = {
  type: BODY,
  bold: false,
  style: {}
}
export { Text }
