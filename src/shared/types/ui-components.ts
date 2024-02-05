import icons from '../consts/icons'

export interface Tab {
  id: number
  title: string
  content: React.ReactNode
}

export interface ButtonOption {
  value: string;
  label: string;
}

export type IconName = keyof typeof icons
