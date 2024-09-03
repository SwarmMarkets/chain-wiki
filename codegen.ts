import type { CodegenConfig } from '@graphql-codegen/cli'
import { environment } from './src/environment'

const config: CodegenConfig = {
  overwrite: true,
  schema: environment.subgraphURL,
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/queries/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
  config: {
    scalars: {
      BigInt: 'string',
      Bytes: 'string',
    },
  },
}

export default config
