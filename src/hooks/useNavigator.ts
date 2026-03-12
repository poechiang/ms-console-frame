import { ref, type Ref } from 'vue';
const selectedKeys = ref<string[]>([]);

export const useNavigator = (defaultKey?: string): [Ref<string[]>, (key: string) => void] => {
  if (defaultKey && !selectedKeys.value) {
    selectedKeys.value = [defaultKey];
  }
  return [
    selectedKeys,
    (key: string) => {
      selectedKeys.value = [key];
    },
  ];
};
