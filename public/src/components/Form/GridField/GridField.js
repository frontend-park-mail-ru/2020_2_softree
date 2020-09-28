import {Component} from "../../../modules/Softer/Softer.js";

export default class GridField extends Component {
    constructor(props) {
        super(props);

        this.includeCSS('gridfield', 'Form/GridField/GridField.css');
    }

    render() {
        const {title, type, name, value, gridTemplate} = this.props;

        const field = document.createElement('div');
        field.className = "grid-field";
        field.style.gridTemplateColumns = gridTemplate ? gridTemplate : '';
        field.innerHTML = `
            <label>${title}</label>
            <input type="${type}" name="${name}" value="${value ? value : ''}"/>
        `;
        return field;
    }
}
