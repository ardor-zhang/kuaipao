import { ref } from 'vue';
import { nanoid } from 'nanoid';
import { editorBoxRef, editorData } from '@editor/store';
import { EditorData, Package } from '@editor/types/index';
import { addAction } from '@editor/components/Header/useAction';
// 实现组件拖拽到画布

export default function useDragPackage() {
  const currentPackage = ref<Package | null>(null);

  const dragenter = (e: DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    } else {
      console.log('不支持拖拽');
    }
  };
  const dragover = (e: DragEvent) => {
    e.preventDefault();
  };
  const dragleave = (e: DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'none';
    } else {
      console.log('不支持拖拽');
    }
  };
  const drop = (e: DragEvent) => {
    if (!currentPackage.value) {
      return console.log('未获取到组件');
    }

    const after: EditorData[] = [
      ...editorData.value,
      {
        id: nanoid(),
        key: currentPackage.value.key,
        isFirst: true,
        selected: false,
        position: {
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
        },
        style: {},
      },
    ];

    addAction(editorData.value, after);
    editorData.value = after;
    currentPackage.value = null;
  };

  const dragStart = (item: Package) => {
    // dragenter 进入元素中，添加一个移动的表示
    // dragover 在目标元素进过，必须阻止默认行为，否则不能触发 drop
    // dragleave 离开元素的时候，需要增加一个警用表示
    // drop 松手的时候 根据拖拽的组件添加一个组件
    currentPackage.value = item;
    editorBoxRef.value?.addEventListener('dragenter', dragenter);
    editorBoxRef.value?.addEventListener('dragover', dragover);
    editorBoxRef.value?.addEventListener('dragleave', dragleave);
    editorBoxRef.value?.addEventListener('drop', drop);
  };

  const dragEnd = () => {
    editorBoxRef.value?.removeEventListener('dragenter', dragenter);
    editorBoxRef.value?.removeEventListener('dragover', dragover);
    editorBoxRef.value?.removeEventListener('dragleave', dragleave);
    editorBoxRef.value?.removeEventListener('drop', drop);
  };

  return {
    dragStart,
    dragEnd,
  };
}
