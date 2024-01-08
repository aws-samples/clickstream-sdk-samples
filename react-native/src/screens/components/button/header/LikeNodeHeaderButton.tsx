/**
 * Created by Leon<silenceace@gmail.com> at 2022-05-28 19:56:02.
 * Last modified at 2022-10-20 18:07:33
 */

import { interestNode, unInterestNode } from '@src/actions'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { useSession } from '@src/hooks/useSession'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { useTheme } from '@src/theme'
import { AppObject } from '@src/types'
import React, { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { HeaderButton } from '../../common'
/**
 * Like Node Button
 * @param {
 *   text,
 *   buttonText,
 *   buttonPress
 * }
 * @returns
 */
const LikeNodeHeaderButton = ({
  containerStyle,
  node
}: {
  containerStyle?: StyleProp<ViewStyle>
  node: AppObject.Node
}) => {
  const { theme } = useTheme()
  const { logined } = useSession()
  const { interestNodes } = useAppSelector((RootState) => RootState.member)
  const dispatch = useAppDispatch()
  const isInterest = useMemo(
    () => (logined ? interestNodes && interestNodes.findIndex((v) => v.id === node.id) >= 0 : false),
    [interestNodes]
  )
  const buttonPress = () => {
    if (!logined) {
      NavigationService.navigate(ROUTES.SignIn)
    } else {
      if (isInterest) {
        dispatch(unInterestNode(node) as any)
      } else {
        dispatch(interestNode(node) as any)
      }
    }
  }
  return (
    <HeaderButton
      text={translate(`common.${isInterest ? 'cancel' : 'follow'}`)}
      textColor={isInterest ? theme.colors.captionText : theme.colors.secondary}
      onPress={buttonPress}
      containerStyle={containerStyle}
    />
  )
}
export default LikeNodeHeaderButton
