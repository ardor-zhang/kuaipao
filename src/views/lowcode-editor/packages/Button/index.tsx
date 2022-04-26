import { Package } from '@editor/types/index';
import { Button } from 'vant';

export default {
  key: 'button',
  previewLabel: '按钮',
  preview: () => <Button>按钮</Button>,
  render: ({ style }) => <Button style={style}>按钮</Button>,
} as Package;
