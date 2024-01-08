/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-29 15:02:27.
 * Last modified at 2022-10-20 18:07:33
 */

import { Placeholder, useToast } from '@src/components'
import { translate } from '@src/i18n'
import { Theme, useTheme } from '@src/theme'
import { AppObject } from '@src/types'
import { ApiLib } from '@src/api'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { TabCardContainer } from '../common'
import { TopicCardList } from '../topic'
/**
 * ProfileTopics props
 */
export interface ProfileTopicsProps {
  containerStyle?: StyleProp<ViewStyle>
  username: string
}
const ProfileTopics: React.FC<ProfileTopicsProps> = ({ containerStyle, username }: ProfileTopicsProps) => {
  const { theme } = useTheme()
  const { showMessage } = useToast()
  const [list, setList] = useState<AppObject.Topic[] | undefined>(undefined)
  useEffect(() => {
    fetchTopics()
  }, [username])
  const fetchTopics = useCallback(() => {
    ApiLib.topic
      .topics(username, 'username')
      .then((res) => {
        setList(res)
      })
      .catch((err) => {
        setList([])
        showMessage({
          text1: 'error',
          text2: err.text
        })
      })
  }, [username])
  const renderContent = () => {
    return (
      <>
        {list === undefined || list.length > 0 ? (
          <TabCardContainer
            containerStyle={[styles.container(theme), containerStyle]}
            icon={theme.assets.images.icons.tabbar.title.latest}
            title={translate('label.postedTopics').replace('$', username)}>
            <TopicCardList
              itemContainerStyle={[{ paddingHorizontal: 0 }]}
              useFlatList={false}
              topics={list}
              containerStyle={{ paddingHorizontal: 0 }}
            />
          </TabCardContainer>
        ) : (
          <Placeholder
            containerStyle={[styles.container(theme), containerStyle]}
            placeholderText={translate('placeholder.noPostTopics')}
            buttonText={translate('common.refresh')}
            buttonPress={fetchTopics}
          />
        )}
      </>
    )
  }
  return renderContent()
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    marginTop: theme.spacing.small
  })
}
export default ProfileTopics
