import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export * from './aside.ts';
export * from './env.ts';
export * from './header.ts';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
