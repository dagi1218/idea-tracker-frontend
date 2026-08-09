import React from 'react';
import { Box as ThemeBox, type BoxProps as ThemeBoxProps } from 'theme-ui';

export interface BoxProps extends ThemeBoxProps { }

export const Box: React.FC<BoxProps> = (props) => {
    return <ThemeBox {...props} />;
};