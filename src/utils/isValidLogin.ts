export default function isValidLogin(login: string) {
    const regex = /^[a-zA-Z0-9_.-]{4,20}$/;
    let errorMessage: null | string = null

    if (!regex.test(login)){
        errorMessage = "От 4 до 20 символов: a-z, A-Z, 0-9 и _.-"
    }

    return errorMessage;
};