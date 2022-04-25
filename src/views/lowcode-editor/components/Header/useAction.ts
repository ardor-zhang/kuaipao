// 实现撤销和重做
// 需要在栈中记录操作前后的 editorData
import { editorData } from '@editor/store';
import { EditorData } from '@editor/types';

interface ActionStack {
  before: EditorData[];
  after: EditorData[];
}

const actionStack = <ActionStack[]>[];
let staclIndex = -1;

// 往栈中添加记录
const addAction = (before: EditorData[], after: EditorData[]) => {
  actionStack.splice(staclIndex + 1);
  actionStack.push({
    before,
    after,
  });
  staclIndex++;
};

// 撤销
const revokeAction = () => {
  if (staclIndex === -1) return;
  editorData.value = actionStack[staclIndex].before;
  staclIndex--;
};

// 重做
const redoAction = () => {
  if (staclIndex === actionStack.length - 1) return;
  editorData.value = actionStack[staclIndex + 1].after;
  staclIndex++;
};

export { addAction, revokeAction, redoAction };
