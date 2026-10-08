export function getNotificationStreamUri(): string {
    const backendUri = import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI || '';
    return backendUri.replace(/\/graphql\/?$/, '/api/v1/notifications/stream');
}

function delay(ms: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve) => {
        if (signal.aborted) {
            resolve();
            return;
        }

        const timeoutId = window.setTimeout(resolve, ms);
        signal.addEventListener('abort', () => {
            window.clearTimeout(timeoutId);
            resolve();
        }, { once: true });
    });
}

async function readNotificationEvents(
    url: string,
    token: string,
    signal: AbortSignal,
    onEvent: () => void,
): Promise<'stop' | 'retry'> {
    const response = await fetch(url, {
        headers: {
            'x-auth-token': token,
            Accept: 'text/event-stream',
        },
        signal,
    });

    if (response.status >= 400 && response.status < 500) {
        await response.body?.cancel().catch(() => undefined);
        return 'stop';
    }

    if (!response.ok || !response.body) {
        return 'retry';
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
        while (!signal.aborted) {
            const { done, value } = await reader.read();
            if (done) return 'retry';

            buffer += decoder.decode(value, { stream: true });
            const frames = buffer.split('\n\n');
            buffer = frames.pop() ?? '';

            for (const frame of frames) {
                const hasData = frame.split('\n').some((line) => line.startsWith('data:'));
                if (hasData) onEvent();
            }
        }
    } finally {
        await reader.cancel().catch(() => undefined);
    }

    return 'stop';
}

export async function followNotificationStream(
    token: string,
    signal: AbortSignal,
    onEvent: () => void,
): Promise<void> {
    const url = getNotificationStreamUri();
    if (!url) return;

    while (!signal.aborted) {
        try {
            const next = await readNotificationEvents(url, token, signal, onEvent);
            if (next === 'stop' || signal.aborted) return;
        } catch (error) {
            if (signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
                return;
            }
        }

        await delay(3000, signal);
    }
}
