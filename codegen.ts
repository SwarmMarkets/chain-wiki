
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.studio.thegraph.com/proxy/46523/chain-wiki/version/latest",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "src/queries/gql/": {
      preset: "client",
      plugins: []
    },
  },
  config: {
    scalars: {
      BigInt: "string",
      Bytes: "string",
    }
  }
};

export default config;
