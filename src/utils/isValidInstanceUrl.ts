export default function isValidInstanceUrl(value: string) {
    const url = value.trim();

    if (!url) {
        return 'Enter a /current instance URL';
    }

    if (/\s/.test(url) || url.includes(',') || url.includes(';')) {
        return 'Enter exactly one instance URL';
    }

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        return 'URL must start with http:// or https://';
    }

    if (!url.replace(/\/+$/, '').endsWith('/instances/current')) {
        return 'URL must end with /instances/current';
    }

    try {
        new URL(url);
    } catch {
        return 'URL is not correct';
    }

    return null;
}
