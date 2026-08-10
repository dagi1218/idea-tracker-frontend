import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useInjectReducer,
    useInjectSaga,
} from '../../../store/utils/redux-injectors.js';
import {
    defaultLayoutReducer,
    defaultLayoutActions,
} from './slice/index.js';
import { defaultLayoutSaga } from './slice/saga.js';
import {
    selectUser,
    selectIsAuthenticated,
} from './slice/selectors.js';
import { DefaultLayoutComponent } from '../../components/DefaultLayout/index.js';
import type { ConnectedDefaultLayoutProps } from './types.js';

export const DefaultLayout: React.FC<ConnectedDefaultLayoutProps> = ({ children }) => {
    useInjectReducer({ key: 'defaultLayout', reducer: defaultLayoutReducer });
    useInjectSaga({ key: 'defaultLayout', saga: defaultLayoutSaga });

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        dispatch(defaultLayoutActions.authenticateUser());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(defaultLayoutActions.logoutRequest());
    };

    return (
        <DefaultLayoutComponent
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
        >
            {children}
        </DefaultLayoutComponent>
    );
};

export default DefaultLayout;