import {
  HTMLAttributes,
  InputHTMLAttributes,
  LegacyRef,
  ReactNode,
} from 'react'
import { UiKit } from '../types'

type TextFieldVariant = 'outlined' | 'text'

export type TextFieldTypes = 'text'
export type TextFieldValue<T extends TextFieldTypes> = T extends 'text'
  ? string
  : unknown

export interface TextFieldProps<T extends TextFieldTypes = TextFieldTypes>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: TextFieldVariant
  size?: UiKit.Sizes
  align?: 'left' | 'right'
  StartAdornment?: ReactNode
  EndAdornment?: ReactNode
  errorMessage?: string
  hideError?: boolean
  type?: T
  value?: TextFieldValue<T>
  onChange?: (value: TextFieldValue<T>) => void
  inputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: LegacyRef<HTMLInputElement>
  }
  className?: string
  disabled?: boolean
}
