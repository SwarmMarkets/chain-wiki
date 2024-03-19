import icons from '../consts/icons'

export interface Tab<T = string> {
  value: T
  label: string
}

export interface ButtonOption {
  value: string
  label: string
}

export type IconName = keyof typeof icons
