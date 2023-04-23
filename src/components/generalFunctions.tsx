export const typing = () => {
    const signInFormInputs = document.querySelectorAll('.login-form input');

    signInFormInputs.forEach(input => {
        const inputElement = input as HTMLInputElement;
        inputElement.style.borderColor = "#ccc";
    })
}