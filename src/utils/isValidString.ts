export default function isValidString(value: string) {
    let errorMessage: null | string = null

    if (value === ''){
        errorMessage = "Введите значение"
    }

    return errorMessage;
};