import { Component } from '../../../modules/Softer/Softer';
import './ActionButton.scss';
import Styler from '../../../modules/Styler';

const pushedStyle = Styler({
    boxShadow: `inset 0 0 10px rgba(0, 0, 0, 0.2)`,
    background: 'rgba(0, 0, 0, 0.01)',
});

export default class ActionButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { content, isPushed, clb } = this.props;

        const element = this.create(`
      <div class="action-btn" style="${isPushed() && pushedStyle}">${content}</div>   
    `);

        this.listen('.action-btn', 'click', clb);

        return element;
    }
}
