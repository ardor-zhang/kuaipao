import { ref, Ref } from 'vue';
import { dataWithSelectedStatus } from '@editor/store';
import { EditorData } from '@editor/types';

import { clearAllSelected } from '@editor/utils/handleEditorData';

export default function useItemDrag(item: EditorData, itemRef: Ref) {
  const itemDragState = {
    startX: 0,
    startY: 0,
  };

  const draging = ref(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!itemRef.value) return;
    const { clientX, clientY } = e; // 当前鼠标相对于浏览器左上角的位置
    const moveX = clientX - itemDragState.startX; // 鼠标在 x 方向移动的位置
    const moveY = clientY - itemDragState.startY;
    itemDragState.startX = clientX; // 保存当前鼠标的位置
    itemDragState.startY = clientY;

    dataWithSelectedStatus.value.selectedItem.forEach((i) => {
      i.style.left += moveX; // 重新定位元素
      i.style.top += moveY;
    });
  };

  const handleMouseUp = () => {
    // editorBoxRef.value?.removeEventListener('mousemove', handleMouseMove);
    // editorBoxRef.value?.removeEventListener('mouseup', handleMouseUp);
    draging.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleItemSelectedStatus = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.shiftKey) {
      // 未按住 shift 键
      clearAllSelected(); // 清空所有已选中元素
    }
    item.selected = !item.selected;
  };

  const handleMouseDown = (e: MouseEvent) => {
    // 1. 在元素上按下鼠标时
    draging.value = true;
    handleItemSelectedStatus(e);
    // 2. 记录鼠标开始移动的位置
    itemDragState.startX = e.clientX;
    itemDragState.startY = e.clientY;
    // 3. 在
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
