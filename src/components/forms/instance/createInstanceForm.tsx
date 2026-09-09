import { useState } from 'react';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useCreateInstanceMutation } from '@rootTypes/compositionFunctions';
import isValidInstanceUrl from '@utils/isValidInstanceUrl';
import Spinner from '@primitives/spinner';
import '../form.css';

import { useModalStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';

function parseInstanceUrls(raw: string): string[] {
    return raw
        .split(/[\n,;\s]+/)
        .map((url) => url.trim())
        .filter(Boolean);
}

export default function CreateInstanceForm() {
    const { setHappy, setError } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setActiveModal } = useModalStore();

    const [urlsText, setUrlsText] = useState('');
    const [createInstance] = useCreateInstanceMutation();

    const parsedUrls = parseInstanceUrls(urlsText);
    const invalidUrl = parsedUrls.find((url) => isValidInstanceUrl(url));
    const canSubmit = parsedUrls.length > 0 && !invalidUrl;

    const handleCreate = () => {
        runAsync(async () => {
            let created = 0;

            for (const url of parsedUrls) {
                const result = await createInstance({
                    variables: { url }
                });

                if (!result.data) {
                    setError(result);
                    return;
                }

                created += 1;
            }

            setUrlsText('');
            setActiveModal('instancesList');
            setHappy(created === 1 ? 'Instance added' : `Created ${created} instances`);
        });
    };

    return (
        <>
            {isLoaderActive && <Spinner />}
            <div className="modal_menu_content">
                <div className="about_section_title">Paste /current links</div>
                <textarea
                    className="instance_urls_input"
                    placeholder="https://host/pepeunit/api/v1/instances/current"
                    value={urlsText}
                    onChange={(event) => setUrlsText(event.target.value)}
                />
                {invalidUrl && (
                    <div className="div_unit_error_message">
                        {isValidInstanceUrl(invalidUrl)}
                    </div>
                )}
                <button
                    className="button_main_action"
                    onClick={handleCreate}
                    disabled={!canSubmit}
                >
                    Add
                </button>
            </div>
        </>
    );
}
