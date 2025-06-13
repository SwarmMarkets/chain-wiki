import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api.studio.thegraph.com/query/60829/chainwiki-base/v0.0.1',
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
