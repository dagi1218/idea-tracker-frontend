import React from 'react';
import { Box } from './Basics/Box.js';
import type { ThemeUIStyleObject } from 'theme-ui';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    sx?: ThemeUIStyleObject;
    size?: number | string;
}

const createIcon = (path: React.ReactNode, viewBox = '0 0 24 24') => {
    const IconComponent: React.FC<IconProps> = ({ size = '1em', sx, ...props }) => {
        return (
            <Box
                as="svg"
                viewBox={viewBox}
                fill="currentColor"
                width={size}
                height={size}
                sx={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    flexShrink: 0,
                    width: '1em',
                    height: '1em',
                    ...sx,
                }}
                {...(props as any)}
            >
                {path}
            </Box>
        );
    };
    return IconComponent;
};

export const Icons = {
    Idea: createIcon(
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-1.3l-.85-.6C7.8 13.16 7 11.42 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-.8 4.16-2.15 5.1z" />
    ),
    User: createIcon(
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    ),
    Admin: createIcon(
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    ),
    Logout: createIcon(
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    ),
    Add: createIcon(
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    ),
    Delete: createIcon(
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    ),
    Edit: createIcon(
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    ),
};
