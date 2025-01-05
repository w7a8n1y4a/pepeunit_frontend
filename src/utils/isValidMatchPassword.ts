export default function isValidMatchPassword(data: {password: string, confirmPassword: string}) {
    let errorMessage: null | string = null

    if (data.password !== data.confirmPassword){
        errorMessage = "Passwords do not match"
    }

    return errorMessage;
};