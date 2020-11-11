// const hostname = 'https://api.softree.group';
const hostname = 'http://localhost:8000';

export const jfetch = async (path, options) => {
    const response = await fetch(`${hostname}${path}`, {
        mode: 'cors',
        credentials: 'include',
        ...options,
    });

    const { ok, status } = response;
    console.log(ok, status);
    const resp = { status };
    try {
        resp.data = await response.json();
        console.log('JFETCH', resp);
        return resp;
    } catch (err) {
        console.log('EXCEPTION');
        if (ok) {
            return resp;
        }
        throw resp;
    }
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
