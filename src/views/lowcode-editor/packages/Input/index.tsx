import { Package } from '@editor/types/index';
import { Field } from 'vant';

export default {
  key: 'input',
  previewLabel: '输入框',
  preview: () => <Field placeholder="这是输入框" />,
  render: () => <Field placeholder="这是输入框" />,
} as Package;
