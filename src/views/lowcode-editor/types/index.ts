export interface Package {
  key: string;
  previewLabel: string;
  preview: () => any;
  render: () => any;
}

export interface EditorData {
  id: string;
  key: string;
  isFirst: boolean; // 首次拖动时需要对元素位置做特殊处理，否则放到幕布上时是以左上角定位的而不是鼠标位置
  selected: boolean; // 是否被选中
  style: {
    width?: string;
    height?: string;
    top: number;
    left: number;
    zIndex?: number;
  };
}
