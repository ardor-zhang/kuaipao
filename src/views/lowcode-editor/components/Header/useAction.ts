// 实现撤销和重做
// 需要在栈中记录操作前后的 editorData
import { editorData, dataWithSelectedStatus } from '@editor/store';
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

// 置顶
const placeTopAction = () => {
  // 1. 找到所有未选中的最大 index
  const maxIndex = dataWithSelectedStatus.value.unSelectedItem.reduce(
    (prevIndex, i) => {
      return Math.max(prevIndex, i.style.zIndex);
    },
    0,
  );
  // 所有选中的index = maxIndex + 1;
  dataWithSelectedStatus.value.selectedItem.forEach(
    (i) => (i.style.zIndex = maxIndex + 1),
  );
};

// 置底
const placeBottomAction = () => {
  // 1. 找到所有未选中的最小 index
  const minIndex = dataWithSelectedStatus.value.unSelectedItem.reduce(
    (prevIndex, i) => {
      return Math.min(prevIndex, i.style.zIndex);
    },
    Infinity,
  );
  // 所有选中的index = minIndex - 1;
  dataWithSelectedStatus.value.selectedItem.forEach(
    (i) => (i.style.zIndex = minIndex - 1),
  );
};

export {
  addAction,
  revokeAction,
  redoAction,
  placeTopAction,
  placeBottomAction,
};
