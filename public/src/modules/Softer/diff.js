const isDate = object => object instanceof Date;
const isEmpty = object => Object.keys(object).length === 0;
const isObject = object => object != null && typeof object === 'object';
const properObject = object => (isObject(object) && !object.hasOwnProperty ? { ...object } : object);

export default function diff(was, become) {
    if (was === become) {
        // Объекты равны, возвращаем пустой объект
        return {};
    }

    if (!isObject(was) || !isObject(become)) {
        // если что-то одно не объект, значит что-то превратилось в другое и возвращаем become;
        return become;
    }

    const properWas = properObject(was);
    const properBecome = properObject(become);

    if (isDate(properWas) || isDate(properBecome)) {
        if (properWas.valueOf() === properBecome.valueOf()) return {};
        return properBecome;
    }

    const deletedValues = getDeletedValues(properWas, properBecome);

    const addedValues = getUpdatedValues(properWas, properBecome);

    return { ...addedValues, ...deletedValues };
}

const getDeletedValues = (was, become) => {
    return Object.keys(was).reduce((acc, oldKey) => {
        return become.hasOwnProperty(oldKey) ? acc : { ...acc, [oldKey]: undefined };
    }, {});
};

const getUpdatedValues = (was, become) => {
    return Object.keys(become).reduce((acc, newKey) => {
        if (!was.hasOwnProperty(newKey)) {
            // Если появилось новое поле. Добавляем в результат
            return { ...acc, [newKey]: become[newKey] };
        }

        // Если поле осталось, то считаем разницу рекурсивно
        const difference = diff(was[newKey], become[newKey]);

        if (isObject(difference) && isEmpty(difference) && !isDate(difference)) {
            // Если ничего не изменилось, то ничего не добавляем
            return acc;
        }

        // Поле обновилось. Добавляем результат
        return { ...acc, [newKey]: difference };
    }, {});
};
