import { Component } from '../../../../modules/Softer/Softer.js';
import { changeHandler } from '../../../../utils/utils.js';
import ErrorField from '../ErrorField.js';
import './GridField.scss';

export default class GridField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, type, name, value, required, gridTemplate, dataHandler, errors, placeholder } = this.props;
        const field = this.create(
            `
        <div class="field">
            <div class="field__grid" style="grid-template-columns: ${gridTemplate || ''}"> 
                <label style='color: ${errors ? 'red' : ''}'>${title}</label>
                <input class='field__input'
                 type='${type}'
                 ${required ? 'required' : ''}
                 name='${name}'
                 value='${ value || '' }'
                 placeholder='${placeholder || ''}'
                 />
            </div>
            ${errors ? '<ErrorField/>' : ''}
        </div>
        `,
            {
                ErrorField: [ErrorField, [errors]],
            },
        );

        this.listen('input', 'change', e => changeHandler(e, dataHandler));

        return field;
    }
}
