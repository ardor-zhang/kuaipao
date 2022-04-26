import {
  provide,
  inject,
  computed,
  createVNode,
  defineComponent,
  render,
  reactive,
  onMounted,
  ref,
  onBeforeUnmount,
  VNode,
} from 'vue';

import './index.scss';

export const DropdownItem = defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const handleHide = inject<() => void>('handleHide');
    return () => (
      <div class="dropdown-item" onClick={() => handleHide && handleHide()}>
        {/* <i class={icon}></i> */}
        <span>{props.label}</span>
      </div>
    );
  },
});
const DropdownComponent = defineComponent({
  props: {
    option: {
      type: Object,
      required: true,
    },
  },

  setup(props, { expose }) {
    const state = reactive({
      option: props.option,
      isShow: false,
      top: 0,
      left: 0,
    });

    expose({
      showDropdown(option: { el: HTMLElement; content: () => void }) {
        state.option = option;
        state.isShow = true;
        const { top, left, height } = option.el.getBoundingClientRect();
        state.top = top + height;
        state.left = left;
      },
    });

    provide('handleHide', () => (state.isShow = false));
    const classes = computed(() => [
      'dropdown',
      {
        'dropdown-isShow': state.isShow,
      },
    ]);
    const styles = computed(() => ({
      top: state.top + 'px',
      left: state.left + 'px',
    }));
    const el = ref<HTMLElement | null>(null);
    const onMousedownDocument = (e: MouseEvent) => {
      if (!el.value?.contains(e.target as Node)) {
        state.isShow = false;
      }
    };
    onMounted(() => {
      document.body.addEventListener('mousedown', onMousedownDocument, true);
    });

    onBeforeUnmount(() => {
      document.body.removeEventListener('mousedown', onMousedownDocument);
    });
    return () => {
      return (
        <div class={classes.value} style={styles.value} ref={el}>
          {state.option!.content()}
        </div>
      );
    };
  },
});

let vm: VNode | null = null;
export function $dropdown(option: { el: HTMLElement; content: () => void }) {
  if (!vm) {
    const el = document.createElement('div');
    vm = createVNode(DropdownComponent, { option });

    document.body.appendChild((render(vm, el), el));
  }
  const { showDropdown } = vm.component!.exposed!;
  showDropdown(option);
}
