import { defineComponent } from 'vue';

import { clearAllSelected } from '@editor/utils/handleEditorData';
import { editorBoxRef, editorData } from '@editor/store';
import EditorItem from './EditorItem';

import './index.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class="editor-container bg-gray-100 ">
        <div
          class="editor-box bg-white"
          ref={editorBoxRef}
          onMousedown={clearAllSelected}
        >
          {editorData.value.map((item) => (
            <EditorItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  },
});
