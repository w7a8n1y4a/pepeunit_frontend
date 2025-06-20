import { useState } from 'react';

import { useErrorStore } from '@stores/errorStore';

export function useAsyncHandler() {
    const [isLoaderActive, setIsLoaderActive] = useState(false)

    const { setError } = useErrorStore();

    const runAsync = async <T>(asyncFunc: () => Promise<T>): Promise<T | null> => {
        setIsLoaderActive(true);
        try {
            return await asyncFunc();
        } catch (error) {
            setError(error);
            return null;
        } finally {
            setIsLoaderActive(false);
        }
    };

    return { isLoaderActive, runAsync };
}
