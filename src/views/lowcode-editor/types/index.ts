export interface RenderProps {
  style: {
    width?: number;
    height?: number;
  };
}

export interface Package {
  key: string;
  previewLabel: string;
  preview: () => void;
  render: (renderProps: RenderProps) => void;
}

export interface EditorData {
  id: string;
  key: string;
  isFirst: boolean; // 首次拖动时需要对元素位置做特殊处理，否则放到幕布上时是以左上角定位的而不是鼠标位置
  selected: boolean; // 是否被选中
  // guideLine?: {
  //   top: 'top' | 'middle' | 'bottom';
  //   left: 'left' | 'middle' | 'right';
  // };
  position: {
    top: number;
    left: number;
    zIndex: number;
  };
  style: {
    width?: number;
    height?: number;
  };
  class?: string[];
}

export interface ResizeDirection {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'center' | 'bottom';
}
