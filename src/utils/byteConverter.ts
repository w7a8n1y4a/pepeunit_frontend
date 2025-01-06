function byteConverter(sizeInBytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let size = sizeInBytes;

    for (const unit of units) {
        if (size < 1000) {
            return `${size.toFixed(2)} ${unit}`;
        }
        size /= 1024;
    }

    return `${size.toFixed(2)} YБ`;
}

export default byteConverter;