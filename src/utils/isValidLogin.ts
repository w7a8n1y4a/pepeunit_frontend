export default function isValidLogin(login: string) {
    const regex = /^[a-zA-Z0-9_.-]{4,20}$/;
    return regex.test(login);
};