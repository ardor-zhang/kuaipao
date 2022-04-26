import revoke from '@/assets/action/revoke.svg?raw';
import redo from '@/assets/action/redo.svg?raw';
import placeTop from '@/assets/action/place-top.svg?raw';
import placeBottom from '@/assets/action/place-bottom.svg?raw';
import delete_ from '@/assets/action/delete.svg?raw';
import clear from '@/assets/action/clear.svg?raw';
import {
  revokeAction,
  redoAction,
  placeTopAction,
  placeBottomAction,
  deleteAction,
  clearAction,
} from './useAction';

interface Action {
  lable: string;
  icon: string;
  keyboard?: string;
  event: () => void;
}

const actions = <Action[]>[];
const actionsKeyMapEvent = <Record<string, () => void>>{};

const registerAction = (action: Action) => {
  actions.push(action);
  if (action.keyboard) {
    actionsKeyMapEvent[action.keyboard] = action.event;
  }
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
registerAction({
  lable: '置顶',
  icon: placeTop,
  event: () => placeTopAction(),
});
registerAction({
  lable: '置底',
  icon: placeBottom,
  event: () => placeBottomAction(),
});
registerAction({
  lable: '删除',
  icon: delete_,
  event: () => deleteAction(),
});
registerAction({
  lable: '清空',
  icon: clear,
  event: () => clearAction(),
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
