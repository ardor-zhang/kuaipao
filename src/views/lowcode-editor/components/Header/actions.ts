import revoke from '@/assets/action/revoke.svg?raw';
import redo from '@/assets/action/redo.svg?raw';
import { revokeAction, redoAction } from './useAction';

interface Action {
  lable: string;
  icon: string;
  keyboard: string;
  event: () => void;
}

const actions = <Action[]>[];
const actionsKeyMapEvent = <Record<string, () => void>>{};

const registerAction = (action: Action) => {
  actions.push(action);
  actionsKeyMapEvent[action.keyboard] = action.event;
};

registerAction({
  lable: '撤销',
  icon: revoke,
  keyboard: 'Ctrl + z',
  event: () => revokeAction(),
});

registerAction({
  lable: '重做',
  icon: redo,
  keyboard: 'Ctrl + y',
  event: () => redoAction(),
});

const handleKeydown = (e: KeyboardEvent) => {
  const { ctrlKey, key } = e;
  if (ctrlKey) {
    actionsKeyMapEvent[`Ctrl + ${key}`] &&
      actionsKeyMapEvent[`Ctrl + ${key}`]();
  }
};

const bindKeybordEvent = (() => {
  window.addEventListener('keydown', handleKeydown);
  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
})();

export { actions, bindKeybordEvent };
