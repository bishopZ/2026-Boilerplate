/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEATURE_FLAGS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
