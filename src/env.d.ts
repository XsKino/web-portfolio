/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly PUBLIC_EMAILJS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
