export default function isValidRepoUrl(value: string) {
    let errorMessage: null | string = null

    if (value.slice(-4) !== '.git' || !(value.includes('https://') || value.includes('http://'))){
        errorMessage = "URL is not correct"
    }

    return errorMessage;
};