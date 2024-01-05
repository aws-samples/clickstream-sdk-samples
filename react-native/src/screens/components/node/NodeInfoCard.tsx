/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-01 14:00:14.
 * Last modified at 2022-10-20 18:07:33
 */

import { Avatar, Spinner, Text } from '@src/components'
import { useNode } from '@src/hooks/useNode'
import { translate } from '@src/i18n'
import { NavigationService, ROUTES } from '@src/navigation'
import { Theme, SylCommon, useTheme } from '@src/theme'
import { AppObject } from '@src/types'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { RenderHTML, TextWithIconPress } from '../common'
/**
 * NodeInfoCard props
 */
export interface NodeInfoCardProps {
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * node name or id
   */
  nodeid: string | number
  /**
   * Load completion callback
   */
  loadedCallback?: (node: AppObject.Node) => void
}
const NodeInfoCard: React.FC<NodeInfoCardProps> = ({ nodeid, loadedCallback, containerStyle }: NodeInfoCardProps) => {
  const { theme } = useTheme()
  const { node: info } = useNode({ nodeid: nodeid })
  useEffect(() => {
    if (loadedCallback && info !== undefined) {
      loadedCallback(info)
    }
  }, [info])
  const renderContent = () => {
    return (
      <View style={[SylCommon.Card.container(theme), { paddingVertical: theme.spacing.small }, containerStyle]}>
        {info !== undefined ? (
          <>
            <View style={styles.infoItem(theme)}>
              <View style={styles.baseAvatar(theme)}>
                <Avatar size={60} source={info?.avatar_normal ? { uri: info?.avatar_normal } : undefined} />
              </View>
              <View style={styles.baseRightBox(theme)}>
                <View style={styles.baseRightInfo(theme)}>
                  <Text style={[styles.baseRightItem(theme), theme.typography.subheadingText]}>{info?.title}</Text>
                  <View style={styles.infoItem(theme)}>
                    <TextWithIconPress
                      containerStyle={{ marginRight: theme.spacing.small }}
                      text={info?.topics?.toString() ?? 'null'}
                      icon={theme.assets.images.icons.node.docment}
                    />
                    <TextWithIconPress
                      containerStyle={{ marginRight: theme.spacing.small }}
                      text={info?.stars?.toString() ?? 'null'}
                      icon={theme.assets.images.icons.node.star}
                    />
                    <TextWithIconPress
                      onPress={() => {
                        NavigationService.navigate(ROUTES.WebViewer, {
                          url: info?.url
                        })
                      }}
                      text={info?.name?.toString() ?? 'null'}
                      icon={theme.assets.images.icons.node.urlscheme}
                    />
                  </View>
                  {info?.last_modified ? (
                    <Text style={[styles.baseRightItem(theme), theme.typography.captionText]}>
                      {translate('label.activeLatest').replace(
                        '$',
                        dayjs(info?.last_modified * 1000).format('YYYY-MM-DD HH:mm:ss')
                      )}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
            {info?.header && info.header !== '' ? (
              <View style={styles.infoItem(theme)}>
                <RenderHTML
                  htmlString={info?.header}
                  contentWidth={theme.dimensions.WINDOW_WIDTH - theme.dimensions.layoutContainerHorizontalMargin * 2}
                />
              </View>
            ) : null}
            {info?.created ? (
              <Text style={[styles.infoItem(theme), theme.typography.captionText]}>
                {translate('label.createNodeSinceTime').replace('$', dayjs(info?.created * 1000).format())}
              </Text>
            ) : null}
          </>
        ) : (
          <View style={{ height: 100 }}>
            <Spinner size="small" />
          </View>
        )}
      </View>
    )
  }
  return renderContent()
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column'
  }),
  infoItem: (theme: Theme): ViewStyle => ({
    paddingBottom: theme.spacing.medium,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  }),
  baseAvatar: (theme: Theme): ViewStyle => ({
    width: 60,
    height: 60,
    marginRight: theme.spacing.medium
  }),
  baseRightBox: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }),
  baseRightInfo: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start'
  }),
  baseRightArrow: (theme: Theme): ViewStyle => ({
    width: 14,
    display: 'flex',
    justifyContent: 'center'
  }),
  baseRightItem: (theme: Theme): ViewStyle => ({
    paddingBottom: theme.spacing.small
  })
}
export default NodeInfoCard
