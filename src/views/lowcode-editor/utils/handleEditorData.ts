import { editorData } from '@editor/store';

export const clearAllSelected = () => {
  editorData.value.forEach((item) => (item.selected = false));
};
