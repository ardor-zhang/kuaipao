import packages from '@/views/lowcode-editor/packages';

function registerPackasges() {
  const packagesList = [];
  const packagesMap = {};
  const register = (components: any) => {
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
