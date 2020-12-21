import { useDispatch } from './Softer/softer-softex';
import { showMessage } from '../store/actions';
import { msgTypes } from '../messages/types';

const hostname = process.env.SOFTREE_HOST || '';

export const jfetch = async (path, options) => {
    let response;
    const dispatch = useDispatch();

    // if (path.includes("rates") && path.includes("?period=")) {
    //     response = mockApiRates(path);
    // } else {
    try {
        response = await fetch(`${hostname}${path}`, {
            mode: 'cors',
            credentials: 'include',
            ...options,
        });
    } catch (e) {
        dispatch(
            showMessage(
                'Запрос не выполнился :( Что-то с сервером не так. Уже ругаем бекендеров...',
                msgTypes.FAIL,
                3000,
            ),
        );
        return;
    }
    // }

    const { ok, status, headers } = response;

    const resp = { status, headers };
    try {
        resp.data = await response.json();
    } catch (err) {}

    if (status === 418) {
        dispatch(showMessage(resp.data.message, msgTypes.FAIL, 3000));
    }

    if (ok) {
        return resp;
    }
    throw resp;
};

export const jpost = (path, data, options = {}) => {
    return jfetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
    });
};

export const jput = (path, data, options = {}) => {
    return jpost(path, data, { method: 'PUT', ...options });
};

export const jdelete = (path, data, options = {}) => {
    return jpost(path, data, { method: 'DELETE', ...options });
};

export const jpatch = (path, data, options = {}) => {
    return jpost(path, data, { method: 'PATCH', ...options });
};

export const jget = (path, params, options = {}) => {
    return jfetch(path, {
        method: 'GET',
        data: new URLSearchParams(params),
        ...options,
    });
};

function mockApiRates(url) {
    const init = {
        status: 200,
        statusText: 'OK',
    };
    const values = [];
    let base = 0.014;
    let date = +new Date();
    let diff;
    let amount;

    if (url.includes('day')) {
        amount = 24 * 2;
        diff = 30 * 60 * 1000;
    }

    if (url.includes('week')) {
        amount = 7 * 24;
        diff = 60 * 60 * 1000;
    }

    if (url.includes('month')) {
        amount = 30;
        diff = 24 * 60 * 60 * 1000;
    }

    if (url.includes('year')) {
        amount = 365;
        diff = 24 * 60 * 60 * 1000;
    }

    for (let idx = 0; idx < amount; idx++) {
        const random = Math.random();
        console.log(new Date(date));
        if (Math.floor(random * 1000) % 2 === 0) {
            base += random / 1000;
        } else {
            base -= random / 1000;
        }

        values.push({
            value: base,
            updated_at: {
                seconds: Math.floor(date / 1000),
            },
        });

        date -= diff;
    }

    values.reverse();
    const blob = new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' });
    return new Response(blob, init);
}
