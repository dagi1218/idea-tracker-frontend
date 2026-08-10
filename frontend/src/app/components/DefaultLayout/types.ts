import React from 'react';

import type { User } from '../../layouts/DefaultLayout/slice/types.js';

export interface DefaultLayoutProps {
    children?: React.ReactNode;
    user?: User | null;
    isAuthenticated?: boolean;
    onLogout?: () => void;
}