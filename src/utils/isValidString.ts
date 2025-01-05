export default function isValidString(value: string) {
    let errorMessage: null | string = null

    if (value === ''){
        errorMessage = "Enter a value"
    }

    return errorMessage;
};