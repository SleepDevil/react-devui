import React, { useMemo } from 'react';

import { usePrefixConfig, useComponentConfig } from '../../hooks';
import { getClassName } from '../../utils';

export interface DComposeProps extends React.HTMLAttributes<HTMLDivElement> {
  dType?: DButtonProps['dType'];
  dColor?: DButtonProps['dColor'];
  dSize?: DButtonProps['dSize'];
  dDisabled?: boolean;
}

export function DCompose(props: DComposeProps) {
  const {
    dType = 'secondary',
    dColor = 'primary',
    dDisabled = false,
    dSize,
    className,
    children,
    ...restProps
  } = useComponentConfig(DCompose.name, props);

  //#region Context
  const dPrefix = usePrefixConfig();
  //#endregion

  const contextValue = useMemo<DComposeContextData>(
    () => ({
      buttonGroupType: dType,
      buttonGroupColor: dColor,
      buttonGroupSize: dSize,
      buttonGroupDisabled: dDisabled,
    }),
    [dType, dColor, dSize, dDisabled]
  );

  return (
    <DComposeContext.Provider value={contextValue}>
      <div {...restProps} className={getClassName(className, `${dPrefix}button-group`)}>
        {children}
      </div>
    </DComposeContext.Provider>
  );
}
