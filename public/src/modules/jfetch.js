// const hostname = 'https://api.softree.group';
const hostname = 'http://api.self.ru';

export const jfetch = async (path, options) => {
    const response = await fetch(`${hostname}${path}`, {
        mode: 'cors',
        credentials: 'include',
        ...options,
    });

    const { ok, status } = response;

    const resp = { status };
    try {
        resp.data = await response.json();
    } catch (err) {}

    if (ok) {
        return resp;
    }
    return Promise.reject(resp);
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
