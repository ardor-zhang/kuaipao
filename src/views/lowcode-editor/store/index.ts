import { computed, reactive, ref } from 'vue';
import { EditorData } from '@editor/types';

const editorBoxRef = ref<null | HTMLElement>(null);

const editorData = ref<{ data: EditorData[] }>({ data: [] });

const dataWithSelectedStatus = computed(() => {
  const selectedItem = <EditorData[]>[];
  const unSelectedItem = <EditorData[]>[];

  editorData.value.data.forEach((item) =>
    (item.selected ? selectedItem : unSelectedItem).push(item),
  );

  return {
    selectedItem,
    unSelectedItem,
  };
});

// 当前被选中的组件的 ref
const currentSelectedItemRef = ref<null | HTMLElement>(null);

// 当前被选中的组件的 data
const currentSelectedItemData = ref<null | EditorData>(null);
// {
//   id: {
//     ref:
//     data:
//   }
// }

export {
  editorBoxRef,
  editorData,
  dataWithSelectedStatus,
  currentSelectedItemRef,
  currentSelectedItemData,
};
