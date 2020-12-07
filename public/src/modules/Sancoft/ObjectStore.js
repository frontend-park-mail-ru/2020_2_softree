export default class ObjectStore {
    constructor() {
        this.store = [];
    }

    hover(x, y) {
        this.store.forEach(obj => obj.__hover(x, y));
    }

    click(x, y) {
        this.store.forEach(obj => obj.__click(x, y));
    }

    add(object) {
        this.store.push(object);
    }
}
