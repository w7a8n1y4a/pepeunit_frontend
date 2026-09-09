export default function isValidInstanceUrl(value: string) {
    let errorMessage: null | string = null;
    const url = value.trim();

    if (!url) {
        errorMessage = 'Enter a /current instance URL';
        return errorMessage;
    }

    try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            errorMessage = 'URL scheme must be http or https';
        } else if (parsed.search || parsed.hash) {
            errorMessage = 'URL must not include query or fragment';
        } else if (parsed.username || parsed.password) {
            errorMessage = 'URL must not include credentials';
        } else if (!parsed.pathname.replace(/\/+$/, '').endsWith('/instances/current')) {
            errorMessage = 'URL must end with /instances/current';
        }
    } catch {
        errorMessage = 'URL is not correct';
    }

    return errorMessage;
}
