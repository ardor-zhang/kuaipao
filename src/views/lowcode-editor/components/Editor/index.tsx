import { defineComponent } from 'vue';

import { clearAllSelected } from '@editor/utils/handleEditorData';
import { editorBoxRef, editorData } from '@editor/store';
import { guideLines } from './useGuidelines';
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
          {guideLines.isX && (
            <div
              style={{ top: guideLines.top + 'px' }}
              class="guide-line-x"
            ></div>
          )}
          {guideLines.isY && (
            <div
              style={{ left: guideLines.left + 'px' }}
              class="guide-line-y"
            ></div>
          )}
          {editorData.value.data.map((item) => (
            <EditorItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  },
});
