import {Component} from "../../../modules/Softer/Softer.js";
import {changeHandler} from "../../../utils/utils.js";

export default class GridField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, type, name, value, gridTemplate, dataHandler, errors} = this.props;
        const [field,, listen] = this.create('div', `
            <label>${title}</label>
            ${errors ? `<p class="grid-field__error">${errors.join()}</p>` : ''}
            <input type="${type}" name="${name}" value="${value ? value : ''}"/>
        `);

        field.className = "grid-field";
        field.style.gridTemplateColumns = gridTemplate ? gridTemplate : '';

        listen('input', 'change', e => changeHandler(e, dataHandler));

        return field;
    }
}
