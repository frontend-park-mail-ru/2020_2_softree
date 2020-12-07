export default class Validator {
    constructor() {
        this.emailCheck = [
            {
                regex: new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'),
                error: 'Вы ввели некорректный email-адрес',
            },
        ];

        this.passwordCheck = [
            {
                regex: new RegExp('^[a-zA-Z0-9]*$'),
                error: 'Пароль может включать только буквы английского алфавита и цифры',
            },
            {
                regex: new RegExp('^.{6,30}$'),
                error: 'Длина пароля должна быть в пределах от 6 до 30 символов',
            },
        ];
    }

    validateEmail(key, email) {
        const errors = [];

        this.emailCheck.forEach(check => {
            if (!check.regex.test(email)) {
                errors.push(check.error);
            }
        });
        return this.returnObject(key, errors);
    }

    validatePasswords(key, password) {
        const errors = [];
        this.passwordCheck.forEach(check => {
            if (!check.regex.test(password)) {
                errors.push(check.error);
            }
        });
        return this.returnObject(key, errors);
    }

    comparePasswords(key, newPassword, oldPassword) {
        const errors = [];
        if (newPassword !== oldPassword) {
            errors.push('Пароли не совпадают');
        }
        return this.returnObject(key, errors);
    }

    returnObject(key, errors) {
        console.log('returnObject', errors, errors.length);
        if (errors.length === 0) {
            return {};
        }
        const result = {};
        result[key] = errors;
        return result;
    }
}
