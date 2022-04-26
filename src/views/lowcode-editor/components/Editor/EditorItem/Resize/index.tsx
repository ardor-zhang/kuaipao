import { defineComponent, PropType, toRef } from 'vue';
import { EditorData } from '@editor/types';
import useResize from './useResize';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<EditorData>,
      required: true,
    },
  },
  setup(props) {
    const { handleResizeMouseDown } = useResize(toRef(props, 'item'));

    return () => (
      <>
        <div
          class="resize-dot resize-dot-nw"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'left',
              vertical: 'top',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-n"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'center',
              vertical: 'top',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-ne"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'right',
              vertical: 'top',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-e"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'right',
              vertical: 'center',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-se"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'right',
              vertical: 'bottom',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-s"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'center',
              vertical: 'bottom',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-sw"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'center',
              vertical: 'bottom',
            })
          }
        ></div>
        <div
          class="resize-dot resize-dot-w"
          onMousedown={(e) =>
            handleResizeMouseDown(e, {
              horizontal: 'left',
              vertical: 'center',
            })
          }
        ></div>
      </>
    );
  },
});
