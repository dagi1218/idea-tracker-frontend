import type { InputProps as ThemeInputProps } from 'theme-ui';

export interface InputProps extends ThemeInputProps {
    error?: string;
    label?: string;
}