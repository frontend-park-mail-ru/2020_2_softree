export const changeHandler = (e, setState) => {
    setState({ [e.target.name]: e.target.value });
};

export const id = () => {
    return Math.round(Math.random() * Date.now());
};

export function checkAuth (userData) {
    if (userData) {
        return true;
    }
}

export function setUploadedImage (event, imgHandler) {
    const input = event.target;
    if (input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imgHandler(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
