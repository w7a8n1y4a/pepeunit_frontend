import { useState } from 'react';

export function useAsyncHandler(handleError: (error: any) => void) {
    const [isLoaderActive, setIsLoaderActive] = useState(false)

    const runAsync = async <T>(asyncFunc: () => Promise<T>): Promise<T | null> => {
        setIsLoaderActive(true);
        try {
            return await asyncFunc();
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setIsLoaderActive(false);
        }
    };

    return { isLoaderActive, runAsync };
}
