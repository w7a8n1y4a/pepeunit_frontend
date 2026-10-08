import Editor from '@monaco-editor/react';
import copy_img from '/images/copy.svg';
import copyToClipboard from '@utils/copyToClipboard';
import showClipboardNotification from '@utils/showClipboardNotification';
import '../form.css';

interface NotificationTextViewProps {
    text: string
}

export default function NotificationTextView({ text }: NotificationTextViewProps) {
    return (
        <div className="task_result_editor">
            <div className="task_result_toolbar">
                <button
                    className="task_result_copy"
                    onClick={(event) => {
                        copyToClipboard(text);
                        showClipboardNotification(event);
                    }}
                >
                    <img src={copy_img} width="24" height="24" alt="Copy text" />
                </button>
            </div>
            <Editor
                height="70vh"
                defaultLanguage="plaintext"
                value={text}
                theme="vs-dark"
                options={{
                    readOnly: true,
                    fontSize: 14,
                    fontFamily: 'monospace',
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
