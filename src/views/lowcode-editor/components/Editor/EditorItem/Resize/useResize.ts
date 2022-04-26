import { Ref } from 'vue';
import { editorData } from '@editor/store';
import { EditorData, ResizeDirection } from '@editor/types';
import { cloneDeep } from 'lodash-es';
import { addAction } from '@editor/components/Header/useAction';

export default function useResize(item: Ref<EditorData>) {
  const mouseState = {
    x: 0,
    y: 0,
  };

  const resizeDirection: ResizeDirection = {
    horizontal: 'left',
    vertical: 'top',
  };

  let before: EditorData[] = [];

  const handleResizeMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    let moveX = clientX - mouseState.x;
    let moveY = clientY - mouseState.y;

    // if (item.value.style.width! < 2 && moveX < 0) {
    //   return;
    // }

    // if (item.value.style.height! < 2 && moveY < 0) {
    //   return;
    // }

    mouseState.x += moveX;
    mouseState.y += moveY;
    // 横向中间缩放，横向方向不生效
    if (resizeDirection.horizontal === 'center') {
      moveX = 0;
    }

    // 纵向中间缩放，纵向方向不生效
    if (resizeDirection.vertical === 'center') {
      moveY = 0;
    }

    // 向左缩放，left 值需要发生变化
    if (resizeDirection.horizontal === 'left') {
      item.value.position.left += moveX;
      moveX = -moveX;
    }

    // 向上缩放，top 值需要发生变化
    if (resizeDirection.vertical === 'top') {
      item.value.position.top += moveY;
      moveY = -moveY;
    }

    item.value.style.width! += moveX;
    item.value.style.height! += moveY;
  };

  const handleResizeMouseUp = () => {
    document.removeEventListener('mousemove', handleResizeMouseMove);
    document.removeEventListener('mouseup', handleResizeMouseUp);
    addAction(before, cloneDeep(editorData.value));
  };

  const handleResizeMouseDown = (e: MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
    before = cloneDeep(editorData.value);
    // 1. 记录鼠标开始移动的位置
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;

    // 3. 方向
    resizeDirection.horizontal = direction.horizontal;
    resizeDirection.vertical = direction.vertical;

    // 4.
    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  return {
    handleResizeMouseDown,
  };
}
