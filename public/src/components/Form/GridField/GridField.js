import {Component} from "../../../modules/Softer/Softer.js";
import {changeHandler} from "../../../utils/utils.js";

export default class GridField extends Component {
    constructor(props) {
        super(props);

        this.includeCSS({path: 'Form/GridField'});
    }

    render() {
        const {title, type, name, value, gridTemplate, dataHandler} = this.props;

        const field = document.createElement('div');
        field.className = "grid-field";
        field.style.gridTemplateColumns = gridTemplate ? gridTemplate : '';
        field.innerHTML = `
            <label>${title}</label>
            <input type="${type}" name="${name}" value="${value ? value : ''}"/>
        `;

        field.querySelectorAll('input').forEach(input => input
            .addEventListener('change', e => changeHandler(e, dataHandler))
        )
        return field;
    }
}
