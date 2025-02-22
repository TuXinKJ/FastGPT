import React, { useMemo } from 'react';
import { NodeProps } from 'reactflow';
import NodeCard from '../render/NodeCard';
import { FlowModuleItemType } from '@fastgpt/global/core/module/type.d';
import Divider from '../modules/Divider';
import Container from '../modules/Container';
import RenderInput from '../render/RenderInput';
import RenderOutput from '../render/RenderOutput';
import RenderToolInput from '../render/RenderToolInput';
import { useTranslation } from 'next-i18next';
import { useFlowProviderStore } from '../../FlowProvider';

const NodeSimple = ({ data, selected }: NodeProps<FlowModuleItemType>) => {
  const { t } = useTranslation();
  const { splitToolInputs } = useFlowProviderStore();
  const { moduleId, inputs, outputs } = data;
  const { toolInputs, commonInputs } = splitToolInputs(inputs, moduleId);

  const filterHiddenInputs = useMemo(
    () => commonInputs.filter((item) => item.type !== 'hidden'),
    [commonInputs]
  );

  return (
    <NodeCard minW={'350px'} selected={selected} {...data}>
      {toolInputs.length > 0 && (
        <>
          <Divider text={t('core.module.tool.Tool input')} />
          <Container>
            <RenderToolInput moduleId={moduleId} inputs={toolInputs} />
          </Container>
        </>
      )}
      {filterHiddenInputs.length > 0 && (
        <>
          <Divider text={t('common.Input')} />
          <Container>
            <RenderInput moduleId={moduleId} flowInputList={commonInputs} />
          </Container>
        </>
      )}
      {outputs.length > 0 && (
        <>
          <Divider text={t('common.Output')} />
          <Container>
            <RenderOutput moduleId={moduleId} flowOutputList={outputs} />
          </Container>
        </>
      )}
    </NodeCard>
  );
};
export default React.memo(NodeSimple);
