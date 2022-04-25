// 实现撤销和重做
// 需要在栈中记录操作前后的 editorData
import { editorData } from '@editor/store';
import { EditorData } from '@editor/types';

interface ActionStack {
  before: EditorData[];
  after: EditorData[];
}

const actionStack = <ActionStack[]>[];
let i = -1;

const addAction = (before: EditorData[], after: EditorData[]) => {
  actionStack.push({
    before,
    after,
  });
  i++;
};

const revokeAction = () => {
  if (i === -1) return;
  editorData.value = actionStack[i].before;
  i--;
};

const redoAction = () => {
  if (i === actionStack.length - 1) return;
  editorData.value = actionStack[i + 1].after;
  i++;
};

export { addAction, revokeAction, redoAction };
