/**
 * Created by Leon<silenceace@gmail.com> at 2022-04-01 14:00:14.
 * Last modified at 2022-10-20 18:07:33
 */

import { Theme, SylCommon, useTheme } from '@src/theme'
import { AppObject } from '@src/types'
import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import ProfileInfo from './ProfileInfo'
import ProfileTopics from './ProfileTopics'
/**
 * ProfileDetail props
 */
export interface ProfileDetailProps {
  containerStyle?: StyleProp<ViewStyle>
  profile: AppObject.Member
}
const ProfileDetail: React.FC<ProfileDetailProps> = ({ containerStyle, profile }: ProfileDetailProps) => {
  const { theme } = useTheme()
  const renderContent = () => {
    return (
      <View style={containerStyle}>
        <ProfileInfo
          containerStyle={[SylCommon.Card.container(theme), { paddingTop: theme.spacing.medium }]}
          info={profile}
          styleType="full"
        />
        <ProfileTopics username={profile.username} containerStyle={[{ marginTop: theme.spacing.small }]} />
      </View>
    )
  }
  return renderContent()
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1
  })
}
export default ProfileDetail
