import { defineComponent } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

import { packagesList } from '@editor/utils/registerPackasges';
import useDragPackage from './useDragPackage';
import './index.scss';

export default defineComponent({
  setup() {
    const { dragStart, dragEnd } = useDragPackage();

    return () => (
      <ElTabs tab-position="left" class="left-aside">
        <ElTabPane label="Components" class="left-aside-tap">
          {packagesList.map((item) => (
            <div
              class="preview-container"
              key={item.key}
              draggable
              onDragstart={() => dragStart(item)}
              onDragend={() => dragEnd()}
            >
              <span class="label">{item.previewLabel}</span>
              {item.preview()}
            </div>
          ))}
        </ElTabPane>
      </ElTabs>
    );
  },
});
