import { EventEmitter, type CfEventMap } from '@shared/types';
import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', () => {
  const emitter = new EventEmitter<CfEventMap>();

  // 封装快捷方法，避免外部直接操作 bus 实例（可选，增加安全性）
  return {
    on: <K extends keyof CfEventMap>(event: K, callback: (...args: CfEventMap[K]) => void) => {
      emitter.on(event, callback);
    },

    off: <K extends keyof CfEventMap>(event: K, callback: (...args: CfEventMap[K]) => void) => {
      emitter.off(event, callback);
    },

    emit: <K extends keyof CfEventMap>(event: K, ...args: CfEventMap[K]) => {
      emitter.emit(event, ...args);
    },

    once: <K extends keyof CfEventMap>(event: K, callback: (...args: CfEventMap[K]) => void) => {
      emitter.once(event, callback);
    },

    clear: <K extends keyof CfEventMap>(event: K) => {
      emitter.clear(event);
    },
  };
});
