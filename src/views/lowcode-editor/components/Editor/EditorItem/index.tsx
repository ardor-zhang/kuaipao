import { ref, computed, defineComponent, PropType, onMounted } from 'vue';
import { packagesMap } from '@editor/utils/registerPackasges';
import { EditorData } from '@editor/types';
import useItemDrag from './useItemDrag';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<EditorData>,
      required: true,
    },
  },
  setup(props) {
    const itemStyle = computed(() => ({
      ...props.item.style,
      top: props.item.style.top + 'px',
      left: props.item.style.left + 'px',
    }));

    const itemRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      const { offsetWidth, offsetHeight } = itemRef.value!;
      //!todo 理论上这里应该单向数据的
      if (props.item.isFirst) {
        // 首次
        props.item.style.left -= offsetWidth / 2;
        props.item.style.top -= offsetHeight / 2;
        props.item.isFirst = false;
      }
    });
    const { handleMouseDown, draging } = useItemDrag(props.item, itemRef);

    return () => (
      <div
        class={{
          'package-item': true,
          selected: props.item.selected,
          draging: draging.value,
        }}
        ref={itemRef}
        style={itemStyle.value}
        onMousedown={(e) => handleMouseDown(e)}
      >
        {packagesMap[props.item.key].render()}
      </div>
    );
  },
});
