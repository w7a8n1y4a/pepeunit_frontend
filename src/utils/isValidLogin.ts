export default function isValidLogin(login: string) {
    const regex = /^[a-zA-Z0-9_.-]{4,20}$/;
    let errorMessage: null | string = null

    if (!regex.test(login)){
        errorMessage = "From 4 to 20 characters: a-z, A-Z, 0-9 and _.-"
    }

    return errorMessage;
};