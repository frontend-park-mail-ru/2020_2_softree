import {Component} from "../../../modules/Softer/Softer.js";
import {pageMain} from "../../../pages.js";

export default class MainDropDownMenu extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    render() {
        const node = this.create(`
        <div class="main-drop-down-menu">
            <div class='main-drop-down-menu__action-card' id='show-rates-action'>
                <img src='/src/images/rates.svg' alt='Котировки'>
                <p>Котировки</p>
            </div> 
            <div class='main-drop-down-menu__action-card'>
                <img src='/src/images/calc.svg' alt='Конвертер'>
                <p>Конвертер</p>
            </div> 
        </div>
        `)

        this.listen('.main-drop-down-menu__action-card', 'click', this.props.close);
        this.link('#show-rates-action', ...pageMain())
        return node;
    }
}
