export default function isValidPassword(password: string) {
    const regex = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]{8,100}$/;
    return regex.test(password);
};