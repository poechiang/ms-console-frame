declare global {
  interface Window {
    __IS_MFE__: boolean;
    getConsoleService: (name: ServiceKey) => any;
  }
}
export {};
