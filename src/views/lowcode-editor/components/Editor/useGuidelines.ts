import { reactive } from 'vue';
import {
  editorBoxRef,
  currentSelectedItemRef,
  dataWithSelectedStatus,
} from '@editor/store';

interface GuideLine {
  // showLeft: 辅助线展示的位置 : dLeft被拖拽的元素要拖到哪个位置才能出现辅助线
  y: { showLeft: number; dLeft: number }[];
  x: { showTop: number; dTop: number }[];
  isX: boolean;
  isY: boolean;
  left: number;
  top: number;
}

const AUTO_DIS = 2;

const guideLines = reactive<GuideLine>({
  x: [],
  y: [],
  isX: false,
  isY: false,
  left: 0,
  top: 0,
});

// 生成所有出现辅助线的数据
const generateGuideLineDistance = () => {
  guideLines.x = [];
  guideLines.y = [];
  const { offsetHeight, offsetWidth } = currentSelectedItemRef.value!;
  [
    {
      style: {
        left: 0,
        top: 0,
        width: editorBoxRef.value?.clientWidth,
        height: editorBoxRef.value?.clientHeight,
      },
    },
    ...dataWithSelectedStatus.value.unSelectedItem,
  ].forEach(({ style }) => {
    const { left, top, width, height } = style;
    guideLines.y.push({
      showLeft: left,
      dLeft: left - offsetWidth,
    }); // 左 + 右 辅助线
    guideLines.y.push({ showLeft: left, dLeft: left }); // 左 + 左 辅助线
    guideLines.y.push({
      showLeft: left + width! / 2,
      dLeft: left + width! / 2 - offsetWidth / 2,
    }); // 中 + 中 辅助线
    guideLines.y.push({
      showLeft: left + width!,
      dLeft: left + width! - offsetWidth,
    }); // 右 + 右 辅助线
    guideLines.y.push({
      showLeft: left + width!,
      dLeft: left + width!,
    }); // 右 + 左 辅助线

    guideLines.x.push({
      showTop: top,
      dTop: top - offsetHeight,
    }); // 顶 + 底 辅助线
    guideLines.x.push({ showTop: top, dTop: top }); // 顶 + 顶 辅助线
    guideLines.x.push({
      showTop: top + height! / 2,
      dTop: top + height! / 2 - offsetHeight / 2,
    }); // 中 + 中 辅助线
    guideLines.x.push({
      showTop: top + height!,
      dTop: top + height! - offsetHeight,
    }); // 底 + 底 辅助线
    guideLines.x.push({
      showTop: top + height!,
      dTop: top + height!,
    }); // 底 + 顶 辅助线
  });
};

const automaticApproach = ({
  moveX,
  moveY,
}: {
  moveX: number;
  moveY: number;
}) => {
  const auto = { x: 0, y: 0 };

  guideLines.isX = false;
  guideLines.isY = false;
  const { offsetLeft, offsetTop } = currentSelectedItemRef.value!;
  const len = guideLines.y.length;
  for (let index = 0; index < len; index++) {
    const lineY = guideLines.y[index];
    const dL = lineY.dLeft - offsetLeft + moveX;

    if (Math.abs(dL) < AUTO_DIS) {
      guideLines.isY = true;
      guideLines.left = lineY.showLeft;
      auto.x = dL;
      break;
    }
  }
  for (let index = 0; index < len; index++) {
    const lineX = guideLines.x[index];
    const dT = lineX.dTop - offsetTop + moveY;

    if (Math.abs(dT) < AUTO_DIS) {
      guideLines.isX = true;
      guideLines.top = lineX.showTop;
      auto.y = dT;
      break;
    }
  }

  return auto;
};

export { guideLines, generateGuideLineDistance, automaticApproach };
