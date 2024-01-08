/**
 * Created by Leon<silenceace@gmail.com> at 2022-03-20 23:00:11.
 * Last modified at 2022-10-20 18:07:33
 */

import { store } from '@src/store'
import { AppObject } from '@src/types'
/**
 * home tab nodes
 */
export interface TabNodeProps {
  title: string
  parentNodeNames: any[]
  children?: AppObject.Node[]
}
export let TabNodes: TabNodeProps[] = [
  { title: 'Life', parentNodeNames: ['life'] },
  { title: 'Geek', parentNodeNames: ['geek'] },
  { title: 'V2EX', parentNodeNames: ['v2ex'] },
  { title: 'Internet', parentNodeNames: ['internet'] },
  { title: 'Programming', parentNodeNames: ['programming'] },
  { title: 'Apple', parentNodeNames: ['apple'] },
  { title: 'Games', parentNodeNames: ['games'] },
  { title: 'Cloud', parentNodeNames: ['cloud'] },
  { title: 'Hardware', parentNodeNames: ['hardware'] },
  { title: 'Earth', parentNodeNames: ['cn', 'us'] }
]
export const nodeChildren = (rootNode: TabNodeProps, nodeData?: AppObject.Node[]): AppObject.Node[] => {
  const { title, parentNodeNames: parentNodes } = rootNode
  let nodes: AppObject.Node[] = []
  const all_node = nodeData ?? store.getState().app.allNode
  if (!all_node) return nodes
  return all_node.filter((v) => parentNodes.includes(v.parent_node_name))
}
