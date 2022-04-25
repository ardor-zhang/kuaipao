import { editorData } from '@editor/store';

export const clearAllSelected = () => {
  editorData.value.data.forEach((item) => (item.selected = false));
};
