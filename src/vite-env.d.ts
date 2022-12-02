/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TESTING_DAY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
