import { TextFieldTypes, TextFieldValue } from './types'

export const fieldTypes: {
  [k in TextFieldTypes]: {
    format?: (v: string) => string
    transform?: (v: string) => TextFieldValue<k>
    display?: (v: TextFieldValue<k> | string) => string
  }
} = {
  text: {},
}
