export const changeHandler = (e, setState) => {
    setState({[e.target.name]: e.target.value});
}

export const id = () => {
    return Math.round(Math.random() * Date.now());
}

export const checkAuth = (userData) => {
    if (userData) {
        return true;
    }
}
