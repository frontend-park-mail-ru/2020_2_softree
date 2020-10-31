const parser = (matcher, replacer) => {
    const regex = RegExp(matcher, 'g');
    return string => {
        if (!string.match(regex)) {
            return string;
        }

        return string.replace(regex, replacer);
    };
};

const camelToKebab = parser(/[A-Z]/, match => `-${match.toLowerCase()}`);

export default function Styler(style) {
    const lines = Object.keys(style).map(
        property => `${camelToKebab(property)}: ${style[property]};`,
    );
    return lines.join(' ');
}
