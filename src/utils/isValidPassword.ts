export default function isValidPassword(password: string) {
    const regex = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]{8,100}$/;
    let errorMessage: null | string = null

    if (!regex.test(password)){
        errorMessage = "From 8 to 100 characters: a-z, A-Z, 0-9 and !\"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~"
    }

    return errorMessage;
};