/**
 * Created by Leon<silenceace@gmail.com> at 2022-03-17 22:17:19.
 * Last modified at 2022-10-20 18:07:33
 */

import { Avatar, Placeholder, Spinner, useToast } from '@src/components'
import { useMember } from '@src/hooks/useMember'
import { useSession } from '@src/hooks/useSession'
import { translate } from '@src/i18n'
import { SylCommon, useTheme } from '@src/theme'
import { Theme, AppObject } from '@src/types'
import { ApiLib } from '@src/api'
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'
import { FlatList, RefreshControl, StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { NeedLogin } from '../'
import { BorderLine, RenderHTML, TextWithIconPress } from '../common'
export interface NotificationListProps {
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>
}
const NotificationList: React.FC<NotificationListProps> = ({ containerStyle }: NotificationListProps) => {
  const { theme } = useTheme()
  const { logined } = useSession()
  const { showMessage } = useToast()
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [list, setList] = useState<AppObject.Notification[] | undefined>(undefined)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const fetchNotifications = useCallback(
    (pageNum: number) => {
      if (!logined || (pageNum > 1 && !hasMore)) {
        return
      }
      if (pageNum === 1) {
        setList(undefined)
      }
      setRefreshing(pageNum === 1)
      setLoadMore(pageNum > 1)
      ApiLib.notification
        .list(pageNum)
        .then((rlt: AppObject.Notification[]) => {
          if (rlt.length === 0 && pageNum > 1) {
            setHasMore(false)
          }
          setRefreshing(false)
          setLoadMore(false)
          setList((list || []).concat(rlt))
        })
        .catch((err) => {
          showMessage(err.message)
        })
    },
    [showMessage, page, logined]
  )
  const onRefresh = useCallback(() => {
    setPage(1)
    fetchNotifications(page)
  }, [])
  const MemberAvatar = ({ userid }: { userid: number }) => {
    const { member: profile } = useMember({ userid: userid, forcePull: false })
    return <Avatar size={40} source={{ uri: profile?.avatar_normal }} username={profile?.username} />
  }
  const renderItemRow = ({ item }: { item: AppObject.Notification }) => {
    if (!item || item === null) return null
    return (
      <View style={[styles.itemContainer(theme), SylCommon.Card.container(theme)]}>
        <View style={styles.itemLeft(theme)}>
          <MemberAvatar userid={item.member_id} />
        </View>
        <View style={styles.itemRight(theme)}>
          <View style={styles.itemRightItem(theme)}>
            <RenderHTML
              contentWidth={theme.dimensions.layoutContainerWidth - 40 - theme.spacing.large}
              htmlString={item.text}
            />
          </View>
          {item.payload && item.payload !== '' ? (
            <View style={styles.itemRightItem(theme)}>
              <RenderHTML
                contentWidth={theme.dimensions.layoutContainerWidth - 40 - theme.spacing.large}
                htmlString={item.payload_rendered}
              />
            </View>
          ) : null}
          <View style={[styles.itemRightItem(theme), styles.itemAction(theme)]}>
            <TextWithIconPress
              icon={theme.assets.images.icons.notification.time}
              text={dayjs(item.created * 1000).fromNow()}
            />
            <TextWithIconPress icon={theme.assets.images.icons.notification.action} />
          </View>
        </View>
      </View>
    )
  }
  const renderFooter = () => {
    if (loadMore) {
      return <Spinner style={{ padding: theme.spacing.large }} />
    } else if (list && list.length > 0) {
      return <Placeholder placeholderText={translate('tips.noMore')} />
    }
    return null
  }
  const onReached = () => {
    if (hasMore && !loadMore && !refreshing) {
      setPage(page + 1)
    }
  }
  const renderItemSeparator = () => <BorderLine />
  const renderRefreshControl = () => <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  const renderContent = () => {
    if (!list) {
      return <Spinner style={{ marginTop: 50 }} />
    }
    if (list.length > 0) {
      return (
        <FlatList
          refreshControl={renderRefreshControl()}
          data={list}
          renderItem={renderItemRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          numColumns={1}
          key={'ONE COLUMN'}
          ItemSeparatorComponent={renderItemSeparator}
        />
      )
    }
    return (
      <Placeholder
        placeholderText={translate('placeholder.noNotifications')}
        buttonText={translate('button.oneceAgain')}
        buttonPress={onReached}
      />
    )
  }
  return (
    <NeedLogin
      onMount={() => {
        onRefresh()
      }}>
      <View style={containerStyle}>{renderContent()}</View>
    </NeedLogin>
  )
}
/**
 * @description styles settings
 */
const styles = {
  itemContainer: (theme: Theme): ViewStyle => ({
    flex: 1,
    paddingTop: theme.spacing.small,
    flexDirection: 'row'
  }),
  itemLeft: (theme: Theme): ViewStyle => ({
    width: 40,
    marginRight: 15
  }),
  itemRight: (theme: Theme): ViewStyle => ({
    flex: 1,
    flexDirection: 'column'
  }),
  itemRightItem: (theme: Theme): TextStyle => ({
    marginBottom: theme.spacing.medium
  }),
  itemAction: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  })
}
export default NotificationList
