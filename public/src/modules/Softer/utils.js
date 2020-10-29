
export const id = () => {
    return Math.round(Math.random() * Date.now());
};

export const overallBy = (path, nextPath) => {
    const minLen = Math.min(path.length, nextPath.length);
    for (let i = 0; i < minLen; i++) {
            if (path[i] !== nextPath[i]) {
                return i;
            }
    }
    return minLen;
}

export const overallPath = (path, nextPath) => {
    const overallIdx = overallBy(path, nextPath);
    let result = path.slice(0, overallIdx);
    if (result[result.length - 1] === '/') {
        result = result.slice(result.length - 1, 1);
    }
    return result;
}

const attributeToJsProp = attribute => {
    switch (attribute) {
        case 'class':
            return 'className';
        default:
            return attribute;
    }
}

export const createElement = (string) => {
    const regexHTML = /<([\w]+)\s*(.*?)>(.*)<\/.*>/sg;
    const oneTag = /<([\w]+)\s*(.*?)\/>/;
    const closedTag = /<([A-Z]\w+)\/>/sg;
    const regexpAttributes = /(\w+)=['"](.*?)['"]/g;


    let result = regexHTML.exec(string);

    if (result) {
        const mainTag = result[1];
        const attributes = result[2];
        const content = result[3];
        const element = document.createElement(mainTag);
        element.innerHTML = content.replaceAll(closedTag, '<$1></$1>');
        if (attributes) {
            const attributesResult = [...attributes.matchAll(regexpAttributes)];
            attributesResult.forEach(match => {
                element[attributeToJsProp(match[1])] = match[2];
            })
        }
        return element;
    }

    result = oneTag.exec(string);
    if (result) {
        const tag = result[1];
        const element = document.createElement(tag);
        const attributes = result[2];
        if (attributes) {
            const attributesResult = [...attributes.matchAll(regexpAttributes)];
            attributesResult.forEach(match => {
                element[attributeToJsProp(match[1])] = match[2];
            })
        }
        return element;
    }
}

window.create = createElement;
