export const changeHandler = (e, setState) => {
    setState({[e.target.name]: e.target.value});
}
