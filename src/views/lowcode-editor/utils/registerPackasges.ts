import packages from '@/views/lowcode-editor/packages';
import { Package } from '@editor/types/index';

function registerPackasges() {
  const packagesList: Package[] = [];
  const packagesMap: Record<string, Package> = {};
  const register = (components: Package) => {
    packagesList.push(components);
    packagesMap[components.key] = components;
  };
  return {
    packagesList,
    packagesMap,
    register,
  };
}

const { packagesList, packagesMap, register } = registerPackasges();

packages.forEach((item) => register(item));

export { packagesList, packagesMap };
