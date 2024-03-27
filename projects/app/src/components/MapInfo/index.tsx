/*
 * @Autor: luowy
 * @Date: 2024-03-18 20:08:50
 * @LastEditors: luowy
 * @LastEditTime: 2024-03-27 14:13:59
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import { IResultData, DataType, actionMap } from '@/web/common/utils/map';
import { EventNameEnum, eventBus } from '@/web/common/utils/eventbus';

export default function MapInfo(props: any) {
  const [data, setData] = useState({ resultText: '' });
  eventBus.on(EventNameEnum.mapResult, (obj: IResultData) => {
    eventBus.off(EventNameEnum.mapResult);
    handleResult(obj);
    setData(data);
  });
  /**
   * 处理返回的结果
   */
  const handleResult = (obj: IResultData) => {
    switch (obj.dataType) {
      case DataType.array:
        data.resultText = `已查询到${obj.data}个`;
        break;
      case DataType.string:
        data.resultText = DataType.string;
        break;
      default:
        data.resultText = `已完成地图操作!`;
        break;
    }
  };

  actionMap(props.params as string);
  return <span>{data.resultText}</span>;
}
