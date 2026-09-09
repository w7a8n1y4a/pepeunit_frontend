export default function formatJsonOrText(
    value: string | null | undefined,
    fallback = 'No Data',
): string {
    if (value == null || value === '') {
        return fallback;
    }

    try {
        return JSON.stringify(JSON.parse(value), null, 4);
    } catch {
        return value;
    }
}
