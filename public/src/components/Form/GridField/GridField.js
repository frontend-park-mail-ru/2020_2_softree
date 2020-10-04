import {Component} from "../../../modules/Softer/Softer.js";
import {changeHandler} from "../../../utils/utils.js";

export default class GridField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, type, name, value, gridTemplate, dataHandler, errors} = this.props;
        const [field,, listen] = this.create('div', `
            <div class="grid-field" style="grid-template-columns: ${gridTemplate ? gridTemplate : ''}"> 
                <label style="color: ${errors ? 'red' : ''}">${title}</label>
                <input type="${type}" name="${name}" value="${value ? value : ''}"/>
            </div>
            ${errors ? `<p class="grid-field__error">${errors.join()}</p>` : ''}
        `);

        field.className = "field";

        listen('input', 'change', e => changeHandler(e, dataHandler));

        return field;
    }
}
