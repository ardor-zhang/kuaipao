import revoke from '@/assets/action/revoke.svg?raw';
import redo from '@/assets/action/redo.svg?raw';
import { revokeAction, redoAction } from './useAction';

const action = [
  {
    lable: '撤销',
    icon: revoke,
    event: () => revokeAction(),
  },
  {
    lable: '重做',
    icon: redo,
    event: () => redoAction(),
  },
];

export { action };
