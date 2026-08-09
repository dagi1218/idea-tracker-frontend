import React from 'react';
import { Button as ThemeButton } from 'theme-ui';
import type { ButtonProps } from './types.js';

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    isLoading = false,
    disabled,
    sx,
    ...rest
}) => {
    return (
        <ThemeButton
            variant={variant}
            disabled={disabled || isLoading}
            sx={{
                width: fullWidth ? '100%' : 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none',
                border: 'none',
                cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
                ...sx,
            }}
            {...rest}
        >
            {isLoading ? 'Loading...' : children}
        </ThemeButton>
    );
};

export * from './types.js';
export * from './variants.js';