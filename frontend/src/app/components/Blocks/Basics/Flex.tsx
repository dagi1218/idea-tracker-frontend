import React from 'react';
import { Flex as ThemeFlex, type FlexProps as ThemeFlexProps } from 'theme-ui';

export interface FlexProps extends ThemeFlexProps { }

export const Flex: React.FC<FlexProps> = (props) => {
    return <ThemeFlex {...props} />;
};