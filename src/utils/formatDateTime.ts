export function parseUtcDate(datetimeString: string): Date {
    const trimmed = datetimeString.trim();
    if (/[zZ]$/.test(trimmed) || /[+-]\d{2}:?\d{2}$/.test(trimmed)) {
        return new Date(trimmed);
    }
    return new Date(`${trimmed}Z`);
}

export default function formatDateTime(
    datetimeString: string | null | undefined,
    withSeconds = false,
    compact = false,
): string {
    if (!datetimeString) return '—';

    try {
        const date = parseUtcDate(datetimeString);
        if (Number.isNaN(date.getTime())) return datetimeString;

        if (compact) {
            return date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(/,/, '');
        }

        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: withSeconds ? '2-digit' : undefined,
            hour12: false,
        }).replace(/,/, '');
    } catch {
        return datetimeString;
    }
}
