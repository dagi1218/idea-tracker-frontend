import React, { lazy, Suspense } from 'react';
import { Box, Flex } from '../app/components/Blocks/index.js';

interface Opts {
    fallback?: React.ReactNode;
}

export const lazyLoad = <
    T extends { [key: string]: any },
    U extends React.ComponentType<any> = React.ComponentType<any>
>(
    importFunc: () => Promise<T>,
    selectorFunc?: (s: T) => U,
    opts: Opts = {}
) => {
    let lazyFactory: () => Promise<{ default: React.ComponentType<any> }> = importFunc as any;

    if (selectorFunc) {
        lazyFactory = () =>
            importFunc().then((module) => ({ default: selectorFunc(module) }));
    }

    const LazyComponent = lazy(lazyFactory);

    return (props: React.ComponentProps<any>) => (
        <Suspense
            fallback={
                opts.fallback || (
                    <Flex
                        sx={{
                            height: '100vh',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ fontSize: 3, fontWeight: 'bold', color: 'primary' }}>
                            Loading...
                        </Box>
                    </Flex>
                )
            }
        >
            <LazyComponent {...props} />
        </Suspense>
    );
};