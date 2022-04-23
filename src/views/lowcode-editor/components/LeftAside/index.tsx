import { defineComponent } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

import { packagesList } from '@editor/utils/registerPackasges';
import './index.scss';

export default defineComponent({
  setup() {
    return () => (
      <ElTabs tab-position="left" class="left-aside">
        <ElTabPane label="User" class="left-aside-tap">
          {packagesList.map((item) => (
            <div key={item.key}>{item.preview()}</div>
          ))}
        </ElTabPane>
      </ElTabs>
    );
  },
});
