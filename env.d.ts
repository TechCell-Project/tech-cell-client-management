declare namespace NodeJS {
  export interface ProcessEnv {
    readonly API_BASE_URL: string;
    readonly API_KEY_TINYMCE: string;
    readonly URL_HOST_SOCKET_IO: string;
  }
}