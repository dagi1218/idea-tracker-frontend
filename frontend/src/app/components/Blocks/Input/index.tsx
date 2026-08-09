import React from 'react';
import { Input as ThemeInput, Label, Text } from 'theme-ui';
import type { InputProps } from './types.js';
import { Box } from '../Basics/Box.js';

export const Input: React.FC<InputProps> = ({
    label,
    error,
    id,
    sx,
    ...rest
}) => {
    return (
        <Box sx={{ mb: 3, width: '100%' }}>
            {label && (
                <Label
                    htmlFor={id}
                    sx={{
                        display: 'block',
                        mb: 1,
                        fontWeight: 'bold',
                        fontSize: 1,
                        color: 'text',
                    }}
                >
                    {label}
                </Label>
            )}
            <ThemeInput
                id={id}
                sx={{
                    borderColor: error ? 'danger' : 'border',
                    '&:focus': {
                        borderColor: error ? 'danger' : 'primary',
                    },
                    ...sx,
                }}
                {...rest}
            />
            {error && (
                <Text
                    sx={{
                        color: 'danger',
                        fontSize: 0,
                        mt: 1,
                        display: 'block',
                    }}
                >
                    {error}
                </Text>
            )}
        </Box>
    );
};

export * from './types.js';