import {
  ref,
  computed,
  defineComponent,
  PropType,
  onMounted,
  toRef,
} from 'vue';
import { packagesMap } from '@editor/utils/registerPackasges';
import { EditorData } from '@editor/types';
import useItemDrag from './useItemDrag';
import { $dropdown, DropdownItem } from '@/components/Dropdown';
import {
  placeTopAction,
  placeBottomAction,
  deleteAction,
} from '@editor/components/Header/useAction';

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

    const { handleMouseDown, draging } = useItemDrag(
      toRef(props, 'item'),
      itemRef,
    );

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      $dropdown({
        el: e.target as HTMLElement,
        content: () => (
          <>
            <DropdownItem
              label="删除"
              icon="icon-delete"
              onClick={() => deleteAction()}
            />
            <DropdownItem
              label="置顶"
              icon="icon-delete"
              onClick={() => placeTopAction()}
            />
            <DropdownItem
              label="置底"
              icon="icon-delete"
              onClick={() => placeBottomAction()}
            />
          </>
        ),
      });
    };

    onMounted(() => {
      const { offsetWidth, offsetHeight } = itemRef.value!;
      //!todo 理论上这里应该单向数据的
      // 1. 从组件列表拖拽到画布上以鼠标位置定位
      if (props.item.isFirst) {
        props.item.style.left -= offsetWidth / 2;
        props.item.style.top -= offsetHeight / 2;
        props.item.isFirst = false;
      }
      //2. 渲染后添加宽度和高度
      props.item.style.width = offsetWidth;
      props.item.style.height = offsetHeight;
    });

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
        onContextmenu={(e) => handleContextMenu(e)}
      >
        {packagesMap[props.item.key].render()}
      </div>
    );
  },
});
