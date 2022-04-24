import { computed, ref } from 'vue';
import { EditorData } from '@editor/types';

const editorBoxRef = ref<null | HTMLElement>(null);

const editorData = ref<EditorData[]>([]);

const dataWithSelectedStatus = computed(() => {
  const selectedItem = <EditorData[]>[];
  const unSelectedItem = <EditorData[]>[];

  editorData.value.forEach((item) =>
    (item.selected ? selectedItem : unSelectedItem).push(item),
  );

  return {
    selectedItem,
    unSelectedItem,
  };
});

export { editorBoxRef, editorData, dataWithSelectedStatus };
