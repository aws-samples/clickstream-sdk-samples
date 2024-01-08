/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-15 21:52:35.
 * Last modified at 2022-11-09 16:15:36
 */

import * as React from 'react'
import { View, TouchableOpacity, ViewStyle, TextStyle, StyleProp } from 'react-native'
import { Theme, AppObject } from '@src/types'
import { SylCommon, useTheme } from '@src/theme'
import { Avatar, Text } from '@src/components'
import dayjs from 'dayjs'
import { NavigationService, ROUTES } from '@src/navigation'
import { BorderLine, TextWithIconPress } from '../common'
import { useMemo } from 'react'
import { translate } from '@src/i18n'
export interface TopicCardItemProps {
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Display Style
   */
  displayStyle?: 'simple' | 'full' | 'auto'
  /**
   * Whether to show last reply users
   */
  showlastReplay?: boolean
  /**
   * Topic Info
   */
  topic: AppObject.Topic
  /**
   * Topic Title Press Event
   */
  onPress?: (topic: AppObject.Topic) => void
}
const TopicCardItem = ({
  containerStyle,
  showlastReplay = true,
  displayStyle = 'auto',
  topic,
  onPress
}: TopicCardItemProps) => {
  const { theme } = useTheme()
  const display_style = useMemo(
    () =>
      ['auto', 'full'].includes(displayStyle) && topic.member && (topic.member.avatar || topic.member.avatar_normal)
        ? 'full'
        : 'simple',
    [displayStyle]
  )
  const avatar_link = useMemo(
    () => (topic.member ? topic.member.avatar || topic.member.avatar_normal : undefined),
    [topic]
  )
  return (
    <View style={[styles.container(theme), containerStyle]}>
      <View style={styles.infoContainer(theme)}>
        {display_style === 'full' && (
          <Avatar
            size={40}
            source={{ uri: avatar_link }}
            username={topic.member?.username}
            style={styles.avatar(theme)}
          />
        )}
        <View style={styles.infoMain(theme)}>
          {display_style === 'full' && (
            <View style={styles.infoMainItem(theme)}>
              <TextWithIconPress
                text={topic.member?.username ?? 'none'}
                textStyle={[{ color: theme.colors.secondary }]}
                onPress={() => {
                  NavigationService.navigate(ROUTES.Profile, { username: topic.member?.username })
                }}
              />
              <TextWithIconPress
                text={translate('label.postedTime').replace('$', dayjs(topic.created * 1000).fromNow())}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.infoMainItem(theme)}
            onPress={() => {
              onPress && onPress(topic)
            }}>
            <Text type="body" style={styles.title(theme)}>
              {topic.title}
            </Text>
          </TouchableOpacity>
          <View style={styles.infoMainItem(theme)}>
            <View style={styles.summaryContainer(theme)}>
              {topic.last_reply_by !== '' && showlastReplay ? (
                <TextWithIconPress
                  containerStyle={[{ marginRight: theme.spacing.small }]}
                  text={topic.last_reply_by}
                  icon={theme.assets.images.icons.topic.talk}
                  textStyle={[{ color: theme.colors.secondary }]}
                  onPress={() => {
                    NavigationService.navigate(ROUTES.Profile, { username: topic.last_reply_by })
                  }}
                />
              ) : null}
              <TextWithIconPress
                containerStyle={[{ marginRight: theme.spacing.small }]}
                text={topic.replies.toString()}
                icon={theme.assets.images.icons.topic.comment}
              />
              <TextWithIconPress
                text={dayjs(topic.last_touched * 1000).fromNow()}
                icon={theme.assets.images.icons.topic.time}
              />
            </View>
            {display_style === 'full' && topic.node ? (
              <TextWithIconPress
                text={topic.node?.title}
                onPress={() => {
                  NavigationService.navigate(ROUTES.NodeDetail, {
                    nodeName: topic.node?.name,
                    nodeTitle: topic.node?.title
                  })
                }}
                icon={theme.assets.images.icons.topic.paper}
                textStyle={[{ color: theme.colors.secondary }]}
              />
            ) : (
              <TextWithIconPress text={dayjs(topic.created * 1000).fromNow()} />
            )}
          </View>
        </View>
      </View>
      <BorderLine width={0.4} />
    </View>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    paddingTop: theme.spacing.small,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }),
  infoContainer: (theme: Theme): ViewStyle => ({
    flexDirection: 'row',
    marginBottom: theme.spacing.tiny
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
  }),
  summaryContainer: (theme: Theme): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }),
  title: (theme: Theme): TextStyle => ({
    ...theme.typography.bodyText
  })
}
export default TopicCardItem
