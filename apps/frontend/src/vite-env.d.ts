/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_LOCAL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
