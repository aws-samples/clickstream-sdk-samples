/**
 * Created by Leon<silenceace@gmail.com> at 2022-10-20 17:25:36.
 * Last modified at 2022-10-21 14:31:58
 */

import { AppAPI, AppObject } from '../../types'
export default (v2ex: AppAPI.APP): AppAPI.NodeAPI => ({
  get: (id: string | number, version: AppAPI.API_VERSION): Promise<AppObject.Node> =>
    v2ex.get<AppObject.Node>(
      version === 'v2' ? `/nodes/${id}` : `/nodes/show.json?${typeof id === 'string' ? 'name' : 'id'}=${id}`,
      undefined,
      undefined,
      undefined,
      version
    ),
  all: () => v2ex.get<AppObject.Node[]>('/nodes/all.json', undefined, undefined, undefined, undefined)
})
