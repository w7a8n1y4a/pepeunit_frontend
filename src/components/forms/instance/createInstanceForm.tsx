import { useState } from 'react';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useCreateInstanceMutation } from '@rootTypes/compositionFunctions';
import isValidInstanceUrl from '@utils/isValidInstanceUrl';
import DefaultInput from '@primitives/defaultInput';
import Spinner from '@primitives/spinner';
import '../form.css';

import { useModalStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';

export default function CreateInstanceForm() {
    const { setHappy, setError } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setActiveModal } = useModalStore();

    const [url, setUrl] = useState('');
    const [errorState, setErrorState] = useState({
        url: true,
    });
    const [createInstance] = useCreateInstanceMutation();

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState((prevState) => ({
            ...prevState,
            [field]: hasError,
        }));
    };

    const handleCreate = () => {
        runAsync(async () => {
            const result = await createInstance({
                variables: { url: url.trim() },
            });

            if (!result.data) {
                setError(result);
                return;
            }

            setUrl('');
            setActiveModal('instancesList');
            setHappy('Instance added');
        });
    };

    return (
        <>
            {isLoaderActive && <Spinner />}
            <form>
                <DefaultInput
                    id="instance_url"
                    type="text"
                    placeholder="https://host/pepeunit/api/v1/instances/current"
                    value={url}
                    validateState={url}
                    onChange={setUrl}
                    validateFunc={isValidInstanceUrl}
                    setIsErrorExist={(hasError) => updateErrorState('url', hasError)}
                />
            </form>
            <button
                className="button_main_action"
                onClick={handleCreate}
                disabled={Object.values(errorState).some((isError) => isError)}
            >
                Add
            </button>
        </>
    );
}
