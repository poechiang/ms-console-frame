declare global {
  interface Window {
    __FRAME_IN_MFE__: boolean;
    __MODULE_IN_MFE__: boolean;
    getConsoleService: (name: ServiceKey) => any;
  }
}
export {};
