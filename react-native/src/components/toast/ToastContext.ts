/**
 * Created by Leon<silenceace@gmail.com> at 2022-03-10 22:00:57.
 * Last modified at 2022-04-11 20:33:24
 */

import React, { ReactNode, useContext } from 'react'
import { ToastShowParams as ToastMessageShowParams } from 'react-native-toast-message/lib'
export type ToastPositionType = 'top' | 'center' | 'bottom'
export interface ToastShowProps {
  text: string | ReactNode
  position?: ToastPositionType
  duration?: number
  opacity?: number
  callback?: () => void
}
export type ToastShowType = ToastShowProps | string
export interface ToastContextProps {
  showToast: (opts: ToastShowType) => void
  showMessage: (opts: string | ToastMessageShowParams) => void
  hideMessage: (params?: any) => void
  closeToast: (duration?: number) => void
}
export const ToastContext = React.createContext<ToastContextProps>({
  showToast: () => {},
  showMessage: () => {},
  hideMessage: () => {},
  closeToast: () => {}
})
export const useToast = () => useContext(ToastContext)
export default ToastContext
