const copyToClipboard = async (text: string) => {
    // BUG: without domain or https - not copied data to Clipboard
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('Failed to copy text:', error);
    }
};

export default copyToClipboard