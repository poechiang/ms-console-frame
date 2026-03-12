import { useNavigator } from '@/hooks/useNavigator';

export class NavigatorService {
  active(key: string) {
    const [_, setSelectedKeys] = useNavigator();
    setSelectedKeys(key);
  }
}
