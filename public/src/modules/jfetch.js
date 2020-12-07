import { useDispatch } from './Softer/softer-softex';
import { showMessage } from '../store/actions';
import { msgTypes } from '../messages/types';

const hostname = process.env.SOFTREE_HOST;

export const jfetch = async (path, options) => {
    let response;
    const dispatch = useDispatch();

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
