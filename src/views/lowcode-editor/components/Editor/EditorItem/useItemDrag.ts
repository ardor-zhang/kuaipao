import { ref, Ref } from 'vue';
import {
  dataWithSelectedStatus,
  currentSelectedItemRef,
  currentSelectedItemData,
  editorData,
} from '@editor/store';
import { EditorData } from '@editor/types';
import { clearAllSelected } from '@editor/utils/handleEditorData';
import {
  guideLines,
  generateGuideLineDistance,
  automaticApproach,
} from '../useGuidelines';
import { cloneDeep } from 'lodash-es';

import { addAction } from '@editor/components/Header/useAction';

export default function useItemDrag(item: Ref<EditorData>, itemRef: Ref) {
  const itemDragState = {
    startX: 0,
    startY: 0,
  };

  let before: EditorData[] = [];

  const draging = ref(false);
  const handleMouseMove = (e: MouseEvent) => {
    if (!itemRef.value) return;
    const { clientX, clientY } = e; // 当前鼠标相对于浏览器左上角的位置
    const moveX = clientX - itemDragState.startX; // 鼠标在 x 方向移动的位置
    const moveY = clientY - itemDragState.startY;
    itemDragState.startX = clientX; // 保存当前鼠标的位置
    itemDragState.startY = clientY;

    const auto = automaticApproach({ moveX, moveY });

    dataWithSelectedStatus.value.selectedItem.forEach((i) => {
      i.style.left += moveX + auto.x; // 重新定位元素
      i.style.top += moveY + auto.y;
    });
  };

  const handleMouseUp = () => {
    // editorBoxRef.value?.removeEventListener('mousemove', handleMouseMove);
    // editorBoxRef.value?.removeEventListener('mouseup', handleMouseUp);
    draging.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    guideLines.isX = false;
    guideLines.isY = false;
    addAction(before, cloneDeep(editorData.value));
  };

  const handleItemSelectedStatus = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.shiftKey) {
      // 未按住 shift 键
      clearAllSelected(); // 清空所有已选中元素
    }
    item.value.selected = true;
  };

  const handleMouseDown = (e: MouseEvent) => {
    before = cloneDeep(editorData.value);
    // 0. 记录当前被选中的元素
    currentSelectedItemRef.value = itemRef.value;
    currentSelectedItemData.value = item.value;

    // 1. 在元素上按下鼠标时
    draging.value = true;
    handleItemSelectedStatus(e);
    // 2. 记录鼠标开始移动的位置
    itemDragState.startX = e.clientX;
    itemDragState.startY = e.clientY;
    // 3. 计算出参照当前被选中的元素的辅助线
    generateGuideLineDistance();

    // 4. 在
    // editorBoxRef.value?.addEventListener('mousemove', handleMouseMove);
    // editorBoxRef.value?.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return {
    handleMouseDown,
    draging,
  };
}
