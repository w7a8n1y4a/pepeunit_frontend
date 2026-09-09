import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import copy_img from '/images/copy.svg'
import copyToClipboard from '@utils/copyToClipboard'
import showClipboardNotification from '@utils/showClipboardNotification'
import Spinner from '@primitives/spinner';
import { useGetOperationTaskLazyQuery } from '@rootTypes/compositionFunctions';
import '../form.css';

interface TaskResultEditorProps {
    taskUuid: string | null
    fallbackResult?: string | null
}

export default function TaskResultEditor({ taskUuid, fallbackResult }: TaskResultEditorProps) {
    const [getOperationTask] = useGetOperationTaskLazyQuery();
    const [result, setResult] = useState(fallbackResult ?? '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!taskUuid) {
            setResult(fallbackResult ?? '');
            return;
        }

        let cancelled = false;
        setLoading(true);

        getOperationTask({ variables: { uuid: taskUuid } }).then((response) => {
            if (cancelled) return;
            setResult(response.data?.getOperationTask?.result || fallbackResult || '');
            setLoading(false);
        }).catch(() => {
            if (cancelled) return;
            setResult(fallbackResult || '');
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [taskUuid, fallbackResult, getOperationTask]);

    if (loading && !result) return <Spinner />;

    const output = result || 'No output yet';

    return (
        <div className="task_result_editor">
            <div className="task_result_toolbar">
                <button
                    className="task_result_copy"
                    onClick={(event) => {
                        copyToClipboard(output);
                        showClipboardNotification(event);
                    }}
                >
                    <img src={copy_img} width="24" height="24" alt="Copy result"/>
                </button>
            </div>
            <Editor
                height="70vh"
                defaultLanguage="plaintext"
                value={output}
                theme="vs-dark"
                options={{
                    readOnly: true,
                    fontSize: 14,
                    fontFamily: 'Consolas, monospace',
                    lineHeight: 20,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    folding: true,
                    renderWhitespace: 'selection',
                    domReadOnly: true,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
