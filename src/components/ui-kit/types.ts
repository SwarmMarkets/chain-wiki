/* eslint-disable @typescript-eslint/no-namespace */
// import { Theme } from 'src/theme'

export namespace UiKit {
  export type Colors = 'inherit' | 'primary' | 'secondary' | string
  export type Sizes = 'sm' | 'md' | 'lg'
  export type Component = React.FC & {
    className: string
  }
}
