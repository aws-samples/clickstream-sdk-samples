/**
 * Created by Leon<silenceace@gmail.com> at 2022-10-20 17:25:36.
 * Last modified at 2022-10-21 14:31:58
 */

import { AppAPI, AppObject } from '../../types'
export default (v2ex: AppAPI.APP): AppAPI.MemberAPI => ({
  myToken: () => v2ex.get<AppObject.MemberToken>('/token', undefined, undefined, undefined, 'v2'),
  myProfile: () => v2ex.get<AppObject.Member>('/member', undefined, undefined, undefined, 'v2'),
  profile: (id: string | number) =>
    v2ex.get<AppObject.Member>(
      `/members/show.json?${typeof id === 'string' ? 'username' : 'id'}=${id}`,
      undefined,
      undefined,
      undefined,
      undefined
    ),
  token: (token: string) =>
    v2ex.get<AppObject.MemberToken>(
      `/token`,
      {
        Authorization: `Bearer ${token}`
      },
      undefined,
      undefined,
      'v2'
    )
})
