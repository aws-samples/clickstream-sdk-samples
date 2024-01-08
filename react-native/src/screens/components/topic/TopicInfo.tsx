/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-01 14:00:14.
 * Last modified at 2022-10-20 18:07:33
 */

import { NavigationService, ROUTES } from '@src/navigation'
import { Theme, SylCommon, useTheme } from '@src/theme'
import { AppObject } from '@src/types'
import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { RenderHTML } from '../common'
import TopicCardItem from './TopicCardItem'
/**
 * TopicInfo props
 */
export interface TopicInfoProps {
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * TopicInfo width
   */
  info: AppObject.Topic
}
const TopicInfo: React.FC<TopicInfoProps> = ({ containerStyle, info }: TopicInfoProps) => {
  const { theme } = useTheme()
  const renderContent = () => {
    return (
      <View style={[SylCommon.Card.container(theme), styles.container(theme), containerStyle]}>
        <TopicCardItem
          topic={info}
          showlastReplay={false}
          onPress={() => {
            NavigationService.navigate(ROUTES.WebViewer, {
              url: info.url
            })
          }}
        />
        <RenderHTML
          htmlString={info.content_rendered}
          contentWidth={theme.dimensions.WINDOW_WIDTH - theme.spacing.large * 2}
        />
      </View>
    )
  }
  return renderContent()
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    paddingVertical: theme.spacing.medium
  })
}
export default TopicInfo
