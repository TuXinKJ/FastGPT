/*
 * @Autor: luowy
 * @Date: 2024-03-20 16:27:38
 * @LastEditors: luowy
 * @LastEditTime: 2024-03-27 14:10:47
 * @Description:
 */
import { EventNameEnum, eventBus } from '@/web/common/utils/eventbus';
enum ActionType {
  // 显示
  show = 'show',
  // 打开
  open = 'open',
  // 查询
  search = 'search',
  // 导出
  export = 'export',
  // 缩放
  zoom = 'zoom',
  // 平移
  move = 'move',
  // 定位
  location = 'location',
  // 关闭
  close = 'close'
}

export enum DataType {
  // 数组
  array = 'array',
  // 字符串
  string = 'string',
  // 结束当前对话，返回true
  bool = 'bool',
  // 对象，一般做为传入流程参数
  object = 'object'
}

export interface IResultData {
  action: ActionType; // 操作类型
  dataType: DataType; // 结果类型， array, bool
  data: any;
}

let currMapParam: any = null;

export const initMapPostMessage = () => {
  window.addEventListener('message', (e: any) => {
    const { origin, data } = e;
    if (data.type !== 'mapAi') return;
    setAction(data.data);
  });
};

const setAction = (data: any) => {
  currMapParam = data;
  eventBus.emit(EventNameEnum.mapResult, data);
  console.log(data);
};

/**
 * 获取当前地图的参数
 * @returns
 */
export const getMapParam = (): any => {
  return currMapParam;
};
/**
 * 类型转换，把语言类的类型标准化为统一的类型
 * @param data
 */
export const getChangeType = (action: string) => {
  let newAction = '';
  switch (action) {
    case '加载':
    case '打开':
      newAction = ActionType.open;
      break;
    case '查询':
    case '检索':
      newAction = ActionType.search;
      break;
    case '导出':
      newAction = ActionType.export;
      break;
    case '放大':
    case '缩小':
    case '缩放':
      newAction = ActionType.zoom;
      break;
    case '平移':
      newAction = ActionType.move;
      break;
    case '定位':
      newAction = ActionType.location;
      break;
    case '关闭':
      newAction = ActionType.close;
      break;
    default:
      break;
  }
  return newAction;
};

/**
 * 参数解析
 * @returns
 */
export const handleParam = (param: string) => {
  const srtParam = (param as string).replaceAll('\n', '');
  const newParam: any = JSON.parse(srtParam);
  return newParam;
};

export const actionMap = (param: string) => {
  const obj = handleParam(param);
  setPostMessage(obj);
};

const setPostMessage = (param: any) => {
  const iframeWindow = window.parent;
  const action = getChangeType(param.action);
  if (action && iframeWindow) {
    param.action = action;
    iframeWindow.postMessage(param, '*');
  }
};
