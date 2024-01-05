/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-28 20:43:52.
 * Last modified at 2022-10-20 18:07:33
 */

import { Avatar } from '@src/components'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { Theme, useTheme } from '@src/theme'
import { AppObject } from '@src/types'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { BorderLine, RenderHTML, TextWithIconPress } from '../common'
/**
 * TopicReplayItem props
 */
export interface TopicReplayItemProps {
  containerStyle?: StyleProp<ViewStyle>
  info: AppObject.TopicReply
}
const TopicReplayItem: React.FC<TopicReplayItemProps> = ({ containerStyle, info }: TopicReplayItemProps) => {
  const { theme } = useTheme()
  const avatar_link = useMemo(() => (info.member ? info.member.avatar || info.member.avatar_normal : undefined), [info])
  return (
    <View style={[styles.container(theme), containerStyle]}>
      <View style={styles.infoContainer(theme)}>
        <Avatar size={40} source={{ uri: avatar_link }} username={info.member?.username} style={styles.avatar(theme)} />
        <View style={styles.infoMain(theme)}>
          <View style={styles.infoMainItem(theme)}>
            <TextWithIconPress
              text={info.member?.username ?? 'none'}
              textStyle={[{ color: theme.colors.secondary }]}
              onPress={() => {
                NavigationService.navigate(ROUTES.Profile, { username: info.member?.username })
              }}
            />
            <TextWithIconPress
              text={translate('label.replyedTime').replace('$', dayjs(info.created * 1000).fromNow())}
            />
          </View>
          <View style={styles.infoMainItem(theme)}>
            <RenderHTML
              htmlString={info.content_rendered}
              contentWidth={theme.dimensions.layoutContainerWidth - 40 - theme.spacing.large}
            />
          </View>
        </View>
      </View>
      <BorderLine width={0.4} />
    </View>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    paddingTop: theme.spacing.medium,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }),
  infoContainer: (theme: Theme): ViewStyle => ({
    flexDirection: 'row',
    marginBottom: theme.spacing.small
  }),
  avatar: (theme: Theme): ViewStyle => ({
    width: 40,
    marginRight: theme.spacing.large
  }),
  infoMain: (theme: Theme): ViewStyle => ({
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  }),
  infoMainItem: (theme: Theme): ViewStyle => ({
    flexDirection: 'row',
    marginBottom: theme.spacing.small,
    justifyContent: 'space-between'
  })
}
export default TopicReplayItem
