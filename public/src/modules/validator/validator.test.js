import Validator from './validator.js';

const validator = new Validator();

describe('validate password', () => {
    const tests = [
        {
            name: 'XSS validation',
            input: "console.log('error')",
            output: ['Пароль может включать только буквы английского алфавита и цифры'],
        },
        {
            name: 'SQL injection',
            input: 'SELECT * FROM trader_user; DROP TABLE IF EXISTS trader_user;',
            output: [
                'Пароль может включать только буквы английского алфавита и цифры',
                'Длина пароля должна быть в пределах от 6 до 30 символов',
            ],
        },
    ];

    tests.forEach(test => {
        it(test.name, () => {
            expect(validator.validatePasswords([test.input])).toEqual(test.output);
        });
    });

    it('New password is not match', () => {
        expect(validator.comparePasswords('OhiMark', 'littledoggie')).toEqual(['Пароли не совпадают']);
    });
});

describe('validate email', () => {
    const tests = [
        {
            name: 'bad email',
            input: 'this_is_not_email',
            output: ['Вы ввели некорректный email-адрес'],
        },
        {
            name: 'bad email 2',
            input: '@test.ru',
            output: ['Вы ввели некорректный email-адрес'],
        },
        {
            name: 'bad email 3',
            input: 'test.ru',
            output: ['Вы ввели некорректный email-адрес'],
        },
    ];

    tests.forEach(test => {
        it(test.name, () => {
            expect(validator.validateEmail(test.input)).toEqual(test.output);
        });
    });
});
