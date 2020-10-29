import { Component } from '../../../modules/Softer/Softer.js';
import { changeHandler } from '../../../utils/utils.js';
import ErrorField from '../ErrorField.js';

export default class GridField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, type, name, value, required, gridTemplate, dataHandler, errors } = this.props;
        const field = this.create( `
        <div class="field">
            <div class='grid-field' style='grid-template-columns: ${gridTemplate || ''}'> 
                <label style='color: ${errors ? 'red' : ''}'>${title}</label>
                <input type='${type}' ${required ? 'required' : ''} name='${name}' value='${value || ''}'/>
            </div>
            ${errors ? '<ErrorField/>' : ''}
        </div>
        `, {
            ErrorField: [ErrorField, [errors]]
        });

        this.listen('input', 'change', e => changeHandler(e, dataHandler));

        return field;
    }
}
