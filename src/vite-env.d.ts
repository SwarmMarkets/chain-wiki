/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THIRD_WEB_CLIENT_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}