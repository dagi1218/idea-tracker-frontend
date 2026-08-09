import { type ButtonProps as ThemeButtonProps } from 'theme-ui';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

export interface ButtonProps extends Omit<ThemeButtonProps, 'variant'> {
    variant?: ButtonVariant;
    fullWidth?: boolean;
    isLoading?: boolean;
}