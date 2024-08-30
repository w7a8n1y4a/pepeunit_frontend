export default function isValidPassword(password: string) {
    const regex = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]{8,100}$/;
    let errorMessage: null | string = null

    if (!regex.test(password)){
        errorMessage = "От 8 до 100 символов: a-z, A-Z, 0-9 и !\"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~"
    }

    return errorMessage;
};