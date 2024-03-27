let mapParam: any = {};

/**
 * 存储地图参数
 * @param param
 */
const setMapParam = (param = {}) => {
  mapParam = param;
};

/**
 * 根据类型获取地图参数
 * @param type
 * @returns
 */
const getMapParam = (type: string) => {
  return mapParam[type] ? mapParam[type] : null;
};

export { setMapParam, getMapParam };
